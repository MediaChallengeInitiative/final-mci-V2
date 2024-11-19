import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fellowship',
  title: 'Fellowships',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Fellowship Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .error('Fellowship Name is required and should have at least 3 characters.'),
    }),
    defineField({
      name: 'program',
      title: 'Related Program',
      type: 'reference',
      to: [{type: 'program'}], // Ensures linkage to a `program` schema
      validation: (Rule) => Rule.required().error('A related program is required.'),
    }),
    defineField({
      name: 'durationMonths',
      title: 'Duration (Months)',
      type: 'number',
      validation: (Rule) => Rule.min(1).error('Duration must be at least 1 month.'),
    }),
    defineField({
      name: 'batchNumber',
      title: 'Batch Number',
      type: 'number',
      validation: (Rule) => Rule.min(1).error('Batch number must be a positive number.'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required().error('Start Date is required.'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          // Safely typecast `context.parent` to include `startDate` and `endDate`
          const parent = context.parent as {startDate?: string} // Explicitly define expected fields
          const startDate = parent?.startDate

          if (startDate && endDate) {
            if (new Date(endDate) < new Date(startDate)) {
              return 'End Date must be after the Start Date.'
            }
          }

          return true // Validation passes
        }),
    }),
    defineField({
      name: 'fellowshipType',
      title: 'Fellowship Type',
      type: 'string',
      options: {
        list: [
          {title: 'Media', value: 'media'},
          {title: 'Communications', value: 'communications'},
        ],
      },
      validation: (Rule) => Rule.required().error('Fellowship Type is required.'),
    }),
  ],
})
