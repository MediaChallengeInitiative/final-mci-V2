import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whereAlumniWorkLogos',
  title: 'Where Alumni Work',
  type: 'document',
  fields: [
    defineField({
      name: 'employerName',
      title: 'Employer Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'employerName',
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
  ],
  preview: {
    select: {
      title: 'employerName',
      media: 'image',
    },
  },
})
