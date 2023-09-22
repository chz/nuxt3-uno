import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const transformers: any = [
  transformerDirectives(),
]
const isDev: boolean = process.env.NODE_ENV === 'development'
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
      customizations: {
        transform(svg) {
          return svg.replace(/fill="[^"]*"/g, 'fill="currentColor"')
        },
      },
      extraProperties: {
        display: 'inline-flex',
      },
      collections: {
        custom: FileSystemIconLoader('./assets/svg'),
      },
    }),
  ],
})
