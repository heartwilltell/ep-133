import { cn } from '@/lib/utils';

export default function SearchTrigger() {
  const handleClick = () => {
    // Navigate to listings page with search focus
    window.location.href = '/listings?focus=search';
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'control h-9 px-3 flex items-center gap-2',
        'text-sm text-[var(--muted-foreground)]',
        'animate-press'
      )}
      aria-label="Search listings"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline font-mono text-xs">Search</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-[var(--control-active)] rounded">
        <span>/</span>
      </kbd>
    </button>
  );
}
