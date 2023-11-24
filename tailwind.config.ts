import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37374A',
        secondary: '#272736',
        'primary-dark': '#242432',
        'light-text': '#BFBDD9',
        'empty-text': '#BCBCF2',
        'input': '#8383AF',
      },
    },
  },
  plugins: [],
};
export default config;
