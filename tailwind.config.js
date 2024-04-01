/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '340px',  // Adjusted medium breakpoint
        'md': '600px',
        'lg': '770px',
      },
      fontSize: {
        'sm': '.8rem', // Adjusted small font size
      },
    },
  },
  plugins: [],
}

