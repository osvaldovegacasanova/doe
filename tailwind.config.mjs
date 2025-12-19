import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      typography: {
        tight: {
          css: {
            'ul, ol': { marginTop: '0.25em', marginBottom: '0.25em', paddingLeft: '1.25em' },
            'li':     { marginTop: '0.2em',  marginBottom: '0.2em'  },
          },
        },
      },
    },
  },
  plugins: [typography],
}
