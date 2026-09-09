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
        navy: {
          DEFAULT: 'var(--color-navy)',
          dark: 'var(--color-navy-dark)',
        },
        background: 'var(--color-background)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          subtle: 'var(--color-surface-subtle)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          onDark: 'var(--color-text-on-dark)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          onDark: 'var(--color-muted-on-dark)',
        },
        accent: {
          gold: 'var(--color-accent-gold)',
        },
      },
      fontFamily: {
        serif: [
          '"Source Serif 4"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        sans: [
          '"DM Sans"',
          '"Segoe UI"',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'header': '0 4px 20px -2px rgba(2, 80, 158, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 10px 25px -5px rgba(2, 80, 158, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
