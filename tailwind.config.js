/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#666BED',
        bgDark: '#090A15',
        darkSecondary: '#131723',
        tertiary: '#1E1F21',
        bgLight: '#F7F7F7',
        lightSecondary: '#FFFFFF'
      },
    },
  },
  plugins: [],
};
