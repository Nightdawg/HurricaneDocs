<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

/**
 * Interactive screenshot with hover/tap hotspots.
 *
 * Each region is defined in PERCENTAGES of the image (so it stays aligned at any
 * size). Hovering (desktop) or tapping (mobile) a numbered marker highlights that
 * region, dims the rest, "pops" the region out a little, and shows a callout with
 * the label + description.
 *
 * Usage (see the Login Screen page for a full example):
 *   <Hotspots
 *     src="features/images/login-screen.png"
 *     :regions="[
 *       { n: 1, label: 'Saved accounts', desc: 'Click an account to log in.',
 *         x: 1.5, y: 1.5, w: 19, h: 11 },
 *     ]"
 *   />
 *
 * x, y = top-left corner of the region (in % of the image).
 * w, h = width and height of the region (in % of the image).
 *
 * Optional per-region `place` forces which side the callout appears on:
 *   'top' | 'bottom' | 'left' | 'right'. If omitted, it's chosen automatically
 *   based on the region's position so it stays on-screen.
 */
interface Region {
  n: number | string
  label: string
  desc?: string
  x: number
  y: number
  w: number
  h: number
  place?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(
  defineProps<{
    src: string
    regions: Region[]
    alt?: string
    /** Image aspect ratio as "width / height" (keeps the stage from collapsing). */
    ratio?: string
    /** Pop-out zoom factor for the active region. */
    zoom?: number
  }>(),
  {
    alt: 'Interactive screenshot',
    ratio: '16 / 9',
    zoom: 1.2,
  },
)

// ----------------------------------------------------------------------------
// DEBUG TOGGLE: set to true to outline + tint every hotspot region on ALL
// Hotspots across the whole site. Handy when positioning/sizing regions.
// Leave false for the normal (invisible until hover) look.
// ----------------------------------------------------------------------------
const DEBUG_REGIONS = false

// A Vite import (recommended) yields an already-resolved, base-aware URL that
// must be used as-is. Only apply withBase to bare relative paths.
const isResolved = (url: string) => /^(https?:|data:|blob:|\/)/.test(url)
const resolvedSrc = computed(() =>
  isResolved(props.src) ? props.src : withBase(props.src),
)

const active = ref<number | null>(null)
const show = (i: number) => (active.value = i)
const hide = () => (active.value = null)
const toggle = (i: number) => (active.value = active.value === i ? null : i)

// Base position/size for a region's hit area + marker.
// transform-origin is set from the region's center position within the image so
// that the zoom grows toward the image center (edge regions don't spill outward).
function regionStyle(r: Region) {
  const cx = r.x + r.w / 2
  const cy = r.y + r.h / 2
  return {
    left: `${r.x}%`,
    top: `${r.y}%`,
    width: `${r.w}%`,
    height: `${r.h}%`,
    transformOrigin: `${cx}% ${cy}%`,
  }
}

// When a region is active, paint the matching crop of the image into the box so
// it can be scaled up for the "pop-out" effect. Uses background-position math so
// the crop lines up exactly with the region before it scales.
function cropStyle(r: Region) {
  const posX = r.w >= 100 ? 0 : (r.x / (100 - r.w)) * 100
  const posY = r.h >= 100 ? 0 : (r.y / (100 - r.h)) * 100
  return {
    backgroundImage: `url(${resolvedSrc.value})`,
    backgroundSize: `${(100 / r.w) * 100}% ${(100 / r.h) * 100}%`,
    backgroundPosition: `${posX}% ${posY}%`,
  }
}

// Decide where the callout sits. If `place` is set on the region it is forced to
// that side; otherwise the side is chosen automatically from the region's
// position so the callout stays on-screen. The callout is offset by the region's
// zoom expansion so it never overlaps the enlarged (popped-out) region.
function calloutStyle(r: Region) {
  const cx = r.x + r.w / 2
  const cy = r.y + r.h / 2
  const gap = 2
  const expandX = ((props.zoom - 1) / 2) * r.w
  const expandY = ((props.zoom - 1) / 2) * r.h
  const style: Record<string, string> = {}

  const place = r.place ?? (cy < 50 ? 'bottom' : 'top')

  if (place === 'top' || place === 'bottom') {
    // Horizontal anchoring follows the region's horizontal position.
    if (cx < 33) {
      style.left = `${r.x}%`
    } else if (cx > 67) {
      style.right = `${100 - (r.x + r.w)}%`
    } else {
      style.left = `${cx}%`
      style.transform = 'translateX(-50%)'
    }
    if (place === 'bottom') {
      style.top = `${r.y + r.h + expandY + gap}%`
    } else {
      style.bottom = `${100 - r.y + expandY + gap}%`
    }
  } else {
    // Left / right placement: vertically centered on the region.
    style.top = `${cy}%`
    style.transform = 'translateY(-50%)'
    if (place === 'right') {
      style.left = `${r.x + r.w + expandX + gap}%`
    } else {
      style.right = `${100 - r.x + expandX + gap}%`
    }
  }

  return style
}
</script>

<template>
  <figure class="hs" :class="{ 'hs--debug': DEBUG_REGIONS }">
    <div class="hs__stage" :class="{ 'is-active': active !== null }" :style="{ '--hs-ratio': ratio, '--hs-zoom': zoom }">
      <img class="hs__img" :src="resolvedSrc" :alt="alt" />

      <div class="hs__dim" aria-hidden="true" />

      <button
        v-for="(r, i) in regions"
        :key="i"
        type="button"
        class="hs__region"
        :class="{ 'is-on': active === i }"
        :style="active === i ? { ...regionStyle(r), ...cropStyle(r) } : regionStyle(r)"
        :aria-label="`${r.n}. ${r.label}`"
        @mouseenter="show(i)"
        @mouseleave="hide"
        @focus="show(i)"
        @blur="hide"
        @click="toggle(i)"
      >
        <span class="hs__marker">{{ r.n }}</span>
      </button>

      <div
        v-for="(r, i) in regions"
        v-show="active === i"
        :key="`c-${i}`"
        class="hs__callout"
        :style="calloutStyle(r)"
        role="status"
      >
        <span class="hs__callout-title">
          <span class="hs__callout-num">{{ r.n }}</span>{{ r.label }}
        </span>
        <span v-if="r.desc" class="hs__callout-desc">{{ r.desc }}</span>
      </div>
    </div>

    <figcaption class="hs__hint">
      Hover or tap the numbered markers to learn what each part of the screen does.
    </figcaption>
  </figure>
</template>

<style scoped>
.hs {
  margin: 24px 0;
}

.hs__stage {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hs-ratio, 16 / 9);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  line-height: 0;
}

.hs__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dim layer that fades in while a region is active. */
.hs__dim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  transition: opacity 0.18s ease;
  pointer-events: none;
  z-index: 1;
}
.hs__stage.is-active .hs__dim {
  opacity: 1;
}

/* Each hotspot hit area. */
.hs__region {
  position: absolute;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 2;
  border-radius: 8px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, outline-color 0.18s ease;
  outline: 2px solid transparent;
  outline-offset: 0;
}

/* Debug mode (pass `debug` to <Hotspots>): outline + tint every region so you
   can see and fine-tune their positions and sizes. Off by default. */
.hs--debug .hs__region:not(.is-on) {
  outline: 2px solid var(--vp-c-brand-1);
  background-color: rgba(43, 155, 214, 0.18);
}

.hs__region:focus-visible {
  outline-color: var(--vp-c-brand-1);
}

/* The active region: show the popped-out crop and lift it (no outline). */
.hs__region.is-on {
  z-index: 3;
  transform: scale(var(--hs-zoom, 1.2));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  border-radius: 6px;
}

/* Numbered marker badge in the corner of each region. */
.hs__marker {
  position: absolute;
  top: 4px;
  left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: var(--vp-c-brand-1);
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

.hs__region.is-on .hs__marker {
  /* Keep the marker a constant visual size while the region scales up. */
  transform: scale(calc(1 / var(--hs-zoom, 1.2)));
}

/* Floating explanation callout. */
.hs__callout {
  position: absolute;
  z-index: 4;
  max-width: min(320px, 80%);
  padding: 10px 12px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  line-height: 1.45;
  pointer-events: none;
}

.hs__callout-title {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.95rem;
}

.hs__callout-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  font-size: 12px;
  color: #fff;
  background: var(--vp-c-brand-1);
  border-radius: 999px;
  flex: none;
}

.hs__callout-desc {
  display: block;
  margin-top: 4px;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
}

.hs__hint {
  margin-top: 10px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.4;
}
</style>
