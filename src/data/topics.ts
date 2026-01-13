
import dsaQuestionsData from './dsa-questions.json';

// Represents a question with title and link
export interface Question {
    title: string;
    link: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    platform?: 'LeetCode' | 'CodeForces' | 'GeeksForGeeks' | 'HackerRank' | 'TakeUForward' | string;
    id?: string;
    videoUrl?: string;
    articleUrl?: string;
}

// Represents a DSA topic with name and questions
export interface Topic {
    id: string;
    name: string;
    description: string;
    questions: Question[];
}

// Helper function to determine difficulty/platform if missing (though massive JSON usually has it)
export const inferQuestionAttributes = (question: Question): Question => {
    const updatedQuestion = { ...question };

    if (!updatedQuestion.id) {
        updatedQuestion.id = question.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }

    // Basic platform inference if missing
    if (!updatedQuestion.platform) {
        if (question.link.includes('leetcode')) updatedQuestion.platform = 'LeetCode';
        else if (question.link.includes('takeuforward')) updatedQuestion.platform = 'TakeUForward';
        else updatedQuestion.platform = 'Other';
    }

    // Basic difficulty inference if missing
    if (!updatedQuestion.difficulty) {
        updatedQuestion.difficulty = 'Medium';
    }

    return updatedQuestion;
};

// Process data synchronously
const rawTopics = dsaQuestionsData as any[];
// We assume structure is array of topics based on my previous script.

export const topics: Topic[] = rawTopics.map((topic: any) => ({
    id: topic.name ? topic.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : `topic-${Math.random()}`,
    name: topic.name,
    description: topic.description || `Collection of ${topic.questions?.length || 0} problems.`,
    questions: (topic.questions || []).map((q: any) => inferQuestionAttributes(q))
}));

export const getTopicById = (id: string): Topic | undefined => {
    return topics.find(topic => topic.id === id);
};
