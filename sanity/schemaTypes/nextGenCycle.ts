import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nextGenCycle',
  title: 'Next Generation Of Journalists Cycle',
  type: 'document',
  fields: [
    defineField({
      name: 'stage',
      title: 'Stage',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'stage',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'stage',
      media: 'image',
    },
  },
})
