/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#101820",
        teal: "#00313C",
        alpine: "#73D8E0",
        brandwhite: "#FFFFFF"
      }
    }
  },
  plugins: [],
};
