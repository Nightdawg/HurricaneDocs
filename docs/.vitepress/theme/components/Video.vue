<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

/**
 * Responsive video embed for short MP4 clips.
 *
 * Usage in Markdown:
 *   <Video src="media/my-feature.mp4" />
 *   <Video src="media/loop.mp4" autoplay loop muted />
 *   <Video src="media/demo.mp4" poster="media/demo-poster.png" />
 *
 * Store your .mp4 files under docs/public/media/ and reference them with a
 * path relative to that public folder (e.g. "media/my-feature.mp4").
 * The base path (/HurricaneDocs/) is applied automatically.
 *
 * Note: browsers only allow `autoplay` when the video is also `muted`.
 */
const props = withDefaults(
  defineProps<{
    src: string
    poster?: string
    controls?: boolean
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    maxWidth?: string
  }>(),
  {
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    maxWidth: '100%',
  },
)

const isExternal = (url: string) => /^https?:\/\//.test(url)

const resolvedSrc = computed(() =>
  isExternal(props.src) ? props.src : withBase(props.src),
)

const resolvedPoster = computed(() =>
  props.poster
    ? isExternal(props.poster)
      ? props.poster
      : withBase(props.poster)
    : undefined,
)
</script>

<template>
  <video
    class="hd-video"
    :style="{ maxWidth }"
    :src="resolvedSrc"
    :poster="resolvedPoster"
    :controls="controls"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    playsinline
  />
</template>

<style scoped>
.hd-video {
  display: block;
  width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
</style>
