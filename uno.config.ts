import process from 'node:process'
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { loadCustomIconSet } from './utilities'

const isDev: boolean = process.env.NODE_ENV === 'development'

const transformers: any = [
  transformerDirectives(),
]

export default defineConfig({
  content: {
    pipeline: {
      include: !isDev ? ['pages/**/*.vue', 'components/**/*.vue'] : [],
      exclude: ['node_modules', '.git', '.nuxt', '.output'],
    },
  },
  preflights: [
    {
      getCSS: () => `
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          appearance: none;
          outline:0;
        }
      `,
    },
  ],
  transformers,
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-flex',
      },
      collections: {
        custom: loadCustomIconSet(),
      },
    }),
  ],
})
