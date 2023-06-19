// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import type { ThemeDefinition } from 'vuetify'

const LightTheme: ThemeDefinition = {
  dark: false,
  variables: {
    'high-emphasis-opacity': 1,
  },
  colors: {
    background: '#f2f5f8',
    surface: '#ffffff',
    primary: '#344767',
    secondary: '#334155',
    accent: '#705CF6',
    error: '#ef476f',
    info: '#2196F3',
    success: '#06d6a0',
    'on-success': '#ffffff',
    warning: '#ffd166',
  },
}

const DarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#111b27',
    surface: '#1E293B',
    primary: '#705CF6',
    secondary: '#598EF3',
    accent: '#705CF6',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
}

export const vuetify = createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
  ssr: true,
  theme: {
    themes: {
      // light: {
      //   background: 'transparent', // 将背景设置为透明
      // },
      light: LightTheme,
      dark: DarkTheme,
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
