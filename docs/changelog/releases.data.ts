import { defineLoader } from 'vitepress'
import MarkdownIt from 'markdown-it'

// Build-time data loader: fetches the Hurricane releases from GitHub and turns
// each release's notes (Markdown) into rendered HTML. This runs when the docs
// site is built (and once in dev), so the Changelog page is static and fast.
//
// The page therefore updates whenever the site is rebuilt. To make it rebuild
// automatically the moment a new release is published, see the note at the
// bottom of .github/workflows/deploy.yml.

const REPO = 'Nightdawg/Hurricane'

export interface ReleaseEntry {
  tag: string
  name: string
  url: string
  publishedAt: string
  publishedDisplay: string
  prerelease: boolean
  bodyHtml: string
}

export interface ChangelogData {
  releases: ReleaseEntry[]
  generatedAt: string
  error: boolean
}

// Release notes come from your own repo, so rendering them is safe. html:false
// still blocks any raw HTML in the notes as an extra precaution.
const md = new MarkdownIt({ html: false, linkify: true, breaks: false })

function formatDate(iso: string): string {
  try {
    // Pin to UTC so the date is identical no matter where the build runs
    // (local machine vs the UTC GitHub Actions runner). GitHub stores release
    // timestamps in UTC, so this matches the live site deterministically.
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    return iso
  }
}

declare const data: ChangelogData
export { data }

export default defineLoader({
  async load(): Promise<ChangelogData> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'HurricaneDocs-build',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    // In GitHub Actions a token is provided automatically (1000 req/hr). Locally,
    // anonymous requests (60 req/hr) are plenty for occasional builds.
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
    if (token) headers.Authorization = `Bearer ${token}`

    try {
      const all: any[] = []
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`,
          { headers },
        )
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
        const batch = (await res.json()) as any[]
        if (!Array.isArray(batch) || batch.length === 0) break
        all.push(...batch)
        if (batch.length < 100) break
      }

      const releases: ReleaseEntry[] = all
        .filter((r) => !r.draft)
        .sort(
          (a, b) =>
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
        )
        .map((r) => ({
          tag: r.tag_name,
          name: r.name || r.tag_name,
          url: r.html_url,
          publishedAt: r.published_at,
          publishedDisplay: formatDate(r.published_at),
          prerelease: !!r.prerelease,
          bodyHtml: r.body ? md.render(r.body) : '',
        }))

      return { releases, generatedAt: new Date().toISOString(), error: false }
    } catch (e) {
      // Don't fail the whole build if GitHub is unreachable; the page falls back
      // to a friendly message + link to the releases page.
      console.warn(`[changelog] Could not fetch releases: ${(e as Error).message}`)
      return { releases: [], generatedAt: new Date().toISOString(), error: true }
    }
  },
})
