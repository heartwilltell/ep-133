import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Listings } from './collections/Listings'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | EP-133 Directory',
    },
  },
  collections: [Users, Categories, Tags, Listings, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://localhost:5432/ep133_directory',
    },
  }),
  cors: [
    'http://localhost:4321',
    'http://localhost:3000',
    process.env.PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  serverURL: process.env.PAYLOAD_URL || 'http://localhost:3001',
})
