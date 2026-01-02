import { getPayload } from 'payload'
import config from './payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: process.env.ADMIN_EMAIL || 'admin@example.com' } },
  })

  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'changeme123',
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('Created admin user')
  }

  // Create categories
  const categories = [
    { name: 'Sample Packs', slug: 'sample-packs', icon: 'music', order: 1, description: 'Curated sample collections for EP-133' },
    { name: 'Patches & Presets', slug: 'patches-presets', icon: 'sliders', order: 2, description: 'Sound configurations and presets' },
    { name: 'Accessories', slug: 'accessories', icon: 'package', order: 3, description: 'Cases, stands, and hardware accessories' },
    { name: 'Tutorials', slug: 'tutorials', icon: 'play', order: 4, description: 'Video guides and walkthroughs' },
    { name: 'Communities', slug: 'communities', icon: 'users', order: 5, description: 'Forums, Discord servers, and groups' },
    { name: 'Tools & Software', slug: 'tools-software', icon: 'wrench', order: 6, description: 'Software utilities and companion apps' },
  ]

  const categoryMap: Record<string, number> = {}

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categoryMap[cat.slug] = created.id
      console.log(`Created category: ${cat.name}`)
    } else {
      categoryMap[cat.slug] = existing.docs[0].id
    }
  }

  // Create tags
  const tags = [
    { name: 'Free', slug: 'free', color: '#22c55e' },
    { name: 'Premium', slug: 'premium', color: '#f59e0b' },
    { name: 'Official', slug: 'official', color: '#3b82f6' },
    { name: 'Community', slug: 'community', color: '#8b5cf6' },
    { name: 'Beginner', slug: 'beginner', color: '#06b6d4' },
    { name: 'Advanced', slug: 'advanced', color: '#ef4444' },
    { name: 'Lo-Fi', slug: 'lo-fi', color: '#ec4899' },
    { name: 'Hip-Hop', slug: 'hip-hop', color: '#f97316' },
    { name: 'Electronic', slug: 'electronic', color: '#14b8a6' },
  ]

  const tagMap: Record<string, number> = {}

  for (const tag of tags) {
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: tag.slug } },
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'tags',
        data: tag,
      })
      tagMap[tag.slug] = created.id
      console.log(`Created tag: ${tag.name}`)
    } else {
      tagMap[tag.slug] = existing.docs[0].id
    }
  }

  // Create sample listings
  const listings = [
    {
      title: 'Lo-Fi Beats Sample Pack',
      slug: 'lo-fi-beats-sample-pack',
      shortDescription: 'Over 200 dusty, vinyl-textured samples perfect for chill beats on the EP-133.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'A comprehensive collection of lo-fi samples optimized for the EP-133 K.O. II. Includes one-shots, loops, and textures.' }],
            },
          ],
        },
      },
      category: categoryMap['sample-packs'],
      tags: [tagMap['free'], tagMap['community'], tagMap['lo-fi']],
      websiteUrl: 'https://example.com/lofi-pack',
      contactEmail: 'samples@example.com',
      isFeatured: true,
      status: 'published',
      rating: 4.5,
    },
    {
      title: 'EP-133 Masterclass',
      slug: 'ep-133-masterclass',
      shortDescription: 'Complete video course covering every feature of the EP-133 from basics to advanced.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Learn everything about your EP-133 with this in-depth video masterclass. Perfect for beginners and intermediate users.' }],
            },
          ],
        },
      },
      category: categoryMap['tutorials'],
      tags: [tagMap['premium'], tagMap['beginner']],
      websiteUrl: 'https://example.com/masterclass',
      isFeatured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'K.O. Community Discord',
      slug: 'ko-community-discord',
      shortDescription: 'Active Discord server with 5000+ EP-133 enthusiasts sharing tips and samples.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Join the largest community of EP-133 users. Share your creations, get feedback, and learn from fellow beat makers.' }],
            },
          ],
        },
      },
      category: categoryMap['communities'],
      tags: [tagMap['free'], tagMap['community']],
      websiteUrl: 'https://discord.gg/example',
      isFeatured: true,
      status: 'published',
      rating: 4.8,
    },
    {
      title: 'Hardshell Carry Case',
      slug: 'hardshell-carry-case',
      shortDescription: 'Premium protective case designed specifically for the EP-133 dimensions.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Keep your EP-133 safe with this custom-fitted hardshell case. Features foam padding and accessory pockets.' }],
            },
          ],
        },
      },
      category: categoryMap['accessories'],
      tags: [tagMap['premium']],
      websiteUrl: 'https://example.com/case',
      location: { city: 'Los Angeles', country: 'USA' },
      status: 'published',
      rating: 4.2,
    },
    {
      title: 'Pocket Operator Sync Tool',
      slug: 'pocket-operator-sync-tool',
      shortDescription: 'Desktop app for syncing EP-133 with other Teenage Engineering devices.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Seamlessly sync your EP-133 with Pocket Operators and other TE devices using this free utility.' }],
            },
          ],
        },
      },
      category: categoryMap['tools-software'],
      tags: [tagMap['free'], tagMap['official']],
      websiteUrl: 'https://example.com/sync-tool',
      status: 'published',
      rating: 4.0,
    },
    {
      title: 'Hip-Hop Drums Vol. 1',
      slug: 'hip-hop-drums-vol-1',
      shortDescription: 'Classic boom-bap and trap drum samples formatted for EP-133.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '150+ drum one-shots and loops in the hip-hop style. Pre-chopped and ready to load onto your EP-133.' }],
            },
          ],
        },
      },
      category: categoryMap['sample-packs'],
      tags: [tagMap['premium'], tagMap['hip-hop']],
      websiteUrl: 'https://example.com/hiphop-drums',
      status: 'published',
      rating: 4.7,
    },
  ]

  for (const listing of listings) {
    const existing = await payload.find({
      collection: 'listings',
      where: { slug: { equals: listing.slug } },
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'listings',
        data: listing,
      })
      console.log(`Created listing: ${listing.title}`)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error seeding database:', err)
  process.exit(1)
})
