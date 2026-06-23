---
title: Character Selection Screen
aside: false
---

<script setup>
import characterSelection from './images/character-selection.jpg'

// Hotspot regions for the character selection screenshot.
// x, y = top-left corner of the region; w, h = width/height. All in % of the image.
// Optional `place: 'top' | 'bottom' | 'left' | 'right'` forces which side the
// tooltip appears on (otherwise it's chosen automatically).
// Tweak these numbers to move/resize the hover areas - no other code needed.
const regions = [
  {
    n: 1,
    label: 'Character list',
    desc: "Your characters on this account, each showing the world it lives in. Click Play to enter that world with the chosen character.",
    x: 2, y: 17, w: 19, h: 31.5,
  },
  {
    n: 2,
    label: 'Log out',
    desc: "Logs you out and returns to the login screen.",
    x: 1.5, y: 93, w: 12, h: 6.5,
  },
  {
    n: 3,
    label: 'Subscription status',
    desc: "Shows your account's subscription status.",
    x: 53, y: 30, w: 11.8, h: 20, place: 'top',
  },
  {
    n: 4,
    label: 'Verified account',
    desc: "Shows your account's verification status.",
    x: 49, y: 49.5, w: 20, h: 31,
  },
  {
    n: 5,
    label: 'New character',
    desc: "Creates a new character.",
    x: 45, y: 85, w: 27.6, h: 12,
  },
  {
    n: 6,
    label: 'Character screen music',
    desc: "Sets the character screen music volume.",
    x: 77.5, y: 93.5, w: 22, h: 6,
  },
]
</script>

# Character Selection Screen

After you log in, you reach the character selection screen. From here you can pick a
character to play, create a new one, check your account status, or log back out.

<Hotspots
  :src="characterSelection"
  :regions="regions"
  ratio="2134 / 1200"
  alt="The Hurricane character selection screen"
/>

## What's on the screen

1. **Character list** (left) - your characters on this account, each showing the world it
   lives in. Click **Play** to enter that world with the chosen character.
2. **Log out** (bottom-left) - logs you out and returns to the login screen.
3. **Subscription status** (center) - the red and gold insignia shows your account's
   subscription status.
4. **Verified account** (center) - the scroll shows your account's verification status.
5. **New character** (center) - creates a new character.
6. **Character screen music** (bottom-right) - the slider sets the character screen music
   volume.
