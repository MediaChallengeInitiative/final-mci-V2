import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'story',
  title: 'Stories',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'fellow'}], // Ensure the `fellow` schema exists
    }),
    defineField({
      name: 'storyType',
      title: 'Story Type',
      type: 'string',
      options: {
        list: [
          {title: 'Solution', value: 'solution'},
          {title: 'Narrative Change', value: 'narrative-change'},
          {title: 'Development', value: 'development'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'text',
    }),
    defineField({
      name: 'solutionApproach',
      title: 'Solution Approach',
      type: 'text',
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'text',
    }),
  ],
})
