<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Experience = {
  period: string
  start: string
  company: string
  role: string
  summary: string
  stack: string[]
  current?: boolean
}

const experiences: Experience[] = [
  {
    period: '2024 — Present',
    start: '2024',
    company: 'Independent Practice',
    role: 'Full-Stack Engineer',
    summary: 'Production platforms, AI workflows, and learning tools — from schema to interface.',
    stack: ['Nuxt', 'Fastify', 'OpenAI'],
    current: true,
  },
  {
    period: '2022 — 2024',
    start: '2022',
    company: 'Product Studio',
    role: 'Full-Stack Developer',
    summary: 'Shipped customer products and internal dashboards with a small cross-functional team.',
    stack: ['Vue', 'PostgreSQL', 'Docker'],
  },
  {
    period: '2021 — 2022',
    start: '2021',
    company: 'Digital Agency',
    role: 'Front-End Developer',
    summary: 'Turned complex briefs into responsive, accessible interfaces with careful performance work.',
    stack: ['TypeScript', 'Tailwind', 'GSAP'],
  },
  {
    period: '2020 — 2021',
    start: '2020',
    company: 'EdTech Startup',
    role: 'Junior Web Developer',
    summary: 'Built early product features for a fast-moving learning platform and grew into ownership.',
    stack: ['JavaScript', 'Node.js', 'MongoDB'],
  },
]

// Demo testimonials from the reference template; replace with verified client feedback before publishing.
const testimonials = [
  {
    name: 'Ethan Wills',
    role: 'CEO, Boldframe Media',
    portrait: '/ethan-wills.png',
    quote: 'If you’re looking for someone who’s very passionate, detail-oriented, and easy to work with — Diaz is your guy. Can’t wait for the next collaboration!',
  },
  {
    name: 'Marcus Bennett',
    role: 'Creative Director, Northside Lab',
    portrait: '/marcus-bennett.png',
    quote: '“From first call to final delivery, Diaz made it very easy. Creative direction? Nailed. Communication? On point. Results? Stunning. Diaz was an absolute win.”',
  },
  {
    name: 'Adrian Keller',
    role: 'Founder, Studio Orion',
    portrait: '/adrian-keller.png',
    quote: '“Diaz didn’t just deliver — he elevated our entire vision! His input was thoughtful, his work flawless. His creativity and ability to bring ideas to life are unmatched.”',
  },
  {
    name: 'John Smith',
    role: 'Founder, Studio Orion',
    portrait: '/john-smith.png',
    quote: '“Working with Diaz was an absolute pleasure. His creative vision and attention to detail truly elevated our brand. Highly recommend his service to anyone looking for a talent!”',
  },
] as const

const activeTestimonial = ref(0)
const testimonial = computed(() => testimonials[activeTestimonial.value]!)

function changeTestimonial(direction: number) {
  activeTestimonial.value = (activeTestimonial.value + direction + testimonials.length) % testimonials.length
}

const root = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const isShown = ref(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isShown.value = true
    return
  }

  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    isShown.value = true
    return
  }

  isHidden.value = true

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isHidden.value = false
          isShown.value = true
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
  )

  observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="experience"
    ref="root"
    class="experience-section"
    :class="[isHidden ? 'pre-reveal' : '', isShown ? 'is-visible' : '']"
    aria-labelledby="experience-title"
  >
    <span class="section-glow" aria-hidden="true" />

    <h2 id="experience-title" class="sr-only">Experience and testimonials</h2>

    <div class="layout">
      <article class="card experience-card reveal" style="--delay: 40ms" aria-labelledby="experience-card-title">
        <span class="card-glow card-glow--green" aria-hidden="true" />

        <header class="experience-top">
          <h3 id="experience-card-title" class="eyebrow">
            <span class="eyebrow-dot" aria-hidden="true" />
            Experience
          </h3>
          <span class="tenure">04 roles &middot; 4+ years</span>
        </header>

        <ol class="timeline" aria-label="Career timeline">
          <li
            v-for="(job, i) in experiences"
            :key="job.role"
            class="timeline-item"
            :class="{ 'is-current': job.current }"
            :style="{ '--i': i }"
          >
            <span class="timeline-node" aria-hidden="true" />

            <div class="role-top">
              <p class="company">{{ job.company }}</p>
              <time class="period" :datetime="job.start">
                {{ job.period }}
              </time>
            </div>

            <h4 class="role">{{ job.role }}</h4>
            <p class="summary">{{ job.summary }}</p>

            <ul class="stack" :aria-label="`Technologies used at ${job.company}`">
              <li v-for="item in job.stack" :key="item" class="stack-item">{{ item }}</li>
            </ul>
          </li>
        </ol>
      </article>

      <article
        id="testimonials"
        class="card testimonial-card reveal"
        style="--delay: 140ms"
        aria-labelledby="testimonial-card-title"
        aria-roledescription="carousel"
      >
        <header class="testimonial-top">
          <h3 id="testimonial-card-title" class="eyebrow">
            <span class="eyebrow-dot" aria-hidden="true" />
            Testimonial
          </h3>
          <p class="satisfaction"><strong>95%</strong> Client satisfied</p>
        </header>

        <div class="testimonial-stage" aria-live="polite" aria-atomic="true">
          <Transition name="testimonial" mode="out-in">
            <figure
              :key="activeTestimonial"
              class="testimonial-slide"
              role="group"
              aria-roledescription="slide"
              :aria-label="`${activeTestimonial + 1} of ${testimonials.length}`"
            >
              <figcaption class="testimonial-person">
                <img
                  class="testimonial-portrait"
                  :src="testimonial.portrait"
                  :alt="testimonial.name"
                  width="166"
                  height="166"
                  loading="lazy"
                  decoding="async"
                >
                <p class="testimonial-name">{{ testimonial.name }}</p>
                <p class="testimonial-role">{{ testimonial.role }}</p>
              </figcaption>
              <div class="testimonial-feedback">
                <span class="testimonial-stars" role="img" aria-label="5 out of 5 stars">
                  <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" fill="currentColor" />
                  </svg>
                </span>
                <blockquote>{{ testimonial.quote }}</blockquote>
              </div>
            </figure>
          </Transition>
        </div>

        <div class="testimonial-controls" aria-label="Testimonial navigation">
          <button type="button" aria-label="Previous testimonial" @click="changeTestimonial(-1)">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
          </button>
          <button type="button" aria-label="Next testimonial" @click="changeTestimonial(1)">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  --accent: #00d084;
  --accent-rgb: 0, 208, 132;
  --surface: #151616;
  --surface-raised: #292929;
  --text: #f2f5f4;
  --muted: #8d9594;
  --hairline: rgba(255, 255, 255, 0.075);

  position: relative;
  width: 100%;
  padding: 96px 30px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  scroll-margin-top: 90px;
}

.section-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(42% 48% at 72% 42%, rgba(var(--accent-rgb), 0.055) 0%, transparent 72%),
    radial-gradient(36% 42% at 18% 18%, rgba(38, 129, 208, 0.09) 0%, transparent 74%);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.58fr) minmax(330px, 1fr);
  gap: 16px;
  align-items: stretch;
  width: 100%;
  max-width: 1094px;
  margin-inline: auto;
}

.card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1px solid var(--hairline);
  border-radius: 24px;
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0) 36%),
    var(--surface);
  box-shadow:
    0 30px 70px -42px rgba(0, 0, 0, 0.95),
    0 1px 0 rgba(255, 255, 255, 0.035) inset;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 26%);
}

.card-glow {
  position: absolute;
  z-index: -1;
  width: 340px;
  height: 340px;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(2px);
}

.card-glow--green {
  top: -190px;
  left: -100px;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.1) 0%, transparent 68%);
}

.experience-card {
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-height: 777px;
  padding: clamp(34px, 4.7vw, 56px) clamp(26px, 4.3vw, 48px) clamp(34px, 4.4vw, 52px);
}

.experience-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #eef1f0;
}

.eyebrow-dot {
  position: relative;
  width: 6px;
  height: 6px;
  flex: 0 0 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.65);
}

.eyebrow-dot::after {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.45);
  animation: experience-pulse 2.8s cubic-bezier(0.2, 0.7, 0.25, 1) infinite;
}

.tenure {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.04em;
  color: #6f7877;
  white-space: nowrap;
}

.timeline {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 25px;
  bottom: 25px;
  left: 5px;
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(var(--accent-rgb), 0.6) 0%,
    rgba(255, 255, 255, 0.1) 24%,
    rgba(255, 255, 255, 0.055) 100%
  );
}

.timeline-item {
  position: relative;
  padding: 12px 10px 12px 32px;
  border-radius: 14px;
  transition:
    background-color 300ms ease,
    transform 300ms cubic-bezier(0.2, 0.75, 0.25, 1);
}

.timeline-item + .timeline-item {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.timeline-node {
  position: absolute;
  top: 23px;
  left: 0;
  width: 11px;
  height: 11px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: #1c1e1e;
  box-shadow: 0 0 0 4px var(--surface);
}

.timeline-item.is-current .timeline-node {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow:
    0 0 0 4px var(--surface),
    0 0 0 5px rgba(var(--accent-rgb), 0.22),
    0 0 16px rgba(var(--accent-rgb), 0.4);
}

.role-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.company {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--muted);
}

.period {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 4px 13px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  background: var(--surface-raised);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: var(--accent);
  white-space: nowrap;
}

.role {
  margin: 5px 0 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 19px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: var(--text);
}

.summary {
  max-width: 470px;
  margin: 4px 0 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  line-height: 21px;
  color: #858d8c;
  text-wrap: pretty;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 9px 0 0;
  padding: 0;
  list-style: none;
}

.stack-item {
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.055);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.032);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 10.5px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.015em;
  color: #a8b0af;
}

.testimonial-card {
  --testimonial-muted: #a0a0a0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px 28px;
  background: #161616;
  font-family: 'Inter', system-ui, sans-serif;
  scroll-margin-top: 100px;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -220px;
  left: -40%;
  width: 180%;
  height: 450px;
  border-radius: 50%;
  background: #1c1c1c;
  pointer-events: none;
}

.testimonial-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px 12px;
}

.testimonial-top .eyebrow {
  gap: 10px;
  font-size: 0.6875rem;
  letter-spacing: 0;
}

.satisfaction {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 10px 12px;
  border: 1px solid #3a3a3a;
  border-radius: 100px;
  color: #c2c2c2;
  font-size: 0.6875rem;
  line-height: 1.5;
  white-space: nowrap;
}

.satisfaction strong {
  color: var(--text);
  font-weight: 700;
}

.testimonial-stage {
  flex: 1;
  display: grid;
  align-items: center;
  min-width: 0;
}

.testimonial-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  margin: 0;
  text-align: center;
}

.testimonial-person {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testimonial-portrait {
  display: block;
  width: 166px;
  height: 166px;
  border-radius: 50%;
  background: #3c3c3c;
  object-fit: cover;
}

.testimonial-name {
  margin: 24px 0 12px;
  color: var(--text);
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.testimonial-role {
  margin: 0;
  color: var(--testimonial-muted);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.testimonial-feedback {
  width: 100%;
}

.testimonial-stars {
  display: inline-flex;
  gap: 6px;
  color: #c0f329;
}

.testimonial-stars svg {
  width: 18px;
  height: 18px;
}

.testimonial-feedback blockquote {
  min-height: 180px;
  margin: 28px 0 0;
  color: #eee;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.035em;
  text-wrap: pretty;
}

.testimonial-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.testimonial-controls button {
  display: grid;
  width: 40px;
  height: 40px;
  padding: 8px;
  place-items: center;
  border: 1px solid #666;
  border-radius: 50%;
  background: transparent;
  color: #eee;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease;
}

.testimonial-controls button:hover {
  border-color: var(--accent);
  background: rgba(var(--accent-rgb), 0.1);
}

.testimonial-controls button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.testimonial-controls svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.testimonial-enter-active,
.testimonial-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.reveal {
  transition:
    opacity 800ms cubic-bezier(0.2, 0.75, 0.25, 1) var(--delay, 0ms),
    transform 800ms cubic-bezier(0.2, 0.75, 0.25, 1) var(--delay, 0ms);
}

.pre-reveal .reveal {
  opacity: 0;
  transform: translateY(28px);
}

.is-visible .reveal {
  opacity: 1;
  transform: translateY(0);
}

.pre-reveal .timeline-item {
  opacity: 0;
}

.is-visible .timeline-item {
  animation: timeline-in 600ms cubic-bezier(0.2, 0.75, 0.25, 1) calc(180ms + var(--i) * 70ms) backwards;
}

@keyframes timeline-in {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes experience-pulse {
  0% {
    opacity: 0.65;
    transform: scale(0.65);
  }

  55%,
  100% {
    opacity: 0;
    transform: scale(1.7);
  }
}

@media (hover: hover) and (pointer: fine) {
  .timeline-item:hover {
    background: rgba(255, 255, 255, 0.022);
  }
}

@media (max-width: 1023.98px) {
  .experience-section {
    padding: 80px 24px;
  }

  .layout {
    grid-template-columns: 1fr;
    max-width: 720px;
  }

  .experience-card {
    min-height: 0;
  }

  .testimonial-card {
    gap: 40px;
    padding: 64px 48px;
  }

  .testimonial-top .eyebrow,
  .satisfaction {
    font-size: 0.8125rem;
  }

  .testimonial-feedback blockquote {
    min-height: 108px;
    max-width: 460px;
    margin-inline: auto;
    font-size: 1.25rem;
  }
}

@media (max-width: 639.98px) {
  .experience-section {
    padding: 64px 16px;
  }

  .layout {
    gap: 12px;
  }

  .card {
    border-radius: 20px;
  }

  .experience-card {
    gap: 20px;
    padding: 30px 22px 34px;
  }

  .experience-top {
    align-items: flex-start;
  }

  .tenure {
    padding-top: 1px;
    font-size: 11px;
  }

  .timeline-item {
    padding: 12px 0 12px 28px;
  }

  .timeline::before {
    left: 4px;
  }

  .timeline-node {
    left: -1px;
  }

  .role-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }

  .period {
    order: -1;
    min-height: 26px;
    padding-inline: 11px;
    font-size: 11px;
  }

  .role {
    margin-top: 7px;
    font-size: 18px;
  }

  .summary {
    font-size: 12.5px;
    line-height: 20px;
  }

  .testimonial-card {
    gap: 32px;
    padding: 36px 22px;
  }

  .testimonial-top .eyebrow,
  .satisfaction {
    font-size: 0.6875rem;
  }

  .testimonial-slide {
    gap: 36px;
  }

  .testimonial-portrait {
    width: 140px;
    height: 140px;
  }

  .testimonial-name {
    font-size: 1.75rem;
  }

  .testimonial-feedback blockquote {
    min-height: 189px;
    font-size: 1.125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .timeline-item,
  .testimonial-controls button,
  .testimonial-enter-active,
  .testimonial-leave-active {
    transition: none !important;
  }

  .eyebrow-dot::after,
  .is-visible .timeline-item {
    animation: none;
  }

  .pre-reveal .timeline-item {
    opacity: 1;
  }
}
</style>
