/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        'sans': ['Afacad', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'afacad': ['Afacad', 'sans-serif'],
      },
      fontSize: {
        'xl': ['1.35rem', '1.75rem'],
        '4xl': ['7.25rem', '6.5rem'],
      },
      lineHeight: {
        'tight': '1.0',
      },
      maxWidth: {
        'sm': '34rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        emerald: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
        green: {
          400: '#85ed68',
          500: '#85ed68',
          600: '#85ed68',
        },
        teal: {
          800: '#1d4044',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight to avoid conflicts with Ant Design
  },
}