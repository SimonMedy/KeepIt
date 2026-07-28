/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4648d4",
          light: "#6366F1",
          dark: "#2f2ebe",
          container: "#6063ee",
          "on-container": "#fffbff"
        },
        background: "#faf8ff",
        surface: {
          DEFAULT: "#faf8ff",
          dim: "#d2d9f4",
          bright: "#faf8ff",
          lowest: "#ffffff",
          low: "#f2f3ff",
          container: "#eaedff",
          high: "#e2e7ff",
          highest: "#dae2fd"
        },
        "on-background": "#131b2e",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-surface": "#131b2e",
        "on-surface-variant": "#464554",
        outline: {
          DEFAULT: "#767586",
          variant: "#c7c4d7"
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          "on-container": "#93000a"
        }
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
