import { useState } from "react";
import type { Topic } from "../data/topics";
import QuestionList from "./QuestionList";
import { useStore } from '@nanostores/react';
import { completedQuestions } from "../stores/progressStore";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

interface TopicAccordionProps {
    topic: Topic;
}

const TopicAccordion = ({ topic }: TopicAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const completed = useStore(completedQuestions);

    // Calculate specific progress for this topic
    const topicQuestionIds = topic.questions.map(q => q.id);
    const completedTopicCount = topicQuestionIds.filter(id => id && completed[id]).length;
    const totalTopicQuestions = topic.questions.length;
    const isCompleted = completedTopicCount === totalTopicQuestions && totalTopicQuestions > 0;

    return (
        <div className="group border-b border-border last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between py-6 px-6 hover:bg-white/[0.02] transition-colors duration-200 text-left",
                    isOpen && "bg-transparent text-primary" // Minimal active state
                )}
            >
                <div className="flex items-center gap-4 flex-1">
                    {/* Status Indicator */}
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isCompleted ? "bg-green-500" : (completedTopicCount > 0 ? "bg-yellow-500" : "bg-muted")
                    )} />

                    <div>
                        <span className="text-foreground font-heading font-semibold text-[15px] block tracking-tight">
                            {topic.name}
                        </span>
                        <span className="text-muted-foreground font-body text-xs hidden sm:block mt-0.5">
                            {topic.description.substring(0, 80)}...
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-lg font-mono font-medium text-muted-foreground min-w-[60px] text-right">
                        {completedTopicCount} <span className="text-sm text-muted-foreground/50">/ {totalTopicQuestions}</span>
                    </div>

                    <ChevronDown
                        className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="bg-muted/20">
                    <Separator />
                    <div className="px-4 pb-6 pt-2">
                        <QuestionList questions={topic.questions} topicName={topic.name} />
                    </div>
                </div>
            )}
            <Separator />
        </div>
    );
};

export default TopicAccordion;
