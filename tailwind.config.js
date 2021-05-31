module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      inset: {
        '-68': '-17rem', //-left-68 (negative)
        '-72': '-18rem', //-left-76 (negative)
        '-76': '-19rem', //-left-76 (negative)
        '-80': '-20rem', //-left-80 (negative)
        '-84': '-21rem', //-left-84 (negative)
      },
      spacing: {
        '68': '17rem', // w-68
        '72': '18rem', // w-72
        '76': '19rem', // w-76
        '80': '20rem', // w-80
        '84': '21rem', // w-84
      },
      margin: {
        '68': '17rem', //ml-68
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        error: 'var(--color-error)',
        brand: 'var(--color-brand)',
        'surface-0': 'var(--color-surface-0)',
        'surface-01': 'var(--color-surface-01)',
        'surface-02': 'var(--color-surface-02)',
        'surface-24': 'var(--color-surface-24)',
        'high-on-surface-0': 'var(--color-high-on-surface-0)',
        'medium-on-surface-0': 'var(--color-medium-on-surface-0)',
        'disabled-on-surface-0': 'var(--color-disabled-on-surface-0)',
        'high-on-accent-0': 'var(--color-high-on-accent-0)',
      },
      opacity: {
        '10': '.1',
        '20': '.2',
        '30': '.3',
        '40': '.4',
        '50': '.5',
        '60': '.6',
        '70': '.7',
        '80': '.8',
        '90': '.9',
      },
    },
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
    plugins: [require('@tailwindcss/line-clamp'),]
};
