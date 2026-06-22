<script setup lang="ts">
// Renders the list of releases produced by changelog/releases.data.ts.
interface ReleaseEntry {
  tag: string
  name: string
  url: string
  publishedDisplay: string
  prerelease: boolean
  bodyHtml: string
}

defineProps<{
  releases: ReleaseEntry[]
  error?: boolean
}>()

const releasesUrl = 'https://github.com/Nightdawg/Hurricane/releases'
</script>

<template>
  <div class="changelog">
    <p v-if="error" class="changelog-note">
      Couldn't load the releases right now. You can view the full history on the
      <a :href="releasesUrl" target="_blank" rel="noreferrer">releases page on GitHub</a>.
    </p>

    <p v-else-if="!releases || releases.length === 0" class="changelog-note">
      No releases found yet. See the
      <a :href="releasesUrl" target="_blank" rel="noreferrer">releases page on GitHub</a>.
    </p>

    <template v-else>
      <section
        v-for="rel in releases"
        :key="rel.tag"
        :id="rel.tag"
        class="changelog-entry"
      >
        <div class="changelog-entry__head">
          <div class="changelog-entry__version">
            <a :href="rel.url" target="_blank" rel="noreferrer">{{ rel.name }}</a>
            <span v-if="rel.prerelease" class="changelog-badge">pre-release</span>
          </div>
          <time class="changelog-entry__date">{{ rel.publishedDisplay }}</time>
        </div>
        <div class="changelog-entry__body" v-html="rel.bodyHtml" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.changelog {
  margin-top: 8px;
}

.changelog-note {
  color: var(--vp-c-text-2);
}

.changelog-entry {
  padding: 20px 0 8px;
  border-top: 1px solid var(--vp-c-divider);
  scroll-margin-top: 96px;
}

.changelog-entry:first-child {
  border-top: none;
  padding-top: 4px;
}

.changelog-entry__head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px 12px;
}

.changelog-entry__version {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}

.changelog-entry__version a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.changelog-entry__version a:hover {
  text-decoration: underline;
}

.changelog-badge {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 999px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
  vertical-align: middle;
}

.changelog-entry__date {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

/* The release notes are injected via v-html; tighten their spacing a little. */
.changelog-entry__body :deep(ul) {
  margin: 8px 0;
  padding-left: 1.25rem;
}

.changelog-entry__body :deep(li) {
  margin: 2px 0;
}

.changelog-entry__body :deep(p) {
  margin: 8px 0;
}

.changelog-entry__body :deep(a) {
  color: var(--vp-c-brand-1);
}
</style>
