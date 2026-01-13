import { useStore } from '@nanostores/react';
import { completedQuestions } from "../stores/progressStore";
import type { Topic } from "../data/topics";

interface ProgressStatsProps {
    totalQuestions: number;
    topics: Topic[];
}

const ProgressStats = ({ totalQuestions, topics }: ProgressStatsProps) => {
    const completed = useStore(completedQuestions);

    // Calculate completed count
    const completedCount = Object.values(completed).filter(Boolean).length;
    // Calculate percentage
    const progressPercent = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

    // Calculate detailed stats by difficulty
    const allQuestions = topics.flatMap(t => t.questions);

    const stats = allQuestions.reduce((acc, q) => {
        const diff = q.difficulty || 'Medium';
        const isCompleted = completed[q.id || ''];

        if (!acc[diff]) acc[diff] = { total: 0, solved: 0 };

        acc[diff].total += 1;
        if (isCompleted) acc[diff].solved += 1;

        return acc;
    }, {} as Record<string, { total: number; solved: number }>);

    const easy = stats['Easy'] || { total: 0, solved: 0 };
    const medium = stats['Medium'] || { total: 0, solved: 0 };
    const hard = stats['Hard'] || { total: 0, solved: 0 };

    // Circular Progress Maths
    const radius = 45;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

    return (
        <div className="bg-secondary rounded-xl p-6 shadow-xl w-full max-w-sm mx-auto flex items-center justify-between gap-6 relative overflow-hidden">
            {/* Background Glow (Optional) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

            {/* Left: Stats Breakdown */}
            {/* Left: Stats Breakdown (Horizontal Bars) */}
            <div className="flex flex-col gap-4 z-10 flex-1 min-w-[140px]">
                {/* Easy */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-emerald-400">Easy</span>
                        <span className="text-muted-foreground">{easy.solved}/{easy.total}</span>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${easy.total > 0 ? (easy.solved / easy.total) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* Medium */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-amber-400">Medium</span>
                        <span className="text-muted-foreground">{medium.solved}/{medium.total}</span>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${medium.total > 0 ? (medium.solved / medium.total) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* Hard */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-red-400">Hard</span>
                        <span className="text-muted-foreground">{hard.solved}/{hard.total}</span>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${hard.total > 0 ? (hard.solved / hard.total) * 100 : 0}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Right: Circular Progress */}
            <div className="relative flex items-center justify-center z-10">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    {/* Track */}
                    <circle
                        className="stroke-muted"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Progress Indicator */}
                    <circle
                        stroke="hsl(var(--primary))" // Brighter Blue
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </svg>
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{completedCount}</span>
                    <span className="text-[10px] text-muted-foreground font-bold tracking-widest mt-1">SOLVED</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressStats;
