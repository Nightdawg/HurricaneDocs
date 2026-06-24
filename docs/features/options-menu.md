---
title: Options Menu Overview
aside: false
---

<script setup>
import { withBase } from 'vitepress'
import optionsMenu from './images/options-menu.png'
import advancedSettings from './images/advanced-settings.png'

// Clickable button regions for each screenshot. Coordinates are in % of the
// image (x, y = top-left corner; w, h = size). The same arrays drive both the
// clickable image overlay and the link list underneath it.
const mainButtons = [
  { label: 'Video settings', link: '/features/video-settings', x: 8.8, y: 18.5, w: 85.5, h: 10.1 },
  { label: 'Audio settings', link: '/features/audio-settings', x: 8.8, y: 30.7, w: 85.5, h: 10.1 },
  { label: 'Keybindings', link: '/features/keybindings', x: 8.8, y: 42.9, w: 85.5, h: 10.1 },
  { label: 'Advanced Settings', link: '#advanced-settings', x: 8.8, y: 63.4, w: 85.5, h: 10.1 },
]

const advancedButtons = [
  { label: 'Interface Settings', link: '/features/interface-settings', x: 4.5, y: 11.8, w: 44.1, h: 6.4 },
  { label: 'Display Settings', link: '/features/display-settings', x: 53.0, y: 11.8, w: 44.1, h: 6.4 },
  { label: 'Action Bars Settings', link: '/features/action-bars-settings', x: 4.5, y: 19.5, w: 44.1, h: 6.4 },
  { label: 'Camera Settings', link: '/features/camera-settings', x: 53.0, y: 19.5, w: 44.1, h: 6.4 },
  { label: 'Combat Settings', link: '/features/combat-settings', x: 4.5, y: 27.3, w: 44.1, h: 6.4 },
  { label: 'World Graphics Settings', link: '/features/world-graphics-settings', x: 53.0, y: 27.3, w: 44.1, h: 6.4 },
  { label: 'Quality Display Settings', link: '/features/quality-display-settings', x: 4.5, y: 35.0, w: 44.1, h: 6.4 },
  { label: 'Hiding Settings', link: '/features/hiding-settings', x: 53.0, y: 35.0, w: 44.1, h: 6.4 },
  { label: 'Chat Settings', link: '/features/chat-settings', x: 4.5, y: 42.8, w: 44.1, h: 6.4 },
  { label: 'Alarms & Sounds Settings', link: '/features/alarms-sounds-settings', x: 53.0, y: 42.8, w: 44.1, h: 6.4 },
  { label: 'Altered Gameplay Settings', link: '/features/altered-gameplay-settings', x: 4.5, y: 55.9, w: 44.1, h: 6.4 },
  { label: 'Gameplay Automation Settings', link: '/features/gameplay-automation-settings', x: 53.0, y: 55.9, w: 44.1, h: 6.4 },
  { label: 'Aggro Exclusion Settings', link: '/features/aggro-exclusion-settings', x: 4.5, y: 63.6, w: 44.1, h: 6.4 },
  { label: 'Auto-Loot Settings', link: '/features/auto-loot-settings', x: 53.0, y: 63.6, w: 44.1, h: 6.4 },
  { label: 'Server Integration Settings', link: '/features/server-integration-settings', x: 28.7, y: 76.7, w: 44.1, h: 6.4 },
]

function href(link) {
  if (link.startsWith('#') || /^https?:/.test(link)) return link
  return withBase(link)
}
</script>

# Options Menu Overview

Hurricane's settings live in the **Options menu**. Instead of cramming everything onto
a single crowded screen like the vanilla client, Hurricane splits its settings across
several dedicated **panels**, so you can fine-tune almost every part of the client to
your own liking without digging through one giant list.

You can open it from the [login screen](./login-screen) with the **Options** button, or
at any time while you're playing.

## The main menu

The top-level menu keeps the basics together and acts as a gateway to everything else.
**The screenshot below is interactive:** hover a button to highlight it, then click to open
that panel's page. Prefer text links? They're listed right underneath.

<MenuMap
  :src="optionsMenu"
  :regions="mainButtons"
  ratio="468 / 476"
  max-width="360px"
  alt="The Hurricane Options menu"
/>

<ul class="panel-list">
  <li v-for="b in mainButtons" :key="b.link"><a :href="href(b.link)">{{ b.label }}</a></li>
</ul>

**Video settings**, **Audio settings**, and **Keybindings** cover the familiar essentials,
while **Advanced Settings** is where Hurricane's many additions live (see below). **Close**
simply dismisses the menu.

## Finding your way around

Every panel reuses the same window, and the **title at the top changes to show which panel
you're currently viewing**. On the main menu it reads **"Options"**; open Advanced Settings
and it becomes **"Advanced Settings"**, and so on. It's an easy way to keep track of where
you are as you move between panels.

## Advanced Settings

**Advanced Settings** is the heart of Hurricane's customization. It organizes the client's
many extra options into clearly labelled categories, each opening its own panel. **This
screenshot is interactive too:** click any category to jump to its page, or use the list
below.

<MenuMap
  :src="advancedSettings"
  :regions="advancedButtons"
  ratio="908 / 748"
  max-width="680px"
  alt="The Hurricane Advanced Settings panel"
/>

<ul class="panel-list panel-list--cols">
  <li v-for="b in advancedButtons" :key="b.link"><a :href="href(b.link)">{{ b.label }}</a></li>
</ul>

The **Back** button returns you to the main Options menu. Each of these categories will get
its own detailed page over time.

::: tip
Not sure where a setting lives? The category names are intentionally descriptive, and the
window title always tells you which panel you're in.
:::

<style scoped>
.panel-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}
.panel-list--cols {
  columns: 2 220px;
  column-gap: 2rem;
}
.panel-list--cols li {
  break-inside: avoid;
}
</style>
