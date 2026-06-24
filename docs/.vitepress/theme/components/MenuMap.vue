<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

/**
 * Clickable screenshot map.
 *
 * Overlays invisible link "hotspots" on top of a menu screenshot so the buttons
 * in the image become clickable and navigate to each panel's page. Each region
 * is defined in PERCENTAGES of the image so it stays aligned at any size.
 *
 * Hovering (desktop) or tapping (mobile) a region highlights the button and
 * shows a small label tooltip; clicking follows its link.
 *
 * Usage (see the Options Menu Overview page for a full example):
 *   <MenuMap
 *     :src="optionsMenu"
 *     :regions="[
 *       { label: 'Video settings', link: '/features/video-settings',
 *         x: 8.8, y: 18.5, w: 85.5, h: 10.1 },
 *     ]"
 *     ratio="468 / 476"
 *   />
 *
 * x, y = top-left corner of the region (in % of the image).
 * w, h = width and height of the region (in % of the image).
 */
interface Region {
  label: string
  link: string
  x: number
  y: number
  w: number
  h: number
}

const props = withDefaults(
  defineProps<{
    src: string
    regions: Region[]
    alt?: string
    /** Image aspect ratio as "width / height" (keeps the stage from collapsing). */
    ratio?: string
    /** Optional cap on the rendered width. */
    maxWidth?: string
  }>(),
  {
    alt: 'Clickable menu screenshot',
    ratio: '16 / 9',
    maxWidth: '100%',
  },
)

// A Vite import (recommended) yields an already-resolved, base-aware URL that
// must be used as-is. Bare relative paths get withBase; hash/in-page anchors and
// external/absolute URLs are passed through unchanged.
const isResolved = (url: string) =>
  /^(https?:|data:|blob:|#|\/)/.test(url)
const resolvedSrc = computed(() =>
  isResolved(props.src) ? props.src : withBase(props.src),
)

// Internal site links (e.g. "/features/foo") need the base path; hash links and
// external URLs are used as-is.
function href(link: string) {
  if (link.startsWith('#') || /^https?:/.test(link)) return link
  return withBase(link)
}

function regionStyle(r: Region) {
  return {
    left: `${r.x}%`,
    top: `${r.y}%`,
    width: `${r.w}%`,
    height: `${r.h}%`,
  }
}
</script>

<template>
  <figure class="mm">
    <div
      class="mm__stage"
      :style="{ '--mm-ratio': ratio, maxWidth }"
    >
      <img class="mm__img" :src="resolvedSrc" :alt="alt" />

      <a
        v-for="(r, i) in regions"
        :key="i"
        class="mm__region"
        :href="href(r.link)"
        :style="regionStyle(r)"
        :aria-label="r.label"
      >
        <span class="mm__tip">{{ r.label }}</span>
      </a>
    </div>

    <figcaption class="mm__hint">
      Hover or tap a button to highlight it, then click to open that panel's page.
    </figcaption>
  </figure>
</template>

<style scoped>
.mm {
  margin: 24px 0;
}

.mm__stage {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: var(--mm-ratio, 16 / 9);
  line-height: 0;
}

.mm__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Invisible clickable button overlay. */
.mm__region {
  position: absolute;
  display: block;
  border-radius: 7px;
  outline: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, outline-color 0.15s ease,
    box-shadow 0.15s ease;
}

.mm__region:hover,
.mm__region:focus-visible {
  outline-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  box-shadow: 0 0 14px 2px var(--vp-c-brand-soft);
}

/* Small label tooltip, always positioned above the button, hidden until the
   region is hovered/focused. */
.mm__tip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%) translateY(4px);
  z-index: 3;
  padding: 4px 9px;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.mm__region:hover .mm__tip,
.mm__region:focus-visible .mm__tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.mm__hint {
  margin-top: 10px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.4;
}
</style>
