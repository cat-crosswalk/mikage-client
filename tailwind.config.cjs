const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')

const skeletonPlugin = plugin(({ matchComponents, theme }) => {
  matchComponents(
    {
      skeleton: value => [
        {
          overflow: 'hidden',
          position: 'relative',
        },
        {
          '&::before': {
            content: '""',
            width: '200%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            animation:
              'ghost-loading-slide 4500ms cubic-bezier(0.4, 0, 0.2, 1) -400ms infinite normal both running',
            background: `linear-gradient(
              90deg,
              transparent 10%,
              ${value} 45%,
              ${value} 70%,
              transparent 80%
            )`,
          },
        },
        {
          '&::after': {
            content: '""',
            width: '200%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            animation:
              'ghost-loading-slide 4500ms cubic-bezier(0.4, 0, 0.2, 1) 850ms infinite normal both running',
            background: `linear-gradient(
              90deg,
              transparent 10%,
              ${value} 45%,
              ${value} 70%,
              transparent 80%
            )`,
          },
        },
      ],
    },
    { values: flattenColorPalette.default(theme('colors')) }
  )
})

const squarePlugin = plugin(({ matchComponents, theme }) => {
  matchComponents(
    {
      square: value => ({
        width: value,
        height: value,
      }),
    },
    { values: theme('spacing') }
  )
})

const outlineAutoPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.outline-auto': {
      outlineStyle: 'auto',
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-lazy': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-lazy': 'fade-in-lazy 0.8s ease-in-out',
      },
      colors: {
        'bg-primary': '#202326',
        'bg-secondary': '#D9D9D9',
        'text-primary': '#ffffff',
        'text-secondary': '#6C7176',
        'ui-primary': 'rgba(255, 255, 255, 0.50)',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [skeletonPlugin, squarePlugin, outlineAutoPlugin],
}
