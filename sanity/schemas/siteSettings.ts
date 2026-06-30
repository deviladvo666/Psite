import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle_fa', type: 'string', title: 'Site title (FA)' }),
    defineField({ name: 'siteTitle_en', type: 'string', title: 'Site title (EN)' }),
    defineField({ name: 'description_fa', type: 'text', title: 'Description (FA)' }),
    defineField({ name: 'description_en', type: 'text', title: 'Description (EN)' })
  ]
});
