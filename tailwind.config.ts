import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import rtl from 'tailwindcss-rtl';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/modules/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      container: { center: true, padding: '2rem' }
    }
  },
  plugins: [rtl(), plugin(() => {})]
} satisfies Config;
