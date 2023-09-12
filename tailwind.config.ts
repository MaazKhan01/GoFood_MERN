import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: '60px',
        center: true
      },
      colors : {
        blue: '#005AFF',
        orange: '#ff8400'
      }
    },
  },
  plugins: [],
};
export default config;
