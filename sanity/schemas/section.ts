import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({ name: 'key', type: 'string', title: 'Key' }),
    defineField({ name: 'heading_fa', type: 'string', title: 'Heading (FA)' }),
    defineField({ name: 'heading_en', type: 'string', title: 'Heading (EN)' }),
    defineField({ name: 'content_fa', type: 'text', title: 'Content (FA)' }),
    defineField({ name: 'content_en', type: 'text', title: 'Content (EN)' })
  ]
});
