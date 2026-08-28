/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adeshina: {
          blue: {
            DEFAULT: 'var(--color-adeshina-blue)',
            dark: 'var(--color-adeshina-blue-dark)',
            light: 'var(--color-adeshina-blue-light)',
          },
        },
        navy: 'var(--color-navy)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
    },
  },
  plugins: [],
}
