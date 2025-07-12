module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A259FF', // Vibrant Purple
        accent: '#BFFF3C', // Bright Lime Green
        secondary: '#7F5CFF', // Secondary Purple
        background: {
          hero: '#F8F7FF', // Light purple background
          features: '#F3F0FF', // Lighter purple
          mockup: '#F6FFE6', // Light lime
          benefits: '#F3F0FF', // Lighter purple
          dark: '#2D1A47', // Deep purple
        },
        text: {
          heading: '#2D1A47', // Deep purple
          body: '#3A3A3A', // Neutral dark
        },
        success: '#BFFF3C', // Lime Green
        // legacy colors for reference
        oldprimary: '#0D87E1',
        destructive: '#EF4444',
        muted: '#F9FAFB',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      gradientColorStops: theme => ({
        'purple-lime': ['#A259FF', '#BFFF3C'],
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
}; 