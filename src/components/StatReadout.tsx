import { cn } from '@/lib/utils';

interface StatReadoutProps {
  value: number | string;
  label: string;
  className?: string;
  accent?: boolean;
}

export function StatReadout({ value, label, className, accent }: StatReadoutProps) {
  return (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'readout',
          accent && 'text-[var(--accent)]'
        )}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="readout-label mt-1">{label}</div>
    </div>
  );
}

interface StatsGridProps {
  stats: { value: number | string; label: string; accent?: boolean }[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        'hardware-grid',
        `grid-cols-${Math.min(stats.length, 4)}`,
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
      }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="p-6 flex items-center justify-center">
          <StatReadout {...stat} />
        </div>
      ))}
    </div>
  );
}
