import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import page from './sanity/schemas/page';
import section from './sanity/schemas/section';
import product from './sanity/schemas/product';
import siteSettings from './sanity/schemas/siteSettings';

export default defineConfig({
  name: 'default',
  title: 'Premium Personal Site',
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  plugins: [deskTool()],
  schema: {
    types: [page, section, product, siteSettings]
  }
});
