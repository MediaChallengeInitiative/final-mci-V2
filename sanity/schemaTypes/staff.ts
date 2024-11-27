import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
    // defineField({
    //   name: 'qualifications',
    //   title: 'Qualifications',
    //   type: 'array',
    //   of: [{type: 'string'}],
    // }),
    // defineField({
    //   name: 'achievements',
    //   title: 'Key Achievements',
    //   type: 'array',
    //   of: [{type: 'string'}],
    // }),
    // defineField({
    //   name: 'expertise',
    //   title: 'Areas of Expertise',
    //   type: 'array',
    //   of: [{type: 'string'}],
    // }),
    // defineField({
    //   name: 'contact',
    //   title: 'Contact Information',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       name: 'email',
    //       title: 'Email',
    //       type: 'string',
    //       validation: (Rule) => Rule.required().email(),
    //     }),
    //     defineField({
    //       name: 'phone',
    //       title: 'Phone',
    //       type: 'string',
    //     }),
    //     defineField({
    //       name: 'socialLink',
    //       title: 'Social URL',
    //       type: 'url',
    //     }),
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
