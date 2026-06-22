---
title: Changelog
---

<script setup>
import { data } from './releases.data.ts'
</script>

# Changelog

This page is generated automatically from the
[Hurricane releases on GitHub](https://github.com/Nightdawg/Hurricane/releases) -
each entry below corresponds to a published release, newest first. It refreshes every
time the site is rebuilt.

<Changelog :releases="data.releases" :error="data.error" />
