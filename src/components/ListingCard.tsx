import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { IconStar, IconMapPin, IconExternalLink, getCategoryIcon } from '@/components/Icons';
import type { Listing, Category, Tag } from '@/lib/api';
import { getThumbnailUrl } from '@/lib/api';

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const category = listing.category as Category;
  const tags = (listing.tags || []) as Tag[];
  const thumbnailUrl = getThumbnailUrl(listing.thumbnail as any);
  const CategoryIcon = getCategoryIcon(category?.icon);

  return (
    <a
      href={`/listings/${listing.slug}`}
      className={cn(
        'group panel flex flex-col h-full',
        'transition-all duration-150',
        'hover:border-[var(--accent)]/50',
        'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-[var(--control)] overflow-hidden rounded-t">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CategoryIcon size={32} className="text-[var(--muted-foreground)]" />
          </div>
        )}

        {/* Featured badge */}
        {listing.isFeatured && (
          <div className="absolute top-2 left-2">
            <Badge variant="featured" size="sm">Featured</Badge>
          </div>
        )}

        {/* Rating */}
        {listing.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-[var(--background)]/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-mono">
            <IconStar size={12} className="text-[var(--accent)] fill-[var(--accent)]" />
            <span>{listing.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Category label */}
        <div className="flex items-center gap-1.5 mb-2">
          <CategoryIcon size={12} className="text-[var(--muted-foreground)]" />
          <span className="text-label text-[var(--muted-foreground)]">
            {category?.name || 'Uncategorized'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {listing.title}
        </h3>

        {/* Description */}
        {listing.shortDescription && (
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3 flex-1">
            {listing.shortDescription}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" size="sm">
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" size="sm">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
          {/* Location */}
          {listing.location?.city && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
              <IconMapPin size={12} />
              <span>{listing.location.city}</span>
            </div>
          )}

          {/* Link indicator */}
          <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] ml-auto group-hover:text-[var(--accent)] transition-colors">
            <span className="font-mono">View</span>
            <IconExternalLink size={12} />
          </div>
        </div>
      </div>
    </a>
  );
}

// Skeleton for loading state
export function ListingCardSkeleton() {
  return (
    <div className="panel flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-[var(--control)] rounded-t" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-[var(--control)] rounded" />
        <div className="h-5 w-3/4 bg-[var(--control)] rounded" />
        <div className="h-4 w-full bg-[var(--control)] rounded" />
        <div className="h-4 w-2/3 bg-[var(--control)] rounded" />
        <div className="flex gap-1 pt-3 border-t border-[var(--border)]">
          <div className="h-4 w-16 bg-[var(--control)] rounded" />
          <div className="h-4 w-16 bg-[var(--control)] rounded" />
        </div>
      </div>
    </div>
  );
}
