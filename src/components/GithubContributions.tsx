import { getContributionData } from "@/lib/github";

interface GithubContributionsProps {
    username: string;
}

export default async function GithubContributions({ username }: GithubContributionsProps) {
    const data = await getContributionData(username);

    if (!data) {
        return null;
    }

    // Get month labels from the weeks
    const getMonthLabel = (weekIndex: number) => {
        const week = data.weeks[weekIndex];
        if (!week || !week.contributionDays[0]) return null;
        
        const date = new Date(week.contributionDays[0].date);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Show month label at the start of each month
        if (weekIndex === 0 || date.getDate() <= 7) {
            return monthNames[date.getMonth()];
        }
        return null;
    };

    const weekdays = ['Mon', 'Wed', 'Fri'];

    return (
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                <h3 className="text-lg md:text-xl font-semibold">GitHub Activity</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">
                    {data.totalContributions} contributions this year
                </span>
            </div>
            
            <div className="overflow-x-auto pb-2">
                <div className="inline-block min-w-full">
                    {/* Month labels */}
                    <div className="flex gap-[2px] md:gap-1 mb-2 ml-8">
                        {data.weeks.map((week, weekIndex) => {
                            const monthLabel = getMonthLabel(weekIndex);
                            return (
                                <div key={weekIndex} className="w-2.5 md:w-3 text-[10px] md:text-xs text-muted-foreground">
                                    {monthLabel}
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Contribution grid with day labels */}
                    <div className="flex gap-1">
                        {/* Day labels */}
                        <div className="flex flex-col justify-between text-[9px] md:text-[10px] text-muted-foreground pr-1 py-[1px]">
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                        </div>
                        
                        {/* Contribution squares */}
                        <div className="flex gap-[2px] md:gap-1">
                            {data.weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-[2px] md:gap-1">
                                    {week.contributionDays.map((day, dayIndex) => (
                                        <div
                                            key={dayIndex}
                                            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
                                            style={{
                                                backgroundColor: day.contributionCount === 0 
                                                    ? 'rgba(128, 128, 128, 0.2)' 
                                                    : day.color
                                            }}
                                            title={`${day.date}: ${day.contributionCount} contributions`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 md:gap-4 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px]" style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }} />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px]" style={{ backgroundColor: '#0e4429' }} />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px]" style={{ backgroundColor: '#006d32' }} />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px]" style={{ backgroundColor: '#26a641' }} />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px]" style={{ backgroundColor: '#39d353' }} />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
