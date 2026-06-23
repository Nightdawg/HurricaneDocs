import { defineConfig } from 'vitepress'

// Site configuration for the Hurricane documentation.
// Most day-to-day editing happens in the Markdown files under docs/.
// Edit this file to change navigation, the sidebar, or site-wide settings.
export default defineConfig({
  title: 'Hurricane',
  description:
    'Documentation for Hurricane - a custom client for the game Haven & Hearth.',
  lang: 'en-US',

  // GitHub Pages project site is served from /HurricaneDocs/.
  // If you ever move to a custom domain at the root, change this to '/'.
  base: '/HurricaneDocs/',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  // Pages excluded from the build entirely (not rendered, not in search).
  // The example feature page is kept in the repo as a rendered reference but
  // hidden from the published site. Remove it from this list to publish it.
  srcExclude: ['features/example-feature.md'],

  // Raw <head> tags. Because these are not processed by VitePress, the base
  // path must be included manually for local asset URLs.
  head: [
    ['link', { rel: 'icon', href: '/HurricaneDocs/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#2b9bd6' }],
  ],

  themeConfig: {
    logo: '/logo.png',

    // Top navigation bar.
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/guide/installation' },
      { text: 'Features', link: '/features/' },
      { text: 'Changelog', link: '/changelog/' },
      {
        text: 'Links',
        items: [
          { text: 'Discord', link: 'https://discord.gg/7Ct4t6uME6' },
          {
            text: 'Steam Workshop',
            link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3423755273',
          },
          {
            text: 'Forum Thread',
            link: 'https://www.havenandhearth.com/forum/viewtopic.php?t=76544',
          },
          { text: 'Hurricane on GitHub', link: 'https://github.com/Nightdawg/Hurricane' },
        ],
      },
    ],

    // Sidebars are keyed by URL path prefix.
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Launching the Client', link: '/guide/launching' },
            { text: 'Troubleshooting & FAQ', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/features/': [
        {
          text: 'Features',
          items: [
            { text: 'Overview', link: '/features/' },
          ],
        },
        {
          text: 'Reference',
          items: [{ text: 'Feature Page Template', link: '/features/template' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nightdawg/Hurricane' },
      { icon: 'discord', link: 'https://discord.gg/7Ct4t6uME6' },
    ],

    // Built-in, free, offline full-text search.
    search: {
      provider: 'local',
    },

    footer: {
      message: 'Hurricane - a custom client for Haven & Hearth. Not affiliated with Seatribe.',
    },
  },
})
