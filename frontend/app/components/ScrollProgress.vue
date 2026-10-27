<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let frame: number | undefined

const updateProgress = () => {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = documentHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / documentHeight) * 100)) : 0
  frame = undefined
}

const scheduleUpdate = () => {
  if (frame === undefined) frame = window.requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (frame !== undefined) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <span class="scroll-progress__track" />
    <span
      class="scroll-progress__bar"
      :style="{ transform: `scaleX(${progress / 100})` }"
    />
    <span class="scroll-progress__glow" :style="{ left: `${progress}%` }" />
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  height: 3px;
  pointer-events: none;
  isolation: isolate;
}

.scroll-progress__track,
.scroll-progress__bar,
.scroll-progress__glow {
  position: absolute;
  inset: 0;
}

.scroll-progress__track {
  background: rgba(255, 255, 255, 0.08);
}

.scroll-progress__bar {
  transform-origin: left center;
  background: linear-gradient(90deg, #2681d0 0%, #54a9f4 52%, #a8d8ff 100%);
  box-shadow: 0 0 10px rgba(84, 169, 244, 0.6);
  will-change: transform;
}

.scroll-progress__glow {
  inset: auto auto auto -3px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #d9efff;
  box-shadow: 0 0 12px 3px rgba(84, 169, 244, 0.85);
  transform: translateY(-2px);
  will-change: left;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress__bar,
  .scroll-progress__glow {
    transition: none;
  }
}
</style>
