import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IconSearch, IconFilter, IconGrid, IconList, IconX, IconChevronDown, getCategoryIcon } from '@/components/Icons';
import type { Category, Tag } from '@/lib/api';

interface FilterState {
  search: string;
  category: string;
  tags: string[];
  sort: string;
}

interface DirectoryFiltersProps {
  categories: Category[];
  tags: Tag[];
  initialFilters?: Partial<FilterState>;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFiltersChange: (filters: FilterState) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'rating', label: 'Top Rated' },
];

export function DirectoryFilters({
  categories,
  tags,
  initialFilters,
  viewMode,
  onViewModeChange,
  onFiltersChange,
}: DirectoryFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: initialFilters?.search || '',
    category: initialFilters?.category || '',
    tags: initialFilters?.tags || [],
    sort: initialFilters?.sort || 'newest',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        updateFilters({ search: searchValue });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update URL
    const params = new URLSearchParams();
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.tags.length) params.set('tags', newFilters.tags.join(','));
    if (newFilters.sort !== 'newest') params.set('sort', newFilters.sort);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters, onFiltersChange]);

  const toggleTag = (tagSlug: string) => {
    const newTags = filters.tags.includes(tagSlug)
      ? filters.tags.filter(t => t !== tagSlug)
      : [...filters.tags, tagSlug];
    updateFilters({ tags: newTags });
  };

  const clearFilters = () => {
    setSearchValue('');
    updateFilters({ search: '', category: '', tags: [], sort: 'newest' });
  };

  const hasActiveFilters = filters.search || filters.category || filters.tags.length > 0;

  return (
    <div className="space-y-4">
      {/* Main toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search listings..."
            icon={<IconSearch size={16} />}
          />
        </div>

        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'accent' : 'control'}
          size="default"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <IconFilter size={16} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <Badge variant="accent" size="sm" className="ml-1">
              {(filters.category ? 1 : 0) + filters.tags.length}
            </Badge>
          )}
        </Button>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className={cn(
              'control h-9 px-3 pr-8 text-sm font-medium appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'
            )}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex border border-[var(--border)] rounded overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'w-9 h-9 flex items-center justify-center transition-colors',
              viewMode === 'grid'
                ? 'bg-[var(--control-active)]'
                : 'bg-[var(--control)] hover:bg-[var(--control-active)]'
            )}
            aria-label="Grid view"
          >
            <IconGrid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'w-9 h-9 flex items-center justify-center transition-colors border-l border-[var(--border)]',
              viewMode === 'list'
                ? 'bg-[var(--control-active)]'
                : 'bg-[var(--control)] hover:bg-[var(--control-active)]'
            )}
            aria-label="List view"
          >
            <IconList size={16} />
          </button>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="panel p-4 space-y-4 animate-fade-in">
          {/* Categories */}
          <div>
            <label className="text-label text-[var(--muted-foreground)] block mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateFilters({ category: '' })}
                className={cn(
                  'control px-3 py-1.5 text-sm font-medium',
                  !filters.category && 'bg-[var(--accent)] text-white border-[var(--accent)]'
                )}
              >
                All
              </button>
              {categories.map(cat => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateFilters({ category: cat.slug })}
                    className={cn(
                      'control px-3 py-1.5 text-sm font-medium flex items-center gap-1.5',
                      filters.category === cat.slug && 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    )}
                  >
                    <Icon size={14} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-label text-[var(--muted-foreground)] block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.slug)}
                  className={cn(
                    'control px-3 py-1.5 text-sm font-medium',
                    filters.tags.includes(tag.slug) && 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  )}
                  style={tag.color && !filters.tags.includes(tag.slug) ? { borderColor: tag.color } : undefined}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-[var(--border)]">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[var(--muted-foreground)]">
                <IconX size={14} />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active filters chips */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-[var(--muted-foreground)]">Active:</span>
          {filters.search && (
            <Badge variant="default" className="gap-1">
              Search: {filters.search}
              <button onClick={() => { setSearchValue(''); updateFilters({ search: '' }); }}>
                <IconX size={10} />
              </button>
            </Badge>
          )}
          {filters.category && (
            <Badge variant="default" className="gap-1">
              {categories.find(c => c.slug === filters.category)?.name}
              <button onClick={() => updateFilters({ category: '' })}>
                <IconX size={10} />
              </button>
            </Badge>
          )}
          {filters.tags.map(tagSlug => {
            const tag = tags.find(t => t.slug === tagSlug);
            return tag ? (
              <Badge key={tagSlug} variant="default" className="gap-1">
                {tag.name}
                <button onClick={() => toggleTag(tagSlug)}>
                  <IconX size={10} />
                </button>
              </Badge>
            ) : null;
          })}
          <Button variant="link" size="sm" onClick={clearFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
