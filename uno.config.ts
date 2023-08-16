const isDev: boolean = process.env.NODE_ENV === 'development'
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'

let transformers: any = [
  transformerDirectives()
]

if (!isDev) {
  transformers = [
    ...transformers,
    transformerCompileClass({
      classPrefix: '',
    }),
  ]
}

export default defineConfig({
  // Uncomment before production
  // content:{
  //   pipeline: {
  //     include: !isDev ? ['pages/**/*.vue', 'components/**/*.vue'] : [],
  //     exclude: ['node_modules','.git','.nuxt','.output']
  //   }
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
      `
    }
  ],
  transformers,
})
