---
# Feature Page Template
#
# HOW TO USE THIS TEMPLATE:
# 1. Copy this file to docs/features/your-feature-name.md
# 2. Edit the title and content below.
# 3. Put images/GIFs in docs/features/images/ and reference them with relative paths.
# 4. Put .mp4 clips in docs/public/media/ and embed them with the <Video> component.
# 5. Add a link to your new page in docs/features/index.md and in the sidebar
#    inside docs/.vitepress/config.mts.
---

# Feature Name

A one- or two-sentence summary of what this feature does and why it's useful.

## Overview

Explain the feature in a bit more detail here. What problem does it solve? When would
a player use it?

## Screenshots

Store images next to your page (for example in `docs/features/images/`) and reference
them with a **relative** path. The site handles the URL/base path for you automatically:

```md
![Describe the screenshot](./images/your-screenshot.png)
```

A GIF works exactly the same way (it's just an image):

```md
![Describe the GIF](./images/your-clip.gif)
```

## Video demo

For a short MP4 clip, put the file in `docs/public/media/` and use the `<Video>` component:

```md
<Video src="media/your-clip.mp4" />
```

Useful options:

```md
<!-- Looping, muted, auto-playing background-style clip -->
<Video src="media/your-loop.mp4" autoplay loop muted />

<!-- Show a poster image before the video plays -->
<Video src="media/your-clip.mp4" poster="media/your-poster.png" />
```

> Browsers only allow `autoplay` when the video is also `muted`.

## How to use it

Step-by-step instructions, if relevant:

1. Do this.
2. Then this.
3. Done!

## Settings

If the feature has options, document them here. A table works well:

| Setting | Default | Description |
| --- | --- | --- |
| Example option | Off | What this option does. |

## Tips & notes

- Add any caveats, tips, or related features here.

::: tip
You can use callouts like this (`tip`, `warning`, `danger`, `info`) to highlight things.
:::
