import { useState } from "react";
import type { Question } from "../data/topics";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
    questions: Question[];
    topicName: string;
}

const QuestionList = ({ questions, topicName }: QuestionListProps) => {
    const [filter, setFilter] = useState("");

    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Problems ({filteredQuestions.length})</h2>
                <input
                    type="text"
                    placeholder="Filter problems..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-ring w-64 transition-colors text-foreground placeholder:text-muted-foreground"
                />
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border bg-muted/50 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">Status</th>
                        <th className="py-3 px-4">Problem</th>
                        <th className="py-3 px-4 w-24 text-center">Resource</th>
                        <th className="py-3 px-4 w-20 text-center">Practice</th>
                        <th className="py-3 px-4 w-24 text-right">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredQuestions.map((q, idx) => (
                        <QuestionItem key={q.id || idx} question={q} index={idx} />
                    ))}
                </tbody>
            </table>

            {filteredQuestions.length === 0 && (
                <div className="py-8 text-center text-muted-foreground text-sm border-t border-border">
                    No problems match your filter.
                </div>
            )}
        </div>
    );
};

export default QuestionList;
