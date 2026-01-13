import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { topics, type Topic } from '../data/topics';
import QuestionList from './QuestionList';
import { X } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Define the visual graph structure
interface RoadmapNode {
    id: string;
    label: string;
    keywords: string[]; // For fuzzy matching with Step names
    x: number;
    y: number;
    connectsTo: string[];
}

const ROADMAP_DATA: RoadmapNode[] = [
    // Row 0
    { id: 'arrays-hashing', label: 'Arrays & Hashing', keywords: ['Arrays', 'Step 3'], x: 2, y: 0, connectsTo: ['two-pointers', 'stack'] },

    // Row 1
    { id: 'two-pointers', label: 'Two Pointers', keywords: ['Two Pointer', 'Step 10'], x: 0, y: 1, connectsTo: ['binary-search', 'sliding-window', 'linked-list'] },
    { id: 'stack', label: 'Stack', keywords: ['Stack', 'Step 9'], x: 4, y: 1, connectsTo: [] },

    // Row 2
    { id: 'binary-search', label: 'Binary Search', keywords: ['Binary Search', 'Step 4'], x: 0, y: 2, connectsTo: ['trees'] },
    { id: 'sliding-window', label: 'Sliding Window', keywords: ['Sliding Window', 'Step 10'], x: 1, y: 2, connectsTo: [] },
    { id: 'linked-list', label: 'Linked List', keywords: ['Linked List', 'Step 6'], x: 3, y: 2, connectsTo: ['trees', 'tries'] },

    // Row 3
    { id: 'trees', label: 'Trees', keywords: ['Binary Trees', 'Step 13'], x: 2, y: 3, connectsTo: ['backtracking', 'heap', 'graphs'] },
    { id: 'tries', label: 'Tries', keywords: ['Tries', 'String'], x: 4, y: 3, connectsTo: [] }, // Might fallback

    // Row 4
    { id: 'backtracking', label: 'Backtracking', keywords: ['Recursion', 'Step 7'], x: 0, y: 4, connectsTo: ['1d-dp'] },
    { id: 'heap', label: 'Heap / Priority Queue', keywords: ['Heaps', 'Step 11'], x: 2, y: 4, connectsTo: ['intervals'] },
    { id: 'graphs', label: 'Graphs', keywords: ['Graphs', 'Step 15'], x: 4, y: 4, connectsTo: ['2d-dp', 'bit-manipulation'] },

    // Row 5
    { id: '1d-dp', label: '1D DP', keywords: ['Dynamic Programming', 'Step 16'], x: 0, y: 5, connectsTo: [] },
    { id: 'intervals', label: 'Intervals', keywords: ['Intervals'], x: 2, y: 5, connectsTo: [] }, // Needs check
    { id: '2d-dp', label: '2D DP', keywords: ['Dynamic Programming', 'Step 16'], x: 4, y: 5, connectsTo: [] },
    { id: 'bit-manipulation', label: 'Bit Manipulation', keywords: ['Bit Manipulation', 'Step 8'], x: 5, y: 5, connectsTo: ['math-geometry'] },

    // Row 6
    { id: 'math-geometry', label: 'Math & Geometry', keywords: ['Math'], x: 5, y: 6, connectsTo: [] },
];

const GRID_W = 200;
const GRID_H = 120;
const NODE_W = 180;
const NODE_H = 70;

const Roadmap = () => {
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNodeClick = (node: RoadmapNode, e: React.MouseEvent) => {
        e.preventDefault();

        // Find topic by keywords
        const topic = topics.find(t =>
            node.keywords.some(k => t.name.toLowerCase().includes(k.toLowerCase()))
        );

        if (topic) {
            setSelectedTopicId(node.id);
            setSelectedTopic(topic);
        } else {
            // If no data found, maybe show empty state or just set ID
            // Create a dummy topic if we can't find one, to at least show the sidebar
            setSelectedTopicId(node.id);
            setSelectedTopic({
                id: node.id,
                name: node.label,
                description: 'No questions found regarding this topic yet.',
                questions: []
            });
            console.warn(`Topic data not found for id: ${node.id}`);
        }
    };

    const handleClose = () => {
        setSelectedTopicId(null);
        setSelectedTopic(null);
    };

    const getCoords = (node: RoadmapNode) => ({
        x: node.x * GRID_W + GRID_W / 2,
        y: node.y * GRID_H + GRID_H / 2,
    });

    return (
        <div className="flex h-full w-full overflow-hidden relative">
            <div className={cn(
                "flex-1 h-full relative overflow-hidden transition-all duration-500 ease-in-out",
                selectedTopicId ? "mr-[550px]" : ""
            )}>
                <TransformWrapper
                    initialScale={0.8}
                    minScale={0.4}
                    maxScale={2}
                    centerOnInit={true}
                    wheel={{ step: 0.1 }}
                >
                    {/* @ts-ignore */}
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <div
                            className="relative"
                            style={{
                                width: 6 * GRID_W,
                                height: 7 * GRID_H,
                            }}
                        >
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" className="fill-muted-foreground" />
                                    </marker>
                                </defs>
                                {ROADMAP_DATA.map((node) => {
                                    const start = getCoords(node);
                                    return node.connectsTo.map((targetId) => {
                                        const target = ROADMAP_DATA.find(n => n.id === targetId);
                                        if (!target) return null;
                                        const end = getCoords(target);
                                        return (
                                            <line
                                                key={`${node.id}-${targetId}`}
                                                x1={start.x}
                                                y1={start.y}
                                                x2={end.x}
                                                y2={end.y}
                                                className="stroke-muted-foreground/40"
                                                strokeWidth="1"
                                                markerEnd="url(#arrowhead)"
                                            />
                                        );
                                    });
                                })}
                            </svg>

                            {ROADMAP_DATA.map((node) => {
                                const isActive = selectedTopicId === node.id;
                                return (
                                    <div
                                        key={node.id}
                                        onClick={(e) => handleNodeClick(node, e)}
                                        className={cn(
                                            "absolute transform -translate-x-1/2 -translate-y-1/2 z-10",
                                            "flex items-center justify-center text-center px-4",
                                            "rounded-lg cursor-pointer transition-all duration-300",
                                            "bg-card shadow-sm border border-border/50",
                                            isActive
                                                ? "border-primary ring-2 ring-primary/20 scale-105 shadow-md z-20"
                                                : "hover:border-primary/50 hover:shadow-sm hover:-translate-y-0.5"
                                        )}
                                        style={{
                                            left: node.x * GRID_W + GRID_W / 2,
                                            top: node.y * GRID_H + GRID_H / 2,
                                            width: NODE_W,
                                            height: NODE_H,
                                        }}
                                    >
                                        <span className={cn(
                                            "font-heading font-semibold text-sm transition-colors",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )}>
                                            {node.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>

            {/* Right Panel: Sidebar */}
            <div className={cn(
                "absolute inset-y-0 right-0 w-[450px] bg-card border-l border-border shadow-2xl transform transition-transform duration-500 ease-in-out z-30 flex flex-col",
                selectedTopicId ? "translate-x-0" : "translate-x-full"
            )}
            >
                {selectedTopic && (
                    <>
                        <div className="p-6 border-b border-border bg-card sticky top-0 z-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">Topic</span>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                    title="Close (Esc)"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold font-heading text-foreground mb-2">{selectedTopic.name}</h2>
                            <p className="text-sm text-muted-foreground font-body line-clamp-2">{selectedTopic.description}</p>

                            {/* Progress Placeholder */}
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-0" /> {/* TODO: Connect real progress */}
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">0 / {selectedTopic.questions.length}</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-background/50">
                            <QuestionList questions={selectedTopic.questions} topicName={selectedTopic.name} />
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default Roadmap;
