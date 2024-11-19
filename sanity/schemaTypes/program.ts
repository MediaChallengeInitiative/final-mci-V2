import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Program Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'programType',
      title: 'Program Type',
      type: 'string',
      options: {
        list: [
          {title: 'Fellowship', value: 'fellowship'},
          {title: 'Training', value: 'training'},
          {title: 'Innovation', value: 'innovation'},
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Completed', value: 'completed'},
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'solution',
      title: 'Related Solution',
      type: 'reference',
      to: [{type: 'solution'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid', // Optional: Makes the gallery appear as a grid in the Sanity Studio
      },
    }),
  ],
})
