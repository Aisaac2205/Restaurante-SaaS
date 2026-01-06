import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
}

export const StatsCard = ({ title, value, icon: Icon, description, trend }: StatsCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-900" />
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                    {description && (
                        <p className={clsx("text-xs font-medium mt-1", {
                            'text-green-600': trend === 'up',
                            'text-red-500': trend === 'down',
                            'text-gray-400': !trend || trend === 'neutral'
                        })}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
