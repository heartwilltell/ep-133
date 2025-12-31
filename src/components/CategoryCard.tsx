import { cn } from '@/lib/utils';
import { getCategoryIcon } from '@/components/Icons';
import type { Category } from '@/lib/api';

interface CategoryCardProps {
  category: Category & { count?: number };
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <a
      href={`/categories/${category.slug}`}
      className={cn(
        'group panel p-4 flex flex-col',
        'transition-all duration-150',
        'hover:border-[var(--accent)]/50',
        'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]',
        className
      )}
    >
      {/* Icon and count */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded bg-[var(--control)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
          <Icon size={20} />
        </div>
        {category.count !== undefined && (
          <span className="font-mono text-2xl font-bold text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors">
            {category.count}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--accent)] transition-colors">
        {category.name}
      </h3>

      {/* Description */}
      {category.description && (
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
          {category.description}
        </p>
      )}
    </a>
  );
}

// Compact version for sidebar/footer
export function CategoryChip({ category }: { category: Category }) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <a
      href={`/categories/${category.slug}`}
      className={cn(
        'control inline-flex items-center gap-2 px-3 py-1.5',
        'text-sm font-medium',
        'hover:text-[var(--accent)]'
      )}
    >
      <Icon size={14} />
      <span>{category.name}</span>
    </a>
  );
}
