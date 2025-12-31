# EP-133 Directory - Payload CMS

This directory contains the Payload CMS installation for the EP-133 Directory project.

## Installation Status

✅ **Properly Configured According to Official Documentation**

The Payload CMS setup follows the [official installation guide](https://payloadcms.com/docs/getting-started/installation) for Payload v3.

### What's Included

#### Core Configuration
- **Payload Config** (`src/payload.config.ts`): Main configuration file with PostgreSQL adapter and Lexical editor
- **Next.js Config** (`next.config.mjs`): Properly configured with `withPayload()` wrapper
- **TypeScript Config** (`tsconfig.json`): Configured with proper paths and module resolution

#### Collections
1. **Users** - Authentication and user management with role-based access
2. **Listings** - Main content collection with rich text, media uploads, and SEO fields
3. **Categories** - Taxonomy for organizing listings
4. **Tags** - Additional taxonomy system
5. **Media** - File uploads with image resizing (thumbnail, card, hero sizes)

#### Admin Panel
- Located at `/admin` route
- Custom EP-133 inspired theme (see `src/app/(payload)/custom.scss`)
- Auto-generated admin UI pages

#### API Routes
- REST API at `/api/*`
- GraphQL API at `/api/graphql`
- GraphQL Playground at `/api/graphql-playground`

### Prerequisites

According to the Payload CMS documentation, you need:

- Node.js 20.9.0 or higher
- Bun (or npm/yarn/pnpm)
- PostgreSQL database

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URI=postgresql://user:password@localhost:5432/ep133_directory
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
PAYLOAD_URL=http://localhost:3001
PUBLIC_SITE_URL=http://localhost:4321
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up your PostgreSQL database and update `DATABASE_URI` in `.env`

3. Run the development server:
   ```bash
   bun run dev
   ```

   The admin panel will be available at http://localhost:3001/admin

4. (Optional) Seed the database with initial data:
   ```bash
   bun run seed
   ```

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run generate:types` - Generate TypeScript types from collections
- `bun run seed` - Seed database with sample data

### Key Features

#### File Uploads
- Local file storage configured via `upload.staticDir` in Media collection
- Automatic image resizing to 3 sizes (thumbnail, card, hero)
- Support for all image types

#### Database
- PostgreSQL with Drizzle ORM
- Automatic migrations
- Type-safe database queries

#### Rich Text Editor
- Lexical editor with full formatting capabilities
- Embedded in Listings collection for rich content

#### Access Control
- Public read access for published content
- Authentication required for create/update/delete operations
- Role-based permissions (Admin, Editor)

### Architecture

This follows the **Payload in Next.js App** pattern from the official documentation:

1. Payload config exports the configuration
2. Next.js config wraps with `withPayload()`
3. Admin UI served from `/admin` route via `app/(payload)/admin/[[...segments]]/page.tsx`
4. API routes served from `/api` via `app/(payload)/api/[...slug]/route.ts`
5. Collections define the data model and access control

### Fixed Issues

✅ Removed non-existent `@payloadcms/storage-local` plugin (Payload v3 uses built-in local storage via `upload.staticDir`)
✅ Created `.env` file from `.env.example`
✅ Created `media/` directory for file uploads

### Next Steps

Once dependencies are installed (when npm registry is accessible):

1. Start PostgreSQL database
2. Run `bun run dev` to start the dev server
3. Visit http://localhost:3001/admin to access the admin panel
4. Create your first user account
5. Start adding content!

## Integration with Main Site

The CMS is designed to be consumed by the Astro frontend located in the parent directory. The API will be available at the URLs configured in `PAYLOAD_URL` for the Astro site to fetch content.

---

For more information, see the [official Payload CMS documentation](https://payloadcms.com/docs).
