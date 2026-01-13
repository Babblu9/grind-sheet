import { map } from "nanostores";
import { supabase } from "../lib/supabase";
import { logger } from "../lib/logger";

const getInitialState = () => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('completedQuestions');
    return stored ? JSON.parse(stored) : {};
};

const getInitialTimestamps = () => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('completionTimestamps');
    return stored ? JSON.parse(stored) : {};
};

export const completedQuestions = map<Record<string, boolean>>(getInitialState());
export const completionTimestamps = map<Record<string, string>>(getInitialTimestamps());

// Sync to Supabase when user is authenticated
const syncToSupabase = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const completed = completedQuestions.get();
    const timestamps = completionTimestamps.get();

    // Upsert all completed questions
    const records = Object.entries(completed)
        .filter(([_, isCompleted]) => isCompleted)
        .map(([questionId, _]) => ({
            user_id: user.id,
            question_id: questionId,
            completed: true,
            completed_at: timestamps[questionId] || new Date().toISOString()
        }));

    if (records.length > 0) {
        await supabase.from('user_progress').upsert(records, {
            onConflict: 'user_id,question_id'
        });
    }
};

// Load progress from Supabase
const loadFromSupabase = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
        .from('user_progress')
        .select('question_id, completed, completed_at')
        .eq('user_id', user.id)
        .eq('completed', true);

    if (error) {
        logger.error('Error loading progress from Supabase:', error);
        return;
    }

    if (data) {
        const completed: Record<string, boolean> = {};
        const timestamps: Record<string, string> = {};

        data.forEach(record => {
            completed[record.question_id] = record.completed;
            timestamps[record.question_id] = record.completed_at;
        });

        completedQuestions.set(completed);
        completionTimestamps.set(timestamps);

        // Also save to localStorage
        localStorage.setItem('completedQuestions', JSON.stringify(completed));
        localStorage.setItem('completionTimestamps', JSON.stringify(timestamps));
    }
};

export const toggleQuestion = (questionId: string, isCompleted: boolean) => {
    const current = completedQuestions.get();
    const timestamps = completionTimestamps.get();

    if (isCompleted) {
        current[questionId] = true;
        timestamps[questionId] = new Date().toISOString();
    } else {
        delete current[questionId];
        delete timestamps[questionId];
    }

    completedQuestions.set({ ...current });
    completionTimestamps.set({ ...timestamps });

    localStorage.setItem('completedQuestions', JSON.stringify(current));
    localStorage.setItem('completionTimestamps', JSON.stringify(timestamps));

    // Sync to Supabase
    syncToSupabase();
};

// Listen for auth state changes
if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
            loadFromSupabase();
        } else if (event === 'SIGNED_OUT') {
            completedQuestions.set({});
            completionTimestamps.set({});
            localStorage.removeItem('completedQuestions');
            localStorage.removeItem('completionTimestamps');
        }
    });

    // Load on initial mount if user is already signed in
    loadFromSupabase();
}
