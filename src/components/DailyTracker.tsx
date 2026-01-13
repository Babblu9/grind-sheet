import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { completionTimestamps } from '../stores/progressStore';
import { ChevronLeft, ChevronRight, Flame, Trophy } from 'lucide-react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    differenceInCalendarDays,
    parseISO
} from 'date-fns';
import { cn } from '../lib/utils';

const DailyTracker = () => {
    const timestamps = useStore(completionTimestamps);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // --- Data Processing (Streaks & Active Days) ---
    const { activeDates, currentStreak, bestStreak } = useMemo(() => {
        const dates = Object.values(timestamps)
            .filter(Boolean)
            .map(iso => iso.split('T')[0]) // YYYY-MM-DD
            .sort();

        const activeSet = new Set(dates);

        // Calculate Streaks
        let current = 0;
        let best = 0;

        // Simple streak logic on sorted unique dates
        const uniqueSorted = Array.from(new Set(dates)).sort();

        if (uniqueSorted.length > 0) {
            let running = 0;
            let lastDate: Date | null = null;

            uniqueSorted.forEach(dStr => {
                const d = parseISO(dStr);
                if (!lastDate) {
                    running = 1;
                } else {
                    const diff = differenceInCalendarDays(d, lastDate);
                    if (diff === 1) {
                        running++;
                    } else if (diff > 1) {
                        best = Math.max(best, running);
                        running = 1;
                    }
                }
                lastDate = d;
            });
            best = Math.max(best, running);

            // Check if streak is active today
            const todayStr = format(new Date(), 'yyyy-MM-dd');
            const yesterdayStr = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

            const hasToday = activeSet.has(todayStr);
            const hasYesterday = activeSet.has(yesterdayStr);

            if (hasToday || hasYesterday) {
                current = 0;
                let checkDate = hasToday ? new Date() : new Date(Date.now() - 86400000);

                while (true) {
                    const str = format(checkDate, 'yyyy-MM-dd');
                    if (activeSet.has(str)) {
                        current++;
                        checkDate = new Date(checkDate.setDate(checkDate.getDate() - 1));
                    } else {
                        break;
                    }
                }
            }
        }

        return { activeDates: activeSet, currentStreak: current, bestStreak: best };
    }, [timestamps]);


    // --- Calendar Navigation ---
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // --- Grid Generation ---
    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [currentMonth]);

    return (
        <div className="bg-secondary text-foreground rounded-xl p-6 shadow-xl w-full font-sans border border-border">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="p-1 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="font-semibold text-lg tracking-wide text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                </div>
                <button
                    onClick={nextMonth}
                    className="p-1 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-8">
                {/* Weekday Labels */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">
                        {day}
                    </div>
                ))}

                {/* Days */}
                {calendarDays.map((day, i) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const isActive = activeDates.has(dateStr);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isTodayDate = isToday(day);

                    return (
                        <div
                            key={i}
                            className="aspect-square flex items-center justify-center relative group"
                        >
                            <div className={cn(
                                "w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                                !isCurrentMonth && "text-gray-700 opacity-50",
                                isCurrentMonth && !isActive && "text-gray-400 hover:bg-gray-700/30",
                                isActive && "bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-500/20",
                                isTodayDate && !isActive && "border border-blue-500/50 text-blue-400"
                            )}>
                                {format(day, 'd')}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/50 rounded-lg p-2.5 flex flex-col items-start border border-border">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Current</span>
                    <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-orange-500/10 rounded-md">
                            <Flame size={12} className="text-orange-500" fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-white">{currentStreak} <span className="text-[10px] font-normal text-gray-400">d</span></span>
                    </div>
                </div>

                <div className="bg-background/50 rounded-lg p-2.5 flex flex-col items-start border border-border">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Best</span>
                    <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-yellow-500/10 rounded-md">
                            <Trophy size={12} className="text-yellow-500" fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-white">{bestStreak} <span className="text-[10px] font-normal text-gray-400">d</span></span>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center border-t border-border pt-3">
                <span className="text-[10px] text-gray-500">Solve one problem a day to keep your streak</span>
            </div>
        </div>
    );
};

export default DailyTracker;
