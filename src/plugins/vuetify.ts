// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
    theme: {
    themes: {
      light: {
        background: 'transparent', // 将背景设置为透明
      },
    },
  },
})
