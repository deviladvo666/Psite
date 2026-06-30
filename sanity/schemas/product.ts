import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title_fa', type: 'string', title: 'Title (FA)' }),
    defineField({ name: 'title_en', type: 'string', title: 'Title (EN)' }),
    defineField({ name: 'description_fa', type: 'text', title: 'Description (FA)' }),
    defineField({ name: 'description_en', type: 'text', title: 'Description (EN)' }),
    defineField({ name: 'image', type: 'image', title: 'Image' })
  ]
});
