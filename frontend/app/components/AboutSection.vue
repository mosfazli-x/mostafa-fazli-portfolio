<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const leadParagraph =
  'I\u2019m a software engineer with a full-stack foundation \u2014 comfortable moving from the database schema and API design to the last pixel of a polished interface.'

const bodyParagraphs = [
  'Over the past few years I\u2019ve built production web platforms, integrated AI into real products, and shipped systems designed to stay fast and maintainable as they grow.',
  'Today I focus on full-stack engineering, AI-powered automation, and digital learning tools \u2014 work that turns complex problems into simple, reliable experiences.',
]

const focusAreas = [
  'Full-Stack Architecture',
  'AI-Powered Automation',
  'Digital Learning Tools',
  'Scalable Web Systems',
] as const

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience', index: '01' },
  { value: 20, suffix: '+', label: 'Projects Shipped', index: '02' },
  { value: 28, suffix: '', label: 'Technologies', index: '03' },
] as const

const counts = ref<number[]>(stats.map(() => 0))
const rotatingRoles = [
  'Full-stack Developer',
  'Software Engineer',
  'Computer Engineer',
  'AI Builder',
] as const
const activeRole = ref(rotatingRoles[0])

const root = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const isShown = ref(false)

let observer: IntersectionObserver | undefined
let frame = 0
let roleInterval: ReturnType<typeof setInterval> | undefined
let roleIndex = 0

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function runCountUp() {
  if (prefersReducedMotion()) {
    counts.value = stats.map(stat => stat.value)
    return
  }

  cancelAnimationFrame(frame)

  const duration = 1400
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    counts.value = stats.map(stat => Math.round(stat.value * eased))

    if (progress < 1) frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
}

function startRoleRotation() {
  if (prefersReducedMotion() || roleInterval || rotatingRoles.length <= 1) return

  roleInterval = window.setInterval(() => {
    roleIndex = (roleIndex + 1) % rotatingRoles.length
    activeRole.value = rotatingRoles[roleIndex]
  }, 2600)
}

// =========================================
// 3D Tilt & Spotlight Mouse Handlers
// =========================================
function handleCardMove(e: MouseEvent, maxTilt = 7) {
  if (prefersReducedMotion()) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // محاسبه زاویه چرخش بر اساس موقعیت ماوس نسبت به مرکز کارت
  const rotateX = ((y - centerY) / centerY) * -maxTilt
  const rotateY = ((x - centerX) / centerX) * maxTilt

  el.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
  el.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
  el.style.setProperty('--mx', `${((x / rect.width) * 100).toFixed(1)}%`)
  el.style.setProperty('--my', `${((y / rect.height) * 100).toFixed(1)}%`)
  el.style.setProperty('--glare-opacity', '1')
}

function handleCardLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
  el.style.setProperty('--glare-opacity', '0')
}

onMounted(() => {
  const el = root.value
  if (!el) return

  if (prefersReducedMotion()) {
    isShown.value = true
    counts.value = stats.map(stat => stat.value)
    return
  }

  const rect = el.getBoundingClientRect()
  const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0

  if (alreadyInView) {
    isShown.value = true
    runCountUp()
    startRoleRotation()
    return
  }

  isHidden.value = true

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isHidden.value = false
          isShown.value = true
          runCountUp()
          startRoleRotation()
          observer?.disconnect()
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -15% 0px' },
  )

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
  if (roleInterval) window.clearInterval(roleInterval)
})
</script>

<template>
  <section
    id="about"
    ref="root"
    class="about"
    :class="[isHidden ? 'pre-reveal' : '', isShown ? 'is-visible' : '']"
    aria-labelledby="about-title"
  >
    <span class="about-glow" aria-hidden="true" />

    <div class="container content">
      <!-- Section Header -->
      <header class="head reveal" style="--delay: 0ms">
        <div class="head-top">
          <span class="badge" aria-label="Section 01: About">
            About
          </span>
        </div>

        <div class="head-main">
          <h2 id="about-title" class="title">
            Engineer, builder, problem solver
          </h2>
        </div>
      </header>

      <!-- Bento Layout -->
      <div class="bento">
        <!-- Left Column: Portrait (3D Card) -->
        <figure class="portrait reveal" style="--delay: 120ms">
          <div
            class="portrait-frame"
            @mousemove="e => handleCardMove(e, 6)"
            @mouseleave="handleCardLeave"
          >
            <span class="card-glare" aria-hidden="true" />

            <img
              src="/mostafa_fazli_about.png"
              alt="Portrait of Mostafa Fazli"
              width="900"
              height="1280"
              loading="lazy"
              decoding="async"
            >

            <figcaption class="portrait-caption">
              <div class="portrait-meta">
                <span class="portrait-name">Mostafa Fazli</span>
                <span class="portrait-role">Software Engineer</span>
              </div>
              <span class="portrait-badge" aria-label="Current professional role">
                <Transition name="role" mode="out-in">
                  <span :key="activeRole">{{ activeRole }}</span>
                </Transition>
              </span>
            </figcaption>
          </div>
        </figure>

        <!-- Right Column: Story + Stats -->
        <div class="right-col">
          <!-- Story Wrapper (Handles Reveal Animation) -->
          <div class="story-wrapper reveal" style="--delay: 220ms">
            <!-- Story 3D Card -->
            <article
              class="story"
              @mousemove="e => handleCardMove(e, 5)"
              @mouseleave="handleCardLeave"
            >
              <span class="card-topline" aria-hidden="true" />
              <span class="story-grid-bg" aria-hidden="true" />
              <span class="card-glare" aria-hidden="true" />

              <!-- Modern Editorial Header -->
              <div class="story-header">
                <div class="story-tag">
                  <span class="story-tag-icon" aria-hidden="true">✦</span>
                  <span>Engineering Narrative</span>
                </div>
                <div class="story-status">
                  <span class="status-pulse" aria-hidden="true" />
                  <span>Building &amp; Shipping</span>
                </div>
              </div>

              <!-- Highlighted Lead Section -->
              <div class="story-lead-box">
                <span class="quote-watermark" aria-hidden="true">&ldquo;</span>
                <p class="story-lead">{{ leadParagraph }}</p>
              </div>

              <!-- Body Content -->
              <div class="story-body">
                <p v-for="(paragraph, idx) in bodyParagraphs" :key="idx">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Interactive Focus Areas -->
              <div class="focus-wrap" aria-label="Core focus areas">
                <div class="focus-header">
                  <span class="focus-label">Core Architecture &amp; Focus</span>
                  <span class="focus-divider" aria-hidden="true" />
                </div>
                <ul class="focus-list">
                  <li v-for="tag in focusAreas" :key="tag" class="focus-pill">
                    <span class="pill-glow-dot" aria-hidden="true" />
                    <span>{{ tag }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <!-- Stats Row -->
          <dl class="stats reveal" style="--delay: 320ms" aria-label="Career highlights">
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              class="stat-card tilt-card"
              @mousemove="e => handleCardMove(e, 10)"
              @mouseleave="handleCardLeave"
            >
              <span class="card-glare" aria-hidden="true" />

              <div class="stat-top">
                <span class="stat-index" aria-hidden="true">{{ stat.index }}</span>
                <span class="stat-dot" aria-hidden="true" />
              </div>

              <dd class="stat-value">
                <span class="stat-number">{{ counts[i] }}</span>
                <span v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</span>
              </dd>

              <dt class="stat-label">{{ stat.label }}</dt>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  width: 100%;
  padding: 104px 30px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.about-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(48% 42% at 84% 8%, rgba(38, 129, 208, 0.16) 0%, transparent 72%),
    radial-gradient(38% 38% at 4% 68%, rgba(38, 129, 208, 0.08) 0%, transparent 72%);
}

.container {
  position: relative;
  z-index: 1;
  margin-inline: auto;
  width: 100%;
  max-width: 1200px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

/* =========================================
   Section Heading
   ========================================= */

.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  line-height: 1.2;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  color: var(--token-efbfb639-0154-426f-bea7-37f6ba33b7bb, rgb(38, 129, 208));
}

.head-main {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 32px;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-family: 'Boldonse', system-ui, sans-serif;
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #fff;
  text-wrap: balance;
}

.role-enter-active,
.role-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.role-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.role-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.role-enter-to,
.role-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* =========================================
   Bento Layout & 3D Tilt System
   ========================================= */

.bento {
  display: grid;
  grid-template-columns: minmax(320px, 0.78fr) minmax(0, 1.42fr);
  gap: 24px;
  align-items: stretch;
  perspective: 1400px;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

/* کلاس پایه برای تمامی کارت‌های سه‌بعدی */
.tilt-card {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  --glare-opacity: 0;

  transform: perspective(1100px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);
  transform-style: preserve-3d;
  will-change: transform;
  transition:
    transform 450ms cubic-bezier(0.03, 0.98, 0.52, 0.99),
    border-color 350ms ease,
    box-shadow 350ms ease;
}

.tilt-card:hover {
  /* در زمان حرکت ماوس، زمان انتقال کوتاه می‌شود تا کارت سریع و نرم به ماوس واکنش نشان دهد */
  transition:
    transform 120ms ease-out,
    border-color 300ms ease,
    box-shadow 300ms ease;
}

/* هاله نوری دنبال‌کننده نشانگر ماوس */
.card-glare {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    420px circle at var(--mx) var(--my),
    rgba(133, 203, 255, 0.16),
    rgba(38, 129, 208, 0.05) 40%,
    transparent 70%
  );
  opacity: var(--glare-opacity);
  transition: opacity 350ms ease;
  mix-blend-mode: screen;
}

/* =========================================
   Portrait Card (3D)
   ========================================= */

.portrait {
  position: relative;
  margin: 0;
  min-width: 0;
  display: flex;
  perspective: 1200px;
}

.portrait::before {
  content: '';
  position: absolute;
  inset: 12% -4% -6% 12%;
  z-index: -1;
  border-radius: 40px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(38, 129, 208, 0.28), transparent 72%);
  filter: blur(38px);
  opacity: 0.7;
  pointer-events: none;
}

.portrait-frame {
  position: relative;
  width: 100%;
  min-height: 520px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);

  background:
    radial-gradient(100% 75% at 50% 0%, rgba(48, 137, 215, 0.2) 0%, rgba(35, 91, 151, 0.08) 42%, transparent 75%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.075) 0%, rgba(255, 255, 255, 0.025) 38%, rgba(7, 12, 23, 0.58) 100%);

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.08) inset,
    0 20px 50px rgba(0, 0, 0, 0.32),
    0 2px 8px rgba(0, 0, 0, 0.08);
}

.portrait-frame:hover {
  border-color: rgba(133, 203, 255, 0.32);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.15) inset,
    0 28px 60px rgba(0, 0, 0, 0.48),
    0 0 32px rgba(38, 129, 208, 0.18);
}

.portrait-frame img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  object-fit: cover;
  object-position: center 16%;

  filter: saturate(0.95) contrast(1.03);
  transform: scale(1.01) translateZ(0);
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.portrait-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 28px;
  pointer-events: none;
  background:
    linear-gradient(180deg, transparent 48%, rgba(3, 10, 20, 0.32) 72%, rgba(3, 10, 20, 0.88) 100%),
    linear-gradient(135deg, rgba(133, 203, 255, 0.14), transparent 45%);
}

/* Floating Glass Caption - با فاصله عمقی در محور Z */
.portrait-caption {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 4;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(7, 14, 26, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.14);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.38);

  transform: translateZ(32px);
  transition: transform 350ms ease, border-color 350ms ease;
}

.portrait-frame:hover .portrait-caption {
  border-color: rgba(133, 203, 255, 0.28);
}

.portrait-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.portrait-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: #f4f8ff;
}

.portrait-role {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(206, 226, 245, 0.65);
}

.portrait-badge {
  display: inline-flex;
  min-width: 132px;
  min-height: 24px;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  color: rgba(206, 226, 245, 0.78);
  font-family: 'Boldonse', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.35;
  text-align: right;
  white-space: nowrap;
}

.portrait-badge .role-enter-active,
.portrait-badge .role-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* =========================================
   Story Panel (Redesigned & 3D)
   ========================================= */

.story-wrapper {
  flex: 1;
  display: flex;
  perspective: 1200px;
}

.story {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  padding: 36px 40px;
  border-radius: 28px;

  background:
    radial-gradient(110% 90% at 15% 0%, rgba(48, 137, 215, 0.18) 0%, rgba(35, 91, 151, 0.06) 45%, transparent 75%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 42%, rgba(6, 11, 22, 0.72) 100%);

  border: 1px solid rgba(255, 255, 255, 0.11);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  backdrop-filter: blur(24px) saturate(145%);

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.08) inset,
    0 18px 42px rgba(0, 0, 0, 0.24);
}

.story:hover {
  border-color: rgba(133, 203, 255, 0.3);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.14) inset,
    0 24px 54px rgba(0, 0, 0, 0.38),
    0 0 36px rgba(38, 129, 208, 0.12);
}

/* پس‌زمینه نقطه‌ای مدرن */
.story-grid-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background-image: radial-gradient(rgba(133, 203, 255, 0.14) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse 80% 70% at 85% 15%, #000 10%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 85% 15%, #000 10%, transparent 75%);
  opacity: 0.55;
  transition: opacity 400ms ease;
}

.story:hover .story-grid-bg {
  opacity: 0.9;
}

.card-topline {
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    rgba(133, 203, 255, 0.75),
    rgba(255, 255, 255, 0.25),
    transparent
  );
  opacity: 0.75;
}

/* هدر بالای کارت داستان */
.story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  transform: translateZ(18px);
}

.story-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(88, 167, 232, 0.1);
  border: 1px solid rgba(88, 167, 232, 0.22);

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9cd4ff;
}

.story-tag-icon {
  color: #58a7e8;
  font-size: 12px;
}

.story-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  color: rgba(206, 226, 245, 0.6);
}

.status-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.7);
  animation: pulseGlow 2.4s infinite ease-in-out;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.45;
  }
}

/* باکس متن اصلی (Lead) با افکت عمق بیشتر */
.story-lead-box {
  position: relative;
  padding: 18px 22px 18px 24px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transform: translateZ(26px);
  overflow: hidden;
}

.story-lead-box::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 14px;
  width: 3.5px;
  border-radius: 4px;
  background: linear-gradient(180deg, #9cd4ff 0%, #2681d0 100%);
  box-shadow: 0 0 14px rgba(88, 167, 232, 0.65);
}

.quote-watermark {
  position: absolute;
  right: 16px;
  top: -14px;
  font-family: Georgia, serif;
  font-size: 84px;
  line-height: 1;
  color: rgba(133, 203, 255, 0.06);
  pointer-events: none;
  user-select: none;
}

.story-lead {
  position: relative;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1.06rem, 1.35vw, 1.2rem);
  font-weight: 500;
  line-height: 1.68;
  letter-spacing: -0.012em;
  background: linear-gradient(180deg, #ffffff 0%, #d8ecff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* پاراگراف‌های توضیحات */
.story-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  transform: translateZ(18px);
}

.story-body p {
  position: relative;
  margin: 0;
  padding-left: 16px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15.2px;
  line-height: 1.78;
  color: rgba(226, 234, 245, 0.76);
}

.story-body p::before {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(88, 167, 232, 0.5);
}

/* Focus Pills */
.focus-wrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 16px;
  transform: translateZ(24px);
}

.focus-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.focus-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(180, 212, 242, 0.65);
  white-space: nowrap;
}

.focus-divider {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(133, 203, 255, 0.2), transparent);
}

.focus-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.focus-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  color: rgba(238, 243, 250, 0.9);
  transition:
    border-color 250ms ease,
    background-color 250ms ease,
    transform 250ms ease,
    box-shadow 250ms ease;
}

.pill-glow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #58a7e8;
  box-shadow: 0 0 6px rgba(88, 167, 232, 0.8);
  transition: transform 250ms ease, background-color 250ms ease;
}

/* =========================================
   Stats Bento Row (3D Cards)
   ========================================= */

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  perspective: 1000px;
}

.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  padding: 22px 24px;
  border-radius: 24px;

  background:
    radial-gradient(120% 100% at 100% 0%, rgba(88, 167, 232, 0.14) 0%, transparent 65%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.055) 0%, rgba(7, 12, 23, 0.6) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.07) inset,
    0 12px 28px rgba(0, 0, 0, 0.18);
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  transform: translateZ(16px);
}

.stat-index {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: rgba(133, 203, 255, 0.55);
}

.stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(88, 167, 232, 0.45);
  box-shadow: 0 0 10px rgba(88, 167, 232, 0.5);
  transition: background-color 300ms ease, transform 300ms ease;
}

.stat-value {
  display: inline-flex;
  align-items: flex-start;
  gap: 3px;
  margin: 0;
  font-family: 'Boldonse', system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  transform: translateZ(28px);
}

.stat-number {
  display: inline-block;
  padding-block: 0.15em;
  margin-block: -0.1em;

  font-size: clamp(2.1rem, 3.2vw, 2.75rem);
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.02em;

  background: linear-gradient(180deg, #ffffff 15%, #cbe7ff 65%, #68b5f5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 4px 16px rgba(38, 129, 208, 0.24));
}

.stat-suffix {
  display: inline-block;
  padding-block: 0.1em;
  margin-top: 0.08em;

  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 700;
  line-height: 1;
  color: #58a7e8;
  text-shadow: 0 0 14px rgba(88, 167, 232, 0.65);
}

.stat-label {
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(233, 236, 243, 0.62);
  transform: translateZ(16px);
}

/* =========================================
   Reveal Animation (Staggered Entrance)
   ========================================= */

.reveal {
  transition:
    opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 750ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.pre-reveal .reveal {
  opacity: 0;
  transform: translateY(28px) scale(0.98);
  filter: blur(6px);
}

.is-visible .reveal {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

/* =========================================
   Hover + Responsive
   ========================================= */

@media (hover: hover) and (pointer: fine) {
  .portrait-frame:hover img {
    transform: scale(1.035) translateZ(0);
  }

  .stat-card:hover {
    border-color: rgba(88, 167, 232, 0.38);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.14) inset,
      0 22px 42px rgba(0, 0, 0, 0.34),
      0 0 28px rgba(38, 129, 208, 0.16);
  }

  .stat-card:hover .stat-dot {
    background: #58a7e8;
    transform: scale(1.3);
  }

  .focus-pill:hover {
    border-color: rgba(88, 167, 232, 0.45);
    background: rgba(88, 167, 232, 0.14);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(38, 129, 208, 0.18);
  }

  .focus-pill:hover .pill-glow-dot {
    transform: scale(1.3);
    background: #85cbff;
  }
}

@media (max-width: 1023.98px) {
  .about {
    padding: 80px 24px;
  }

  .bento {
    grid-template-columns: minmax(0, 1fr);
  }

  .portrait {
    width: min(100%, 460px);
    margin-inline: auto;
  }

  .portrait-frame {
    min-height: 0;
    aspect-ratio: 4 / 5;
  }
}

@media (max-width: 639.98px) {
  .about {
    padding: 64px 16px;
  }

  .content {
    gap: 40px;
  }

  .title {
    font-size: clamp(1.8rem, 7.5vw, 2.35rem);
    text-wrap: balance;
  }

  .story {
    padding: 26px 22px;
    border-radius: 24px;
  }

  .story-lead-box {
    padding: 14px 16px 14px 18px;
  }

  .story-lead {
    font-size: 15.5px;
  }

  .story-body p {
    font-size: 14.5px;
  }

  .portrait-caption {
    left: 12px;
    right: 12px;
    bottom: 12px;
    padding: 12px 14px;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
  }

  .stat-top {
    display: none;
  }

  .stat-label {
    order: 1;
    padding-top: 0;
    border-top: none;
  }

  .stat-value {
    margin: 0;
    order: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .tilt-card,
  .portrait-frame img,
  .stat-card,
   .focus-pill,
   .status-pulse,
   .role-enter-active,
   .role-leave-active {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .pre-reveal .reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>