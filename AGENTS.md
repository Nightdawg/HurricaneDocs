# AGENTS.md - Hurricane Docs project memory & AI instructions

> This file is read **automatically** by AI coding assistants (GitHub Copilot CLI and
> others) at the start of every session. It is the single source of truth for how this
> project works, the owner's preferences, decisions made, and what's left to do.
>
> **AI: keep this file up to date.** Whenever you add/change a feature page, change a
> convention, or make a notable decision, update the relevant section here in the same
> session (see "Maintenance protocol" at the bottom).

---

## 1. What this project is

- **HurricaneDocs** is the documentation **website** for **Hurricane**, a custom client
  for the game *Haven & Hearth*.
- The Hurricane client itself lives in a **separate** repo:
  [Nightdawg/Hurricane](https://github.com/Nightdawg/Hurricane). This repo
  (`HurricaneDocs`) contains **only the docs site**, not the client source.
- Goal: explain each Hurricane feature in detail, with screenshots, GIFs, and short MP4
  clips. The owner edits content/layout themselves over time.
- Owner / GitHub user: **Nightdawg**.

### Useful links
- Live site: https://nightdawg.github.io/HurricaneDocs/ (DEPLOYED and working)
- Discord: https://discord.gg/7Ct4t6uME6
- Forum thread: https://www.havenandhearth.com/forum/viewtopic.php?t=76544
- Steam Workshop: https://steamcommunity.com/sharedfiles/filedetails/?id=3423755273
- Hurricane Updater: https://github.com/Nightdawg/Hurricane-Updater/releases/latest

---

## 2. Tech stack & commands

- **Generator:** [VitePress](https://vitepress.dev/) (Vue/Vite based). Free, MIT.
- **Hosting:** GitHub Pages (project site). Base path is `/HurricaneDocs/`.
- **Node:** v24 locally; CI uses Node 20.
- **Markdown rendering for the changelog:** `markdown-it` (dev dependency).

Commands (run from repo root):

```bash
npm install            # install deps (first time)
npm run docs:dev       # live-reload dev server (http://localhost:5173/HurricaneDocs/)
npm run docs:build     # production build into docs/.vitepress/dist
npm run docs:preview   # preview the production build (http://localhost:4173/HurricaneDocs/)
```

**Always run `npm run docs:build` after making changes to verify the site still builds.**

---

## 3. Repository map

```
HurricaneDocs/
├─ AGENTS.md                         # ← this file (AI memory/instructions)
├─ README.md                         # human owner handbook
├─ package.json                      # npm scripts + deps
├─ .github/workflows/deploy.yml      # auto build+deploy to Pages on push to master
│                                    #   (also has the FUTURE changelog-trigger note)
└─ docs/
   ├─ index.md                       # Home / landing (hero + feature grid)
   ├─ guide/                         # Getting Started: installation, launching, troubleshooting
   ├─ features/
   │  ├─ index.md                    # features overview (link new pages here)
   │  ├─ template.md                 # COPY THIS to create a new feature page
   │  ├─ example-feature.md          # worked example (image + GIF + MP4)
   │  └─ images/                     # screenshots & GIFs for feature pages
   ├─ changelog/
   │  ├─ index.md                    # renders the auto-generated changelog
   │  └─ releases.data.ts            # build-time loader: fetches GitHub Releases
   ├─ public/                        # static assets served at site root
   │  ├─ logo.png, favicon.png
   │  └─ media/                      # .mp4 clips go here
   └─ .vitepress/
      ├─ config.mts                  # nav, sidebar, base path, search, footer
      └─ theme/
         ├─ index.ts                 # registers custom components
         ├─ custom.css               # accent colors / branding
         └─ components/
            ├─ Video.vue             # <Video src="media/x.mp4" /> embed
            └─ Changelog.vue         # renders the releases timeline
```

---

## 4. Conventions & owner preferences (IMPORTANT - follow these)

- **NO long dashes.** Never use em dashes (`—`) or en dashes (`–`). Always use a plain
  hyphen `-`. The owner dislikes long dashes. This applies to all content, config, and
  comments.
- **NO local/machine-specific info.** Never put absolute local paths (e.g.
  `C:\Users\<name>\...`), usernames, machine names, tokens, or any personal/private data
  into committed files (AGENTS.md, README, docs, config, comments). Use repo-relative paths
  or GitHub URLs instead. Keep machine-specific context out of the repo entirely.
- **Adding a feature page:**
  1. Copy `docs/features/template.md` to `docs/features/<feature-name>.md`.
  2. Write the content.
  3. Put screenshots/GIFs in `docs/features/images/` and reference with **relative** paths
     (`![alt](./images/foo.png)`).
  4. Put `.mp4` clips in `docs/public/media/` and embed with `<Video src="media/foo.mp4" />`.
  5. Add the page to **both** `docs/features/index.md` (the list) and the `sidebar` in
     `docs/.vitepress/config.mts`.
  6. Update section 7 (Feature documentation status) of this file.
- **Media size:** keep it small. Prefer MP4 over GIF (smaller). Use GIFs/videos only where
  genuinely relevant. For large/long videos, host externally (YouTube/Streamable) and embed
  a link instead - GitHub Pages has a 1 GB site limit and 100 MB per-file limit.
- **Do NOT use Git LFS for media** - GitHub Pages does not serve LFS files (images break).
- **Branding:** accent color is a "storm blue". Change colors in `custom.css`. Logo/favicon
  are in `docs/public/`.
- **Footer:** message only, no "made with love" style copyright line (owner removed it).
- **Screenshots / game assets:** in-game *Haven & Hearth* art (screenshots/GIFs/videos) is
  the property of the game's developers (Seatribe - Jorb and Loftar), all rights reserved,
  used with permission for documentation. The owner confirmed this verbally with the dev.
  There is a "Credits & assets" note in the README; keep it accurate if asset usage changes.
- **Base path:** if the repo is ever renamed or moved to a custom domain, update `base` in
  `config.mts` (e.g. `/NewName/`, or `/` for a root/custom domain) and the favicon href in
  `head`.

---

## 5. Architecture decisions (log)

- **VitePress** chosen over MkDocs Material / Docusaurus: modern look, Markdown-first,
  good layout control via small Vue components, owner is vibe-coding.
- **GitHub Pages project site** at `/HurricaneDocs/` (not a custom domain, for now).
- **Branch is `master`** (not `main`); the deploy workflow targets `master`.
- **Changelog is auto-generated** from the Hurricane repo's GitHub Releases at build time
  (see `docs/changelog/releases.data.ts`). It renders all releases newest-first. Falls back
  gracefully if the GitHub API is unreachable during a build.
  - It is a **live mirror, not an append-only log**: every rebuild fetches the *current*
    list of releases and regenerates the whole page. If a release is edited or deleted on
    GitHub, the next rebuild reflects that. GitHub Releases are the single source of truth.
- **Instant changelog updates on release are LIVE.** The Hurricane repo has a
  `.github/workflows/notify-docs.yml` (commit `b1a69fdd8`) that, on `release: published`,
  POSTs a `repository_dispatch` (`new-release`) to HurricaneDocs using the
  `DOCS_DISPATCH_TOKEN` secret. The docs `deploy.yml` listens for that event and
  rebuilds + redeploys. So publishing a Hurricane release now auto-refreshes the changelog.
- **Custom components:** `Video.vue` (MP4 embeds, base-path safe) and `Changelog.vue`
  (releases timeline). Registered in `docs/.vitepress/theme/index.ts`.

---

## 6. Site map / content status

| Page | Path | Status |
| --- | --- | --- |
| Home / landing | `docs/index.md` | Done (hero + feature grid; copy can evolve) |
| Installation | `docs/guide/installation.md` | Done |
| Launching the Client | `docs/guide/launching.md` | Done |
| Troubleshooting & FAQ | `docs/guide/troubleshooting.md` | Done |
| Features overview | `docs/features/index.md` | Placeholder list |
| Example feature | `docs/features/example-feature.md` | Example/demo (delete once real pages exist) |
| Feature template | `docs/features/template.md` | Reference (keep) |
| Changelog | `docs/changelog/index.md` | Done (auto-generated) |

---

## 7. Feature documentation status (living checklist)

Track which Hurricane features have dedicated doc pages. Update as pages are added.
(Seeded from things visible in the Hurricane repo; owner will refine.)

| Feature / category | Doc page | Status |
| --- | --- | --- |
| Alarm sounds (animals, combat, priority targets) | _none yet_ | Not documented |
| Map icon presets / custom minimap markers | _none yet_ | Not documented |
| Private web-map server integration | _none yet_ | Not documented |
| Cookbook / food-book integration | _none yet_ | Not documented |
| Combat helpers (hitboxes, priority targets) | _none yet_ | Not documented |
| Quality-of-life tweaks | _none yet_ | Not documented |
| Interface / HUD customization | _none yet_ | Not documented |

> Add rows as new features ship in Hurricane. When a page is created, link it here and set
> Status to "Documented".

---

## 8. Roadmap / wishlist

What the owner wants to do with the site. **Owner: add your goals here** (or tell the AI to
add them). Examples to replace:

- [ ] Document the first batch of "headline" features with screenshots.
- [ ] Decide whether to delete the example-feature page once real pages exist.
- [ ] Consider a "What's new" highlight on the home page.

---

## 9. Open / future tasks

- **Instant changelog updates on release** (DONE): the `DOCS_DISPATCH_TOKEN` secret +
  `notify-docs.yml` workflow are set up in the **Hurricane** repo, and the docs `deploy.yml`
  listens for the `repository_dispatch` event (`new-release`). Publishing a Hurricane
  release now triggers a docs rebuild automatically. (Original copy-paste instructions
  remain in the bottom comment of `.github/workflows/deploy.yml` for reference.)
- **First deploy** (DONE): repo created, `master` pushed, GitHub -> Settings -> Pages ->
  Source set to "GitHub Actions". Site is live at https://nightdawg.github.io/HurricaneDocs/.
  Note: the very first workflow run failed because it ran on the push *before* Pages was
  enabled; re-running the workflow after enabling Pages fixed it.

---

## 10. Maintenance protocol for the AI

When working in this repo, at the end of any change that affects the project:

1. **Update this file** - specifically section 6 (content status), section 7 (feature
   checklist), section 5 (decisions) and/or section 8 (roadmap) as appropriate.
2. **Honor the conventions** in section 4 (especially: hyphens, never long dashes).
3. **Verify the build**: run `npm run docs:build` and confirm it succeeds.
4. Keep edits surgical and Markdown-first; prefer small reusable Vue components for layout.
5. **Committing:** the owner has asked the AI to commit changes as part of doing the work
   (you no longer need to ask first), but **do NOT push** - the owner pushes manually. Use
   clear messages (e.g. `docs: add <feature> page`), keep one logical change per commit
   where practical, and include the
   `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>` trailer. Leave the
   commit(s) on `master` for the owner to review and push. Still update this file in the
   same commit/session.

> Note: there is no automatic process that updates this file on every git commit. It is kept
> current by the AI (and the owner) as part of doing the work. If the owner ever wants
> hard automation, a git pre-commit hook or a CI check could remind us to update it - but
> that is intentionally not set up yet.
