import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'partnerName',
      title: 'Partner Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'partnerName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'partnerSince',
      title: 'Partner Since',
      type: 'datetime',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors',
      type: 'text',
    }),
    defineField({
      name: 'recognition',
      title: 'Recognition',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'partnerName',
      media: 'image',
    },
  },
})
