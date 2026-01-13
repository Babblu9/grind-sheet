import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO, startOfWeek, endOfWeek, addMonths, subMonths, intervalToDuration } from 'date-fns';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar as CalendarIcon, Clock, X, AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { Separator } from './ui/separator';
import { logger } from '../lib/logger';

interface Contest {
    _id: string;
    contestName: string;
    contestStartDate: string;
    contestEndDate: string;
    contestDuration: number;
    contestUrl: string;
    platform: string;
}

interface ApiResponse {
    status: {
        success: boolean;
        message: string;
    };
    data: Contest[];
}

const PLATFORM_LOGOS: Record<string, string> = {
    leetcode: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    codeforces: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    atcoder: 'https://img.atcoder.jp/assets/atcoder.png',
    geeksforgeeks: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg',
    codechef: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codechef.svg',
};

const ContestCalendar: React.FC = () => {
    const [contests, setContests] = useState<Contest[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Null by default to show all upcoming

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await fetch('https://node.codolio.com/api/contest-calendar/v1/all/get-upcoming-contests');
                const data: ApiResponse = await res.json();
                if (data.status.success) {
                    // Sort by start date
                    const sorted = data.data.sort((a, b) => new Date(a.contestStartDate).getTime() - new Date(b.contestStartDate).getTime());
                    setContests(sorted);
                }
            } catch (error) {
                logger.error('Failed to fetch contests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const getContestsForDay = (date: Date) => {
        return contests.filter(contest => isSameDay(parseISO(contest.contestStartDate), date));
    };

    const upcomingContests = contests.filter(c => new Date(c.contestStartDate) >= new Date());

    // If date is selected, show contests for that date. Otherwise, show ALL upcoming contests.
    const sidebarContests = selectedDate
        ? contests.filter(c => isSameDay(parseISO(c.contestStartDate), selectedDate))
        : upcomingContests;

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hrs ${minutes > 0 ? `${minutes} mins` : ''}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] min-h-[600px] max-w-[1400px] mx-auto">
            {/* Sidebar / List View - Flat */}
            <div className="w-full lg:w-[400px] flex flex-col h-full bg-transparent border-r border-border">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
                        {selectedDate ? `Contests on ${format(selectedDate, 'MMM d')}` : 'Upcoming Contests'}
                    </h2>
                    <p className="text-gray-500 text-xs mt-1 font-body">
                        {selectedDate ? 'Scheduled events for this day' : 'Don\'t miss scheduled events'}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {sidebarContests.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm">
                            <p>No contests found.</p>
                            {selectedDate && (
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="mt-2 text-blue-600 hover:underline text-xs"
                                >
                                    View all upcoming
                                </button>
                            )}
                        </div>
                    ) : (
                        sidebarContests.map((contest) => {
                            const start = parseISO(contest.contestStartDate);
                            const end = parseISO(contest.contestEndDate);
                            return (
                                <div key={contest._id} className={cn(
                                    "border rounded-lg p-4 hover:bg-secondary/10 transition-colors bg-card group shadow-sm hover:shadow-md relative overflow-hidden",
                                    "border-border", // Fallback border
                                    contest.platform === 'leetcode' && "border-l-4 border-l-yellow-500 bg-yellow-500/5",
                                    contest.platform === 'codeforces' && "border-l-4 border-l-red-500 bg-red-500/5",
                                    contest.platform === 'atcoder' && "border-l-4 border-l-foreground bg-foreground/5",
                                    contest.platform === 'geeksforgeeks' && "border-l-4 border-l-green-500 bg-green-500/5",
                                    !['leetcode', 'codeforces', 'atcoder', 'geeksforgeeks'].includes(contest.platform) && "border-l-4 border-l-blue-500 bg-blue-500/5"
                                )}>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded p-1 flex items-center justify-center border border-gray-100">
                                            {PLATFORM_LOGOS[contest.platform.toLowerCase()] ? (
                                                <img
                                                    src={PLATFORM_LOGOS[contest.platform.toLowerCase()]}
                                                    alt={contest.platform}
                                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            ) : (
                                                <span className="text-[10px] font-bold uppercase text-muted-foreground">{contest.platform.substring(0, 2)}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-medium text-muted-foreground font-mono">{format(start, 'dd MMM yyyy')}</span>
                                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                                <span className="text-[10px] text-muted-foreground/70">{format(start, 'HH:mm')} - {format(end, 'HH:mm')}</span>
                                            </div>
                                            <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 font-heading truncate" title={contest.contestName}>
                                                {contest.contestName}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-2">
                                                <a
                                                    href={contest.contestUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                                                >
                                                    Register <ExternalLink size={10} />
                                                </a>
                                                <a
                                                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${format(start, "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}&text=${encodeURIComponent(contest.contestName)}&location=${encodeURIComponent(contest.contestUrl)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                                                >
                                                    Add to Calendar
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Calendar Grid - Flat */}
            <div className="w-full lg:flex-1 h-full flex flex-col bg-transparent max-w-[900px] mx-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-heading font-semibold text-foreground">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                            className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => {
                                setCurrentDate(new Date());
                                setSelectedDate(null);
                            }}
                            className="px-3 py-1 text-xs font-medium border border-border rounded-md hover:bg-secondary text-foreground mx-1 transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                            className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-border bg-secondary/10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex-1 grid grid-cols-7 auto-rows-fr">
                    {calendarDays.map((day, dayIdx) => {
                        const dayContests = getContestsForDay(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const isTodayDate = isToday(day);

                        // Determine borders for grid cells
                        const borderRight = (dayIdx + 1) % 7 !== 0 ? 'border-r' : '';
                        const borderBottom = dayIdx < calendarDays.length - 7 ? 'border-b' : '';

                        return (
                            <div
                                key={day.toString()}
                                onClick={() => setSelectedDate(day)}
                                className={`
                                    min-h-[100px] p-2 bg-transparent ${borderRight} ${borderBottom} border-border/50 
                                    cursor-pointer transition-colors relative hover:bg-secondary/20
                                    ${!isCurrentMonth ? 'bg-secondary/5 text-muted-foreground/20' : ''}
                                    ${isSelected ? 'bg-primary/10' : ''}
                                `}
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <span className={`
                                        text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full
                                        ${isTodayDate ? 'bg-primary text-primary-foreground' : (isCurrentMonth ? 'text-muted-foreground' : 'text-muted-foreground/30')}
                                    `}>
                                        {format(day, 'd')}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {dayContests.slice(0, 3).map(contest => {
                                        const start = parseISO(contest.contestStartDate);
                                        const end = parseISO(contest.contestEndDate);
                                        return (
                                            <Popover key={contest._id}>
                                                <PopoverTrigger asChild>
                                                    <div
                                                        className={cn(
                                                            "text-[10px] truncate px-1.5 py-0.5 rounded cursor-pointer transition-all hover:brightness-95",
                                                            contest.platform === 'leetcode' ? 'bg-yellow-500/20 text-yellow-500' :
                                                                contest.platform === 'codeforces' ? 'bg-red-500/20 text-red-500' :
                                                                    contest.platform === 'atcoder' ? 'bg-secondary text-foreground' :
                                                                        'bg-blue-500/20 text-blue-500'
                                                        )}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent date selection when clicking item
                                                            setSelectedDate(day);
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-1.5">
                                                            {PLATFORM_LOGOS[contest.platform.toLowerCase()] && (
                                                                <img
                                                                    src={PLATFORM_LOGOS[contest.platform.toLowerCase()]}
                                                                    alt=""
                                                                    className="w-3 h-3 object-contain opacity-90"
                                                                />
                                                            )}
                                                            <span className="truncate">
                                                                {contest.platform === 'atcoder' ? 'ABC' : contest.platform === 'leetcode' ? 'Weekly' : contest.contestName.substring(0, 12)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80 p-0 bg-card border border-border" align="start" side="right">
                                                    <div className="p-4 bg-card rounded-lg shadow-lg border border-border">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <h3 className="font-heading font-bold text-foreground text-base leading-snug pr-4">
                                                                {contest.contestName}
                                                            </h3>
                                                        </div>

                                                        <div className="space-y-2.5">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon size={14} className="text-muted-foreground/70" />
                                                                <span>{format(start, 'd MMMM, yyyy')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock size={14} className="text-muted-foreground/70" />
                                                                <span>{format(start, 'h:mm a')} - {format(end, 'h:mm a')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] font-bold border border-border rounded-full text-muted-foreground/70">D</span>
                                                                <span>{formatDuration(contest.contestDuration)}</span>
                                                            </div>

                                                            {new Date() > end && (
                                                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-1.5 rounded">
                                                                    <AlertTriangle size={14} />
                                                                    <span className="font-medium">Contest Ended</span>
                                                                </div>
                                                            )}

                                                            <div className="pt-2 flex items-center gap-2">
                                                                <div className="w-4 h-4 rounded-sm flex items-center justify-center opacity-70">
                                                                    {PLATFORM_LOGOS[contest.platform.toLowerCase()] && (
                                                                        <img src={PLATFORM_LOGOS[contest.platform.toLowerCase()]} alt="" className="w-full h-full object-contain" />
                                                                    )}
                                                                </div>
                                                                <span className="text-sm text-muted-foreground capitalize">{contest.platform}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                                            <a
                                                                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${format(start, "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}&text=${encodeURIComponent(contest.contestName)}&location=${encodeURIComponent(contest.contestUrl)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-primary hover:underline"
                                                            >
                                                                Add to Calendar
                                                            </a>
                                                            <a
                                                                href={contest.contestUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
                                                            >
                                                                Register
                                                            </a>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        );
                                    })}
                                    {dayContests.length > 3 && (
                                        <div className="text-[10px] text-muted-foreground pl-1">
                                            + {dayContests.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default ContestCalendar;
