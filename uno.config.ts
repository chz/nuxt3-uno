import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const transformers: any = [
  transformerDirectives(),
]

export default defineConfig({
  // Uncomment when production
  // content: {
  //   pipeline: {
  //     include: !isDev ? ['pages/**/*.vue', 'components/**/*.vue'] : [],
  //     exclude: ['node_modules', '.git', '.nuxt', '.output'],
  //   },
  // },
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
