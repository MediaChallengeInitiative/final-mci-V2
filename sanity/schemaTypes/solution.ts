import {defineField, defineType} from 'sanity'

// Define the comingSoonItem schema
export const comingSoonItem = defineType({
  name: 'comingSoonItem',
  title: 'Coming Soon Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Comingsoon Icon or Image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'expectedDate',
      title: 'Expected Date',
      type: 'date',
    }),
  ],
})

// Define the main document schema for Solution
export const solution = defineType({
  name: 'solution',
  title: 'Solutions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'leadingAssumption',
      title: 'Leading Assumption',
      type: 'text',
    }),
    defineField({
      name: 'challengeTitle',
      title: 'Challenge Title',
      type: 'string',
    }),
    defineField({
      name: 'challengeStatement',
      title: 'Challenge Statement',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'solution',
      title: 'How We Have Fixed Challenge',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'bgColorFrom',
      title: 'Background Color From',
      type: 'string',
      initialValue: '#3cb371', // initial color for 'from'
    }),
    defineField({
      name: 'bgColorTo',
      title: 'Background Color To',
      type: 'string',
      initialValue: '#3cb371', // initial color for 'to'
    }),
    defineField({
      name: 'callToAction',
      title: 'Call To Action',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'The name of the icon from react-icons (e.g., FaBrain, FaUsers, etc.)',
    }),
    defineField({
      name: 'iconSize',
      title: 'Icon Size',
      type: 'number',
      initialValue: 24, // Default size for icons
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enable hotspot for better cropping control
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enable hotspot for images in the gallery
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming Soon',
      type: 'array',
      of: [{type: 'comingSoonItem'}], // Reference the comingSoonItem object type here
    }),
  ],
})
