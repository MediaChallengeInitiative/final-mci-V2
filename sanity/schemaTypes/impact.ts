import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'impact',
  title: 'Impact Metrics',
  type: 'document',
  fields: [
    defineField({
      name: 'solution',
      title: 'Related Solution',
      type: 'reference',
      to: [{type: 'solution'}],
    }),
    defineField({
      name: 'metricName',
      title: 'Metric Name',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
    }),
    defineField({
      name: 'measurementDate',
      title: 'Measurement Date',
      type: 'date',
    }),
    defineField({
      name: 'measurementMethod',
      title: 'Measurement Method',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
