import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fellowProfile', // Changed from 'fellow' to 'fellowProfile'
  title: 'Fellows',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'fellowship',
      title: 'Fellowship',
      type: 'reference',
      to: [{type: 'fellowship'}],
    }),
    defineField({
      name: 'batchYear',
      title: 'Batch Year',
      type: 'number',
    }),
    defineField({
      name: 'currentStatus',
      title: 'Current Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Graduated', value: 'graduated'},
          {title: 'Placed', value: 'placed'},
        ],
      },
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
