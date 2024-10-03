import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your Testimonial',
      options: {
        source: 'name',
      },
    },
    defineField({
      name: 'title_position',
      title: 'Title/Position',
      type: 'string',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title_position',
      media: 'image',
    },
  },
})
