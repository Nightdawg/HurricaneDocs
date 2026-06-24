---
title: Options Menu Overview
aside: false
---

<script setup>
import optionsMenu from './images/options-menu.png'
import advancedSettings from './images/advanced-settings.png'
</script>

# Options Menu Overview

Hurricane's settings live in the **Options menu**. Instead of cramming everything onto
a single crowded screen like the vanilla client, Hurricane splits its settings across
several dedicated **panels**, so you can fine-tune almost every part of the client to
your own liking without digging through one giant list.

You can open it from the [login screen](./login-screen) with the **Options** button, or
at any time while you're playing.

## The main menu

The top-level menu keeps the basics together and acts as a gateway to everything else:

<figure style="margin: 1.5rem auto; text-align: center;">
  <img :src="optionsMenu" alt="The Hurricane Options menu" style="display:block; margin:0 auto; width:100%; max-width:360px; height:auto;" />
</figure>

- **Video settings**, **Audio settings**, and **Keybindings** cover the familiar essentials.
- **Advanced Settings** is where Hurricane's many additions live (see below).
- **Close** dismisses the menu.

## Finding your way around

Every panel reuses the same window, and the **title at the top changes to show which panel
you're currently viewing**. On the main menu it reads **"Options"**; open Advanced Settings
and it becomes **"Advanced Settings"**, and so on. It's an easy way to keep track of where
you are as you move between panels.

## Advanced Settings

**Advanced Settings** is the heart of Hurricane's customization. It organizes the client's
many extra options into clearly labelled categories, each opening its own panel:

<figure style="margin: 1.5rem auto; text-align: center;">
  <img :src="advancedSettings" alt="The Hurricane Advanced Settings panel" style="display:block; margin:0 auto; width:100%; max-width:680px; height:auto;" />
</figure>

From here you can reach settings for the interface, display, action bars, camera, combat,
world graphics, quality display, hiding, chat, alarms & sounds, altered gameplay, gameplay
automation, aggro exclusion, auto-loot, and server integration. The **Back** button returns
you to the main Options menu.

Each of these categories will get its own detailed page over time.

::: tip
Not sure where a setting lives? The category names are intentionally descriptive, and the
window title always tells you which panel you're in.
:::
