# Hurricane Documentation

The source for the **Hurricane** documentation website, built with
[VitePress](https://vitepress.dev/).

🌐 **Live site:** https://nightdawg.github.io/HurricaneDocs/

Hurricane is a custom client for [Haven & Hearth](https://www.havenandhearth.com/).
The client's own source code lives in a separate repo:
[Nightdawg/Hurricane](https://github.com/Nightdawg/Hurricane).

---

## Editing the site (the short version)

You mostly just edit **Markdown** files under `docs/`. To add a feature page:

1. Copy `docs/features/template.md` to `docs/features/my-feature.md`.
2. Write your content.
3. Add screenshots/GIFs to `docs/features/images/` and embed them with relative paths.
4. Add `.mp4` clips to `docs/public/media/` and embed them with `<Video src="media/clip.mp4" />`.
5. Add a link to your page in `docs/features/index.md` **and** in the sidebar inside
   `docs/.vitepress/config.mts`.
6. Commit and push to `master` - the site rebuilds and deploys automatically.

That's it. The sections below have the details.

---

## Running it locally

You need [Node.js](https://nodejs.org/) (v18+; this project was set up with v24).

```bash
# Install dependencies (first time only)
npm install

# Start the live-reload dev server (open the printed http://localhost:5173/HurricaneDocs/)
npm run docs:dev

# Build the production site into docs/.vitepress/dist
npm run docs:build

# Preview the production build locally
npm run docs:preview
```

While `npm run docs:dev` is running, every change you save to a Markdown or config file
shows up in the browser instantly.

---

## Project structure

```
HurricaneDocs/
├─ .github/workflows/deploy.yml   # Auto-build + deploy to GitHub Pages on push to master
├─ package.json                   # npm scripts (docs:dev / docs:build / docs:preview)
├─ docs/                          # ← everything you edit lives here
│  ├─ index.md                    # Home / landing page
│  ├─ guide/                      # Getting Started pages
│  │  ├─ installation.md
│  │  ├─ launching.md
│  │  └─ troubleshooting.md
│  ├─ features/                   # One page per feature
│  │  ├─ index.md                 # Features overview (link new pages here)
│  │  ├─ template.md              # COPY THIS to create a new feature page
│  │  ├─ example-feature.md       # Worked example showing image + GIF + MP4
│  │  └─ images/                  # Screenshots & GIFs for feature pages
│  ├─ changelog/index.md
│  ├─ public/                     # Static assets served at the site root
│  │  ├─ logo.png                 # Site logo (replace to re-brand)
│  │  ├─ favicon.png              # Browser tab icon
│  │  └─ media/                   # .mp4 video clips go here
│  └─ .vitepress/
│     ├─ config.mts               # Nav, sidebar, site title, search, etc.
│     └─ theme/
│        ├─ index.ts              # Registers custom components
│        ├─ custom.css            # Accent colors / branding
│        └─ components/Video.vue  # The <Video> embed component
```

---

## Adding images, GIFs, and videos

### Screenshots & GIFs (recommended: relative paths)

Put the file next to your page (e.g. in `docs/features/images/`) and reference it with a
**relative** path. VitePress handles the URL and base path automatically:

```md
![Alt text describing the image](./images/my-screenshot.png)
![Alt text describing the GIF](./images/my-clip.gif)
```

### MP4 videos (use the `<Video>` component)

Put `.mp4` files in `docs/public/media/`, then embed them:

```md
<Video src="media/my-clip.mp4" />

<!-- Looping, muted, auto-playing clip -->
<Video src="media/my-loop.mp4" autoplay loop muted />

<!-- With a poster image shown before playback -->
<Video src="media/my-clip.mp4" poster="media/my-poster.png" />
```

> Browsers only autoplay videos that are also `muted`.

**Keep media small.** GIFs and MP4s live in git and on GitHub Pages, so prefer short,
compressed clips (ideally a few MB or less). For very large videos, consider hosting them
elsewhere (e.g. YouTube/Streamable) and linking instead.

---

## Changelog (auto-generated)

The [Changelog page](https://nightdawg.github.io/HurricaneDocs/changelog/) is generated
**automatically** from the GitHub Releases of the Hurricane repo
([Nightdawg/Hurricane](https://github.com/Nightdawg/Hurricane/releases)) - you don't edit
it by hand. When the site builds, it fetches every release (newest first) and renders each
release's notes.

Under the hood:

- `docs/changelog/releases.data.ts` - a VitePress *build-time data loader* that calls the
  GitHub API and returns the releases.
- `docs/.vitepress/theme/components/Changelog.vue` - renders them as a timeline.
- `docs/changelog/index.md` - the page; it imports the data and drops in `<Changelog>`.

The page refreshes every time the site is rebuilt (i.e. whenever you push to `master`).
**To make it refresh the instant you publish a new Hurricane release**, follow the
one-time setup documented at the bottom of `.github/workflows/deploy.yml`.

## Navigation & sidebar

Edit `docs/.vitepress/config.mts`:

- `nav` - the top navigation bar.
- `sidebar` - the left sidebar, grouped by URL path (e.g. `/guide/`, `/features/`).

When you add a new page, add it to the appropriate `sidebar` group so people can find it.

## Branding / colors

- Replace `docs/public/logo.png` and `docs/public/favicon.png` with your own images.
- Change the accent colors in `docs/.vitepress/theme/custom.css`.

---

## Deployment & first-time GitHub setup

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`): every push to
`master` builds the site and publishes it to GitHub Pages.

**One-time setup (do this once):**

1. Create a GitHub repository named **`HurricaneDocs`** under your account.
2. Add it as the remote and push:
   ```bash
   git remote add origin https://github.com/Nightdawg/HurricaneDocs.git
   git push -u origin master
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment** and set
   **Source: GitHub Actions**.
4. Push any commit to `master` (or re-run the workflow from the **Actions** tab). When it
   finishes, your site is live at https://nightdawg.github.io/HurricaneDocs/.

> If you ever rename the repo or move to a custom domain, update `base` in
> `docs/.vitepress/config.mts` accordingly (`'/NewRepoName/'`, or `'/'` for a root domain).

---

## Credits & assets

Screenshots, GIFs, and videos of *Haven & Hearth* used in this documentation contain
in-game art and assets that are the property of the game's developers (Seatribe - Jorb and
Loftar), all rights reserved.They are used here with permission, solely to document the
Hurricane client. *Haven & Hearth* is © Seatribe; this is an unofficial fan project and is
not affiliated with or endorsed by Seatribe.

