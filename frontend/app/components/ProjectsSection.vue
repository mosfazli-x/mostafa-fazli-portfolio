<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const projects = [
  {
    title: 'FitTrack',
    category: 'Mobile App',
    description:
      'A clean fitness platform that helps users set goals, track their progress, and stay motivated through personalized workout experiences.',
    outcome: 'Personalized training plans with offline workout tracking',
    stack: ['Vue 3', 'TypeScript', 'Capacitor', 'Supabase', 'Tailwind CSS'],
    image: '/projects/fittrack.jpg',
    alt: 'FitTrack mobile app interface on a smartphone',
  },
  {
    title: 'FlowTask',
    category: 'SaaS',
    description:
      'A focused productivity platform that simplifies task management, team collaboration, and project tracking without overwhelming users.',
    outcome: 'Real-time boards that keep distributed teams in sync',
    stack: ['Nuxt 3', 'Fastify', 'PostgreSQL', 'Redis', 'WebSockets'],
    image: '/projects/flowtask.jpg',
    alt: 'FlowTask SaaS dashboard interface',
  },
  {
    title: 'Teamly',
    category: 'Web App',
    description:
      'A streamlined employee management platform designed to help businesses manage teams, track performance, organize employee information, and simplify everyday HR tasks.',
    outcome: 'Role-based HR workflows consolidated into one dashboard',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    image: '/projects/teamly.jpg',
    alt: 'Teamly employee management dashboard',
  },
  {
    title: 'Dukaan',
    category: 'UX/UI Design',
    description:
      'A conversion-focused shopping experience built around intuitive navigation, personalized discovery, and a smoother checkout process.',
    outcome: 'A checkout flow redesigned around friction-free discovery',
    stack: ['Figma', 'Design System', 'Prototyping', 'UX Research'],
    image: '/projects/dukaan.jpg',
    alt: 'Dukaan e-commerce shopping experience',
  },
] as const

const root = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const isShown = ref(false)

let observer: IntersectionObserver | undefined

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  const el = root.value
  if (!el) return

  if (prefersReducedMotion()) {
    isShown.value = true
    return
  }

  const rect = el.getBoundingClientRect()
  const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0

  if (alreadyInView) {
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
    { threshold: 0, rootMargin: '0px 0px -12% 0px' },
  )

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="work"
    ref="root"
    class="projects"
    :class="[isHidden ? 'pre-reveal' : '', isShown ? 'is-visible' : '']"
    aria-labelledby="work-title"
  >
    <span class="projects-glow" aria-hidden="true" />

    <div class="container content">
      <header class="head reveal" style="--delay: 0ms">
        <span class="badge">Recent Work</span>
        <h2 id="work-title" class="title">Projects that deliver results</h2>
      </header>

      <div class="list">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="project reveal"
          :class="{ reversed: index % 2 === 1 }"
          :style="{ '--delay': `${100 + index * 90}ms` }"
        >
          <div class="media">
            <img
              :src="project.image"
              :alt="project.alt"
              width="960"
              height="600"
              loading="lazy"
              decoding="async"
            >
            <span class="media-sheen" aria-hidden="true" />
          </div>

          <div class="body">
            <div class="heading-row">
              <h3 class="project-title">{{ project.title }}</h3>
              <span class="project-tag">{{ project.category }}</span>
            </div>
            <p class="project-desc">{{ project.description }}</p>

            <p class="project-outcome">
              <span class="outcome-dot" aria-hidden="true" />
              {{ project.outcome }}
            </p>

            <ul class="stack" :aria-label="`${project.title} tech stack`">
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
  width: 100%;
  padding: 96px 30px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  scroll-margin-top: 96px;
}

.projects-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(46% 40% at 90% 4%, rgba(38, 129, 208, 0.14) 0%, transparent 72%),
    radial-gradient(36% 34% at 6% 48%, rgba(38, 129, 208, 0.07) 0%, transparent 72%);
}

.container {
  position: relative;
  z-index: 1;
  margin-inline: auto;
  width: 100%;
  max-width: 1140px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: rgb(38, 129, 208);
}

.title {
  margin: 0;
  font-family: 'Boldonse', system-ui, sans-serif;
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: #fff;
  text-wrap: balance;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 20px;
  padding: 10px;
  /* border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.012) 100%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
  transition:
    border-color 350ms ease,
    box-shadow 350ms ease,
    background-color 350ms ease; */
}

.project.reversed .media {
  order: 2;
}

.media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1.6;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(9, 14, 24, 0.6);
}

.media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.96) contrast(1.02);
  transform: scale(1.005) translateZ(0);
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.media-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(180deg, transparent 55%, rgba(3, 8, 16, 0.35) 100%),
    linear-gradient(135deg, rgba(133, 203, 255, 0.1), transparent 45%);
  opacity: 0.8;
  transition: opacity 400ms ease;
}

.body {
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  min-width: 0;
  padding: 34px 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(120% 100% at 100% 0%, rgba(38, 129, 208, 0.16) 0%, transparent 62%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.055) 0%, rgba(6, 11, 22, 0.7) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset;
}

.heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.project-title {
  margin: 0;
  font-family: 'Boldonse', system-ui, sans-serif;
  font-size: clamp(1.35rem, 1.1vw + 1rem, 1.65rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #fff;
}

.project-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  background: #2681d0;
  color: #04101c;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 0 18px rgba(38, 129, 208, 0.24);
}

.project-desc {
  margin: 0;
  max-width: 44ch;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16.5px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: -0.01em;
  color: rgba(226, 234, 245, 0.72);
}

.project-outcome {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: 0.01em;
  color: #85cbff;
}

.outcome-dot {
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  margin-top: 0.42em;
  border-radius: 50%;
  background: #2681d0;
  box-shadow: 0 0 10px rgba(88, 167, 232, 0.8);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 0;
  padding: 16px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  list-style: none;
}

.stack li {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.035);

  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: rgba(226, 234, 245, 0.68);
  transition:
    border-color 250ms ease,
    background-color 250ms ease,
    color 250ms ease;
}

.reveal {
  transition:
    opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 750ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.pre-reveal .reveal {
  opacity: 0;
  transform: translateY(30px) scale(0.99);
  filter: blur(6px);
}

.is-visible .reveal {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

@media (hover: hover) and (pointer: fine) {
  /* .project:hover {
    border-color: rgba(88, 167, 232, 0.26);
    background-color: rgba(255, 255, 255, 0.02);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.08) inset,
      0 20px 46px rgba(0, 0, 0, 0.28),
      0 0 32px rgba(38, 129, 208, 0.1);
  } */

  .project:hover .media img {
    transform: scale(1.045) translateZ(0);
  }

  .project:hover .media-sheen {
    opacity: 1;
  }

  .project:hover .stack li {
    border-color: rgba(88, 167, 232, 0.2);
    color: rgba(238, 243, 250, 0.82);
  }
}

@media (max-width: 1023.98px) {
  .projects {
    padding: 80px 24px;
  }

  .project {
    grid-template-columns: minmax(0, 1fr);
  }

  .project.reversed .media {
    order: 0;
  }

  .body {
    padding: 30px 28px;
  }

  .project-desc {
    max-width: 60ch;
  }
}

@media (max-width: 639.98px) {
  .projects {
    padding: 64px 16px;
    scroll-margin-top: 80px;
  }

  .content {
    gap: 40px;
  }

  .badge {
    font-size: 17px;
  }

  .title {
    font-size: clamp(1.8rem, 7.5vw, 2.35rem);
  }

  .list {
    gap: 16px;
  }

  .project {
    gap: 12px;
    padding: 8px;
    border-radius: 20px;
  }

  .media {
    border-radius: 14px;
  }

  .body {
    padding: 24px 20px;
    border-radius: 14px;
    gap: 14px;
  }

  .heading-row {
    gap: 10px;
  }

  .project-title {
    font-size: 1.3rem;
  }

  .project-desc {
    font-size: 15px;
    line-height: 1.65;
  }

  .project-outcome {
    font-size: 12.5px;
  }

  .stack {
    gap: 6px;
    padding-top: 14px;
  }

  .stack li {
    padding: 4px 9px;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .project,
  .media img,
  .media-sheen {
    transition: none !important;
    transform: none !important;
  }

  .pre-reveal .reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
