import type { CollectionConfig } from 'payload'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'isFeatured', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only read published listings
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Logged-in users can read all
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief description for listing cards (max 200 chars)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'websiteUrl',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'contactEmail',
          type: 'email',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'country',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isFeatured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show on homepage',
            width: '33%',
          },
        },
        {
          name: 'rating',
          type: 'number',
          min: 0,
          max: 5,
          admin: {
            description: 'Rating out of 5',
            width: '33%',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'draft',
          required: true,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title (defaults to listing title if blank)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO description (max 160 chars)',
      },
    },
  ],
  timestamps: true,
}
