import { inferQuestionAttributes, type Question } from "../data/topics";
import { useStore } from '@nanostores/react';
import { completedQuestions, toggleQuestion } from "../stores/progressStore";
import { Checkbox } from "./ui/checkbox";
import { cn } from "../lib/utils";
import { Youtube, FileText } from 'lucide-react';

interface QuestionItemProps {
    question: Question;
    index: number;
}

const PLATFORM_LOGOS: Record<string, string> = {
    'LeetCode': 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    'GeeksForGeeks': 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg',
    'CodeForces': 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    'HackerRank': 'https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg',
};

const QuestionItem = ({ question }: QuestionItemProps) => {
    const processedQuestion = inferQuestionAttributes(question);
    const completedState = useStore(completedQuestions);
    const checked = !!completedState[processedQuestion.id || ''];

    const handleToggle = (checkedState: boolean) => {
        if (processedQuestion.id) {
            toggleQuestion(processedQuestion.id, checkedState);
        }
    };

    const platformLogo = PLATFORM_LOGOS[processedQuestion.platform || ''];

    return (
        <tr className={cn(
            "group border-b border-border hover:bg-muted/50 transition-colors duration-100",
            checked && "bg-muted/30"
        )}>
            <td className="py-3 px-4 text-center">
                <Checkbox
                    checked={checked}
                    onCheckedChange={handleToggle}
                    className="h-5 w-5 mx-auto data-[state=checked]:bg-primary data-[state=checked]:border-primary border-muted-foreground/30 translate-y-0.5"
                />
            </td>

            <td className="py-3 px-4">
                <a
                    href={processedQuestion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "text-[15px] font-body font-medium truncate block hover:underline underline-offset-2 max-w-[280px] sm:max-w-md md:max-w-xl",
                        checked ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-foreground"
                    )}
                >
                    {processedQuestion.title}
                </a>
            </td>

            <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-2">
                    {processedQuestion.videoUrl && (
                        <a
                            href={processedQuestion.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            title="Video Solution"
                        >
                            <Youtube size={16} className="text-red-500" />
                        </a>
                    )}
                    {processedQuestion.articleUrl && (
                        <a
                            href={processedQuestion.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                            title="Article"
                        >
                            <FileText size={16} className="text-blue-500" />
                        </a>
                    )}
                    {!processedQuestion.videoUrl && !processedQuestion.articleUrl && (
                        <span className="text-muted-foreground text-xs">---</span>
                    )}
                </div>
            </td>

            <td className="py-3 px-4 text-center">
                {platformLogo ? (
                    <a
                        href={processedQuestion.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-6 h-6 rounded hover:opacity-80 transition-opacity"
                        title={processedQuestion.platform}
                    >
                        <img
                            src={platformLogo}
                            alt={processedQuestion.platform}
                            className="w-full h-full object-contain opacity-70 group-hover:opacity-100"
                        />
                    </a>
                ) : (
                    <span className="text-xs text-muted-foreground">{processedQuestion.platform?.substring(0, 3) || '---'}</span>
                )}
            </td>

            <td className={cn(
                "py-3 px-4 text-xs font-medium text-right opacity-80",
                processedQuestion.difficulty === "Easy" && "text-emerald-500",
                processedQuestion.difficulty === "Medium" && "text-amber-500",
                processedQuestion.difficulty === "Hard" && "text-red-500",
                !["Easy", "Medium", "Hard"].includes(processedQuestion.difficulty || "") && "text-muted-foreground"
            )}>
                {processedQuestion.difficulty}
            </td>
        </tr>
    );
};

export default QuestionItem;
