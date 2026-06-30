import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title_en' } }),
    defineField({ name: 'title_fa', type: 'string', title: 'Title (FA)' }),
    defineField({ name: 'title_en', type: 'string', title: 'Title (EN)' }),
    defineField({ name: 'sections', type: 'array', title: 'Sections', of: [{ type: 'reference', to: [{ type: 'section' }] }] })
  ]
});
