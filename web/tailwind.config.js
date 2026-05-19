/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'pixel-bg': '#0f0f23',
        'pixel-border': '#00ff41',
        'pixel-safe': '#00ff41',
        'pixel-low': '#ffff00',
        'pixel-medium': '#ff9500',
        'pixel-high': '#ff4500',
        'pixel-critical': '#ff0000',
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0, 255, 65, 0.5)',
        'pixel-hover': '6px 6px 0px 0px rgba(0, 255, 65, 0.8)',
      },
    },
  },
  plugins: [],
}
