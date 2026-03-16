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
        teal: "#00313c",
        alpine: "#73d8e0",
        white: "#ffffff",
        brandwhite: "#ffffff"
      }
    }
  },
  plugins: [],
};
