/**
 * Payload CMS API Client
 * Fetches data from the Payload CMS REST API
 */

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3001';

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  alt: string;
  caption?: string;
  url: string;
  filename: string;
  mimeType: string;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: { url: string; width: number; height: number };
    card?: { url: string; width: number; height: number };
    hero?: { url: string; width: number; height: number };
  };
}

export interface Location {
  city?: string;
  country?: string;
  address?: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: any; // Lexical rich text
  shortDescription?: string;
  category: Category | string;
  tags?: (Tag | string)[];
  thumbnail?: Media | string;
  gallery?: { image: Media | string; caption?: string }[];
  websiteUrl?: string;
  contactEmail?: string;
  location?: Location;
  socialLinks?: SocialLinks;
  isFeatured: boolean;
  rating?: number;
  status: 'draft' | 'published' | 'archived';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

type QueryParams = Record<string, string | number | boolean | undefined>;

async function fetchAPI<T>(
  endpoint: string,
  params?: QueryParams
): Promise<T> {
  const url = new URL(`${PAYLOAD_URL}/api${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Listings API
export async function getListings(options?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
  sort?: string;
}): Promise<PaginatedResponse<Listing>> {
  const params: QueryParams = {
    page: options?.page,
    limit: options?.limit || 12,
    depth: 2, // Populate relations
  };

  // Build where clause
  const where: string[] = [];

  if (options?.category) {
    where.push(`where[category.slug][equals]=${options.category}`);
  }

  if (options?.tag) {
    where.push(`where[tags.slug][equals]=${options.tag}`);
  }

  if (options?.featured) {
    where.push(`where[isFeatured][equals]=true`);
  }

  if (options?.search) {
    where.push(`where[or][0][title][contains]=${encodeURIComponent(options.search)}`);
    where.push(`where[or][1][shortDescription][contains]=${encodeURIComponent(options.search)}`);
  }

  // Sort
  if (options?.sort) {
    switch (options.sort) {
      case 'newest':
        params.sort = '-createdAt';
        break;
      case 'oldest':
        params.sort = 'createdAt';
        break;
      case 'alphabetical':
        params.sort = 'title';
        break;
      case 'rating':
        params.sort = '-rating';
        break;
    }
  }

  let endpoint = '/listings';
  if (where.length > 0) {
    endpoint += `?${where.join('&')}`;
  }

  return fetchAPI<PaginatedResponse<Listing>>(endpoint, params);
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const response = await fetchAPI<PaginatedResponse<Listing>>('/listings', {
    'where[slug][equals]': slug,
    depth: 2,
    limit: 1,
  });

  return response.docs[0] || null;
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const response = await fetchAPI<PaginatedResponse<Listing>>('/listings', {
    'where[isFeatured][equals]': true,
    depth: 2,
    limit,
  });

  return response.docs;
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  const response = await fetchAPI<PaginatedResponse<Category>>('/categories', {
    sort: 'order',
    limit: 100,
  });

  return response.docs;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await fetchAPI<PaginatedResponse<Category>>('/categories', {
    'where[slug][equals]': slug,
    limit: 1,
  });

  return response.docs[0] || null;
}

export async function getCategoriesWithCounts(): Promise<(Category & { count: number })[]> {
  const categories = await getCategories();

  // Get counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const listings = await fetchAPI<PaginatedResponse<Listing>>('/listings', {
        'where[category][equals]': category.id,
        limit: 0,
      });

      return {
        ...category,
        count: listings.totalDocs,
      };
    })
  );

  return categoriesWithCounts;
}

// Tags API
export async function getTags(): Promise<Tag[]> {
  const response = await fetchAPI<PaginatedResponse<Tag>>('/tags', {
    sort: 'name',
    limit: 100,
  });

  return response.docs;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const response = await fetchAPI<PaginatedResponse<Tag>>('/tags', {
    'where[slug][equals]': slug,
    limit: 1,
  });

  return response.docs[0] || null;
}

// Stats API
export async function getStats(): Promise<{
  totalListings: number;
  totalCategories: number;
  featuredCount: number;
}> {
  const [listings, categories, featured] = await Promise.all([
    fetchAPI<PaginatedResponse<Listing>>('/listings', { limit: 0 }),
    fetchAPI<PaginatedResponse<Category>>('/categories', { limit: 0 }),
    fetchAPI<PaginatedResponse<Listing>>('/listings', {
      'where[isFeatured][equals]': true,
      limit: 0,
    }),
  ]);

  return {
    totalListings: listings.totalDocs,
    totalCategories: categories.totalDocs,
    featuredCount: featured.totalDocs,
  };
}

// Helper to get image URL
export function getImageUrl(media: Media | string | undefined): string | null {
  if (!media) return null;
  if (typeof media === 'string') return `${PAYLOAD_URL}${media}`;
  return `${PAYLOAD_URL}${media.url}`;
}

export function getThumbnailUrl(media: Media | string | undefined): string | null {
  if (!media) return null;
  if (typeof media === 'string') return `${PAYLOAD_URL}${media}`;
  if (media.sizes?.thumbnail?.url) {
    return `${PAYLOAD_URL}${media.sizes.thumbnail.url}`;
  }
  return `${PAYLOAD_URL}${media.url}`;
}
