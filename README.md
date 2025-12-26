# EP-133 Directory

A modern, fast, SEO-friendly directory website for EP-133 K.O. II resources, built with an aesthetic inspired by Teenage Engineering's hardware design.

## Tech Stack

- **[Astro](https://astro.build)** - Fast, content-focused web framework
- **[React](https://react.dev)** - Interactive UI components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first styling
- **[Payload CMS](https://payloadcms.com)** - Headless content management
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Bun](https://bun.sh)** - Fast JavaScript runtime & package manager
- **[oxlint](https://oxc-project.github.io/docs/guide/usage/linter.html)** - Fast linter & formatter

## Design System

The visual design is inspired by the **Teenage Engineering EP-133 K.O. II**:

- Minimal, utilitarian, instrument-like interface
- Monochrome palette with orange accent (`#ff6b00`)
- Strong grid layouts with "panel" aesthetic
- Monospace typography for labels and data
- Controls that feel like hardware buttons
- Large numeric readouts for stats

## Project Structure

```
ep-133/
├── src/
│   ├── components/       # React & Astro components
│   │   ├── ui/          # Base UI components (Button, Badge, etc.)
│   │   └── ...          # Feature components
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities & API client
│   ├── pages/           # Astro pages (file-based routing)
│   │   ├── index.astro          # Home page
│   │   ├── listings/            # Directory pages
│   │   │   ├── index.astro      # Listings list
│   │   │   └── [slug].astro     # Listing detail
│   │   └── categories/          # Category pages
│   │       ├── index.astro      # Categories list
│   │       └── [slug].astro     # Category detail
│   └── styles/
│       └── global.css   # Tailwind + design tokens
├── cms/                  # Payload CMS
│   ├── src/
│   │   ├── collections/ # Data models
│   │   ├── payload.config.ts
│   │   └── seed.ts      # Database seeder
│   └── package.json
├── public/              # Static assets
├── package.json
└── oxlint.json          # Linter config
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- [PostgreSQL](https://www.postgresql.org/) 14+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ep-133

# Install frontend dependencies
bun install

# Install CMS dependencies
cd cms && bun install && cd ..

# Copy environment files
cp .env.example .env
cp cms/.env.example cms/.env

# Edit .env files with your configuration
```

### Environment Variables

**Root `.env`:**
```env
PAYLOAD_URL=http://localhost:3001
PUBLIC_SITE_URL=http://localhost:4321
```

**CMS `cms/.env`:**
```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/ep133_directory
PAYLOAD_SECRET=your-secret-key-change-this
PAYLOAD_URL=http://localhost:3001
PUBLIC_SITE_URL=http://localhost:4321
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

### Running Locally

**Terminal 1 - Start PostgreSQL:**
```bash
# Using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ep133_directory \
  -p 5432:5432 \
  postgres:16-alpine

# Or use your local PostgreSQL installation
# createdb ep133_directory
```

**Terminal 2 - Start Payload CMS:**
```bash
cd cms
bun run dev
# CMS runs at http://localhost:3001/admin
```

**Terminal 3 - Start Astro:**
```bash
bun run dev
# Site runs at http://localhost:4321
```

### Seed Initial Data

```bash
bun run seed
# Creates admin user, categories, tags, and sample listings
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start Astro dev server |
| `bun dev:cms` | Start Payload CMS |
| `bun dev:all` | Start both (parallel) |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun lint` | Run oxlint |
| `bun format` | Format code with oxlint |
| `bun seed` | Seed CMS database |

## CMS Collections

### Listings
Main directory entries with fields:
- `title`, `slug` (required)
- `description` (rich text)
- `shortDescription` (plain text, max 200 chars)
- `category` (relation)
- `tags` (relation, multiple)
- `thumbnail`, `gallery` (media)
- `websiteUrl`, `contactEmail`
- `location` (city, country, address)
- `socialLinks` (twitter, instagram, youtube)
- `isFeatured`, `rating`, `status`
- `metaTitle`, `metaDescription` (SEO)

### Categories
- `name`, `slug`, `description`
- `icon` (icon identifier)
- `order` (display order)

### Tags
- `name`, `slug`
- `color` (hex color)

### Media
- Image uploads with responsive sizes
- `alt`, `caption`

## Adding New Fields

1. **Update Payload collection** (`cms/src/collections/Listings.ts`):
```typescript
{
  name: 'newField',
  type: 'text',
  required: true,
}
```

2. **Regenerate types:**
```bash
cd cms && bun run generate:types
```

3. **Update API types** (`src/lib/api.ts`):
```typescript
export interface Listing {
  // ... existing fields
  newField: string;
}
```

4. **Use in components:**
```tsx
<p>{listing.newField}</p>
```

## Deployment

### Astro (Static)

Build and deploy to any static host:
```bash
bun run build
# Deploy dist/ folder
```

### Payload CMS

Deploy to any Node.js host with PostgreSQL:
- Docker
- Railway, Render, Fly.io
- Vercel (with external PostgreSQL)
- Self-hosted VPS

## Features

- **Performance**: Static site generation, optimized images, minimal JS
- **SEO**: JSON-LD, meta tags, canonical URLs, clean slugs
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Dark Mode**: System preference detection + manual toggle
- **Responsive**: Mobile-first design with hardware-panel aesthetic

## Future Improvements

- [ ] User submissions with approval workflow
- [ ] Favorites/bookmarks (localStorage or auth)
- [ ] User reviews and ratings
- [ ] Map view for location-based listings
- [ ] RSS feed
- [ ] Image optimization with Astro Image
- [ ] Full-text search with Payload

## License

MIT

---

*This is an unofficial community project. Not affiliated with Teenage Engineering.*
