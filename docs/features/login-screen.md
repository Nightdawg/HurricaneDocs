---
title: Login Screen
aside: false
---

<script setup>
import loginScreen from './images/login-screen.jpg'

// Hotspot regions for the login screen screenshot.
// x, y = top-left corner of the region; w, h = width/height. All in % of the image.
// Tweak these numbers to move/resize the hover areas - no other code needed.
const regions = [
  {
    n: 1,
    label: 'Saved accounts list',
    desc: "Your saved logins. Click an account to log straight in with its saved password. Use the X to remove an account, and the arrows to reorder the list.",
    x: 1, y: 1, w: 19, h: 10.5,
  },
  {
    n: 2,
    label: 'Options',
    desc: "Opens the Options menu, where you can adjust the client's settings.",
    x: 0.5, y: 92, w: 9.5, h: 5.5,
  },
  {
    n: 3,
    label: 'Login fields',
    desc: "Enter your username and password, then press Log In. Tick Save Account to add it to your saved accounts list for one-click logins later.",
    x: 38, y: 42, w: 24, h: 44,
  },
  {
    n: 4,
    label: 'Server status',
    desc: "Shows whether the game server is online and how many hearthlings (players) are currently connected.",
    x: 41, y: 93.5, w: 18, h: 5.5,
  },
  {
    n: 5,
    label: 'Login through Steam',
    desc: "Logs you in with the account currently signed in to Steam. Only appears when you launch Hurricane through Steam - the normal login fields still work too, if you want to use a different account.",
    x: 67, y: 43, w: 22, h: 19,
  },
  {
    n: 6,
    label: 'Discord',
    desc: "Opens an invite to the Hurricane Discord server.",
    x: 94.5, y: 1.5, w: 5.5, h: 9.5,
  },
  {
    n: 7,
    label: 'Login screen style & music',
    desc: "Pick the login screen background style, or choose Random! for a different one each time you reach the login screen. The slider sets the login screen music volume.",
    x: 78, y: 89.5, w: 21, h: 9.5,
  },
]
</script>

# Login Screen

The login screen is the first thing you see when you launch Hurricane. From here you can
log in (manually or with a saved account), check the server status, tweak a few options,
and jump to the community Discord.

<Hotspots
  :src="loginScreen"
  :regions="regions"
  ratio="2134 / 1200"
  alt="The Hurricane login screen"
/>

## What's on the screen

1. **Saved accounts list** (top-left) - your saved logins. Click an account to log straight
   in with its saved password. Use the **X** to remove an account, and the **arrows** to
   reorder the list.
2. **Options** (bottom-left) - opens the Options menu for adjusting the client's settings.
3. **Login fields** (center) - enter your username and password, then press **Log In**. Tick
   **Save Account** to add it to your saved accounts list for one-click logins later.
4. **Server status** (bottom-center) - shows whether the game server is online and how many
   hearthlings (players) are currently connected.
5. **Login through Steam** (right) - logs you in with the account currently signed in to
   Steam. This only appears when you launch Hurricane through Steam. The normal login fields
   still work too, so you can use a different account if you like.
6. **Discord** (top-right) - opens an invite to the Hurricane Discord server.
7. **Login screen style & music** (bottom-right) - pick the login screen background style,
   or choose **Random!** for a different one each time you
   reach the login screen. The slider below sets the login screen music volume.
