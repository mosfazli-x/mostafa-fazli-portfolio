<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const lines = [
  { text: "Mostafa Fazli", color: 'text-brand', behind: true },
  { text: 'Software Engineer', color: 'text-white fx-crt', behind: false },
] as const

let index = 0
const rendered = lines.map(line => ({
  ...line,
  letters: [...line.text].map(char => ({ char, delay: index++ * 28 })),
}))

const heroCharacter = ref<HTMLElement | null>(null)
const characterStyle = ref({ '--pointer-x': '0px', '--pointer-y': '0px' })
const isDragging = ref(false)
const isReady = ref(false)

let animationFrame: number | undefined
let entranceTimer: number | undefined
let positionX = 0
let positionY = 0
let velocityX = 0
let velocityY = 0
let pointerStartX = 0
let pointerStartY = 0
let positionStartX = 0
let positionStartY = 0
let activePointerId: number | undefined

const writeCharacterPosition = () => {
  characterStyle.value = {
    '--pointer-x': `${positionX.toFixed(2)}px`,
    '--pointer-y': `${positionY.toFixed(2)}px`,
  }
}

const stopAnimation = () => {
  if (animationFrame !== undefined) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = undefined
  }
}

const springBack = () => {
  const stiffness = 0.12
  const damping = 0.78
  const frame = () => {
    velocityX = (velocityX + (0 - positionX) * stiffness) * damping
    velocityY = (velocityY + (0 - positionY) * stiffness) * damping
    positionX += velocityX
    positionY += velocityY
    writeCharacterPosition()

    if (Math.abs(positionX) + Math.abs(positionY) + Math.abs(velocityX) + Math.abs(velocityY) > 0.08) {
      animationFrame = window.requestAnimationFrame(frame)
    } else {
      positionX = 0
      positionY = 0
      velocityX = 0
      velocityY = 0
      writeCharacterPosition()
      animationFrame = undefined
    }
  }

  stopAnimation()
  animationFrame = window.requestAnimationFrame(frame)
}

const handlePointerDown = (event: PointerEvent) => {
  const element = heroCharacter.value
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  stopAnimation()
  activePointerId = event.pointerId
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  positionStartX = positionX
  positionStartY = positionY
  velocityX = 0
  velocityY = 0
  isDragging.value = true
  element.setPointerCapture(event.pointerId)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return

  positionX = Math.max(-96, Math.min(96, positionStartX + event.clientX - pointerStartX))
  positionY = Math.max(-64, Math.min(64, positionStartY + event.clientY - pointerStartY))
  writeCharacterPosition()
}

const releasePointer = (event: PointerEvent) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return

  const element = heroCharacter.value
  if (element?.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
  activePointerId = undefined
  isDragging.value = false
  springBack()
}

onMounted(() => {
  const element = heroCharacter.value
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isReady.value = true
    return
  }

  entranceTimer = window.setTimeout(() => {
    isReady.value = true
  }, 1200)

  element.addEventListener('pointerdown', handlePointerDown)
  element.addEventListener('pointermove', handlePointerMove)
  element.addEventListener('pointerup', releasePointer)
  element.addEventListener('pointercancel', releasePointer)
})

onUnmounted(() => {
  const element = heroCharacter.value
  element?.removeEventListener('pointerdown', handlePointerDown)
  element?.removeEventListener('pointermove', handlePointerMove)
  element?.removeEventListener('pointerup', releasePointer)
  element?.removeEventListener('pointercancel', releasePointer)
  if (entranceTimer !== undefined) window.clearTimeout(entranceTimer)
  stopAnimation()
})
</script>

<template>
  <section id="top"
    class="hero relative flex h-[800px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#021826_0%,#000000_100%)]">
    <div class="hero-copy flex w-full max-w-[1200px] flex-col items-center gap-16 px-5">
      <h1 v-for="(line, i) in rendered" :key="i" class="hero-title font-display" :class="[
        line.color,
        line.behind ? 'relative z-[1]' : 'relative z-[2] opacity-80',
      ]">
        <span v-for="(letter, j) in line.letters" :key="j" class="hero-letter"
          :style="{ animationDelay: `${letter.delay}ms` }">{{ letter.char === ' ' ? '\u00A0' : letter.char }}</span>
      </h1>
    </div>

    <div ref="heroCharacter" class="hero-character pointer-events-auto absolute left-1/2 top-0 z-[1] h-[1038px] w-[692px]"
      :class="{ 'is-dragging': isDragging, 'is-ready': isReady }" :style="characterStyle" aria-label="Portrait of Mostafa Fazli">
      <img src="/mostafa_fazli.png" alt="Portrait of Mostafa Fazli"
        class="hero-image h-full w-full select-none object-cover object-center" draggable="false" />
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: 7.5rem;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-align: center;
  white-space: nowrap;
}

.hero-letter {
  display: inline-block;
  opacity: 0;
  animation: hero-letter-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-character {
  --pointer-x: 0px;
  --pointer-y: 0px;
  aspect-ratio: 2 / 3;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transform: translateX(-50%) translate3d(var(--pointer-x), var(--pointer-y), 0);
  transition: transform 120ms ease-out;
  animation: hero-character-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
  will-change: transform;
}

.hero-character.is-dragging {
  cursor: grabbing;
  transition: none;
}

.hero-character.is-ready {
  animation: none;
}

/* Dissolve the bottom edge into the dark background */
.hero-image {
  scale: 0.85;
  opacity: 95%;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 80%);
}

@keyframes hero-letter-in {
  from {
    opacity: 0;
    transform: translateY(0.35em);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes hero-character-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(24px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

/* Tablet — matches Mirova's 810–1200px breakpoint */
@media (max-width: 1199.98px) {
  .hero-title {
    font-size: 5.5rem;
  }
}

/* Mobile — character on top, type stacked below */
@media (max-width: 809.98px) {
  .hero {
    height: auto;
    min-height: 100svh;
    align-items: flex-end;
    padding-bottom: 48px;
  }

  .hero-copy {
    gap: clamp(0.5rem, 2vw, 1.5rem);
    padding-inline: 12px;
  }

  .hero-title {
    font-size: clamp(1.375rem, 6.6vw, 2.5rem);
    line-height: 1.1;
    white-space: nowrap;
  }

  /* Let the portrait keep its tall proportions, centered with breathing room
     above instead of being cropped flush against the viewport top */
  .hero-character {
    top: clamp(1rem, 4vw, 2.5rem);
    left: 50%;
    width: min(84vw, 420px);
    height: auto;
    aspect-ratio: 2008 / 2856;
    transform: translateX(-50%) translate3d(var(--pointer-x), var(--pointer-y), 0);
    animation-name: hero-character-in-mobile;
  }

  .hero-image {
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%);
  }

  @keyframes hero-character-in-mobile {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(24px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }
}

@media (prefers-reduced-motion: reduce) {

  .hero-letter,
  .hero-character {
    animation: none;
    transition: none;
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) and (min-width: 810px) {

  .hero-character {
    transform: translateX(-50%);
    transition: none;
  }
}
</style>
