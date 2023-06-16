// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
export const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    themes: {
      light: {
        background: 'transparent', // 将背景设置为透明
      },
    },
  },
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
