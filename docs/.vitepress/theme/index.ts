import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Video from './components/Video.vue'
import Changelog from './components/Changelog.vue'
import Hotspots from './components/Hotspots.vue'
import MenuMap from './components/MenuMap.vue'
import './custom.css'

// Extends the default VitePress theme and registers custom components
// (like <Video>, <Changelog>, <Hotspots> and <MenuMap>) so they can be used
// directly inside any Markdown page.
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Video', Video)
    app.component('Changelog', Changelog)
    app.component('Hotspots', Hotspots)
    app.component('MenuMap', MenuMap)
  },
} satisfies Theme
