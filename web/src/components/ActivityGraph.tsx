import { useMemo } from 'react';
import type { Task } from '../types';
import { getLocalYMD } from '../utils';

interface ActivityGraphProps {
  tasks: Task[];
}

export function ActivityGraph({ tasks }: ActivityGraphProps) {
  const days = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayDayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = 52 * 7 + (todayDayOfWeek + 1);
    
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates.push(getLocalYMD(d));
    }
    return dates;
  }, []);

  const completionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const task of tasks) {
      if (!task.completions) continue;
      for (const dateStr of task.completions) {
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      }
    }
    return counts;
  }, [tasks]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-base-200 border border-base-300';
    
    const progress = count / Math.max(1, tasks.length);
    if (progress <= 0.25) return 'bg-[#9be9a8] border border-[#9be9a8]/10';
    if (progress <= 0.50) return 'bg-[#40c463] border border-[#40c463]/10';
    if (progress <= 0.75) return 'bg-[#30a14e] border border-[#30a14e]/10';
    return 'bg-[#216e39] border border-[#216e39]/10';
  };

  const getTooltipText = (dateStr: string, count: number) => {
    if (count === 0) return `No goals completed on ${dateStr}`;
    if (count === 1) return `1 goal completed on ${dateStr}`;
    return `${count} goals completed on ${dateStr}`;
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-200 mb-6 font-sans">
      <div className="card-body p-5 md:p-6">
        <h3 className="text-xl font-bold mb-4">Activity</h3>
        
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-base-300">
          <div className="min-w-max flex gap-2">
            
            {/* Day Labels */}
            <div 
              className="text-xs text-base-content/50 pr-1"
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 12px)',
                gap: '4px',
                textAlign: 'right'
              }}
            >
              <span style={{ gridRow: 2, lineHeight: '12px' }}>Mon</span>
              <span style={{ gridRow: 4, lineHeight: '12px' }}>Wed</span>
              <span style={{ gridRow: 6, lineHeight: '12px' }}>Fri</span>
            </div>

            {/* Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 12px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '12px',
                gap: '4px'
              }}
            >
              {days.map(dateStr => {
                const count = completionCounts[dateStr] || 0;
                return (
                  <div 
                    key={dateStr}
                    className={`w-full h-full rounded-sm ${getColorClass(count)} hover:ring-2 hover:ring-primary/50 transition-all cursor-crosshair`}
                    title={getTooltipText(dateStr, count)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-xs text-base-content/60 mt-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-base-200 border border-base-300" />
            <div className="w-3 h-3 rounded-sm bg-[#9be9a8]" />
            <div className="w-3 h-3 rounded-sm bg-[#40c463]" />
            <div className="w-3 h-3 rounded-sm bg-[#30a14e]" />
            <div className="w-3 h-3 rounded-sm bg-[#216e39]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
