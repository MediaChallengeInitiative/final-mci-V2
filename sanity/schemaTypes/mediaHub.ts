import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaHub',
  title: 'Media Hub',
  type: 'document',
  fields: [
    defineField({
      name: 'hubTitle',
      title: 'Hub Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'hubTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [
        defineField({
          name: 'objective',
          title: 'Objective',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'viabilityApproach',
      title: 'Viability Approach',
      type: 'text',
    }),
    defineField({
      name: 'projectCycleTitle',
      title: 'Project Cycle Title',
      type: 'string',
      description: 'Title for the project cycle section.',
    }),
    defineField({
      name: 'projectCycle',
      title: 'Project Cycle',
      type: 'array',
      of: [
        defineField({
          name: 'cycleStep',
          title: 'Cycle Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'offerings',
      title: 'Our Offerings',
      type: 'array',
      of: [
        defineField({
          name: 'offering',
          title: 'Offering',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
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
              name: 'partnerLogo',
              title: 'Partner Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'partner',
              title: 'Partner',
              type: 'string',
              description: 'Optional partner or organization associated with this offering.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'innovatorsImpact',
      title: 'Our Innovators Impact',
      type: 'array',
      of: [
        defineField({
          name: 'impactItem', // Renamed to avoid duplication
          title: 'Impact Item',
          type: 'object',
          fields: [
            defineField({
              name: 'partner',
              title: 'Partner',
              type: 'string',
              description: 'Optional partner or organization associated with this offering.',
            }),
            defineField({
              name: 'impact',
              title: 'Impact',
              type: 'object',
              fields: [
                defineField({
                  name: 'item',
                  title: 'Impact Title',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'action',
                      title: 'Action',
                      type: 'string',
                    }),
                  ],
                }),
              ], // Closed the fields array here correctly
            }),
            defineField({
              name: 'partnerLogo',
              title: 'Partner Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'hubTourVideo',
      title: 'Hub Tour Video',
      type: 'url',
      description: 'URL for the Media Hub tour video.',
    }),
    defineField({
      name: 'callForSupport',
      title: 'Call for Support/Donation',
      type: 'object',
      fields: [
        defineField({
          name: 'whatYouCanDo',
          title: 'What You Can Do',
          type: 'array',
          of: [
            defineField({
              name: 'action',
              title: 'Action',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'impactDescription',
          title: 'Impact Description',
          type: 'text',
          description: 'Description of the current impact and potential with support.',
        }),
      ],
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
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],

  preview: {
    select: {
      title: 'hubTitle',
      media: 'image',
    },
  },
})
