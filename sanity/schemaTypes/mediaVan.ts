export default {
  name: 'mediaVan',
  title: 'SDG Media Van',
  type: 'document',
  fields: [
    {
      name: 'location',
      title: 'Current Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Maintenance', value: 'maintenance'},
          {title: 'Transit', value: 'transit'},
        ],
      },
    },
    {
      name: 'equipment',
      title: 'Equipment Inventory',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Equipment Name'},
            {name: 'status', type: 'string', title: 'Status'},
            {name: 'lastMaintenance', type: 'date', title: 'Last Maintenance'},
          ],
        },
      ],
    },
    {
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'date', type: 'date', title: 'Date'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'activity', type: 'string', title: 'Activity'},
          ],
        },
      ],
    },
  ],
}
