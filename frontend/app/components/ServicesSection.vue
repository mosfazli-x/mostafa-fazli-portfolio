<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Service {
  title: string
  description: string
  tags: string[]
  visual?: string,
  uiux?: boolean,
  ai?: boolean,
  devops?: boolean
}


const services: Service[] = [
  {
    title: 'Full-Stack Development',
    description:
      'Building scalable web applications with modern frontend, backend, and database technologies.',
    tags: [],
    visual: '/services-mobile-apps.png',
  },
  {
    title: 'AI Integration & Automation',
    description:
      'Integrating LLMs, RAG, OCR, and intelligent automation into real-world applications.',
    tags: [],
    ai: true,
  },
  {
    title: 'Educational Technology',
    description:
      'Developing digital learning platforms, educational systems, and AI-powered learning experiences.',
    tags: [],
    uiux: true,
  },
  {
    title: 'DevOps & Deployment',
    description:
      'Deploying secure, reliable applications with containerization and automated delivery workflows.',
    tags: [],
    devops: true,
  },
];

interface Skill {
  slug: string
  label: string
}

const skills: Skill[] = [
  { slug: 'nextdotjs', label: 'Next.js' },
  { slug: 'nuxt', label: 'Nuxt' },
  { slug: 'react', label: 'React' },
  { slug: 'vuedotjs', label: 'Vue.js' },
  { slug: 'typescript', label: 'TypeScript' },
  { slug: 'javascript', label: 'JavaScript' },
  { slug: 'python', label: 'Python' },
  { slug: 'django', label: 'Django' },
  { slug: 'fastapi', label: 'FastAPI' },
  { slug: 'postgresql', label: 'PostgreSQL' },
  { slug: 'mysql', label: 'MySQL' },
  { slug: 'mongodb', label: 'MongoDB' },
  { slug: 'docker', label: 'Docker' },
  { slug: 'git', label: 'Git' },
  { slug: 'github', label: 'GitHub' },
  { slug: 'linux', label: 'Linux' },
  { slug: 'tailwindcss', label: 'Tailwind CSS' },
  { slug: 'html5', label: 'HTML5' },
  { slug: 'css', label: 'CSS3' },
  { slug: 'sass', label: 'Sass' },
  { slug: 'nodedotjs', label: 'Node.js' },
  { slug: 'express', label: 'Express' },
  { slug: 'nestjs', label: 'NestJS' },
  { slug: 'graphql', label: 'GraphQL' },
  { slug: 'redis', label: 'Redis' },
  { slug: 'firebase', label: 'Firebase' },
  { slug: 'cloudflare', label: 'Cloudflare' },
  { slug: 'vercel', label: 'Vercel' },
]

const skillIconUrl = (skill: Skill) => `/skills/${skill.slug}.svg`

const skillDisplayedIndex = ref(0)
const isSkillChanging = ref(false)

const activeSkill = computed(() => skills[skillDisplayedIndex.value])
const skillCounter = computed(
  () => `${String(skillDisplayedIndex.value + 1).padStart(2, '0')} / ${String(skills.length).padStart(2, '0')}`,
)

const skillIconCache = new Map<string, HTMLImageElement>()

const getSkillIcon = (url: string) => {
  let image = skillIconCache.get(url)
  if (!image) {
    image = new Image()
    image.decoding = 'async'
    image.src = url
    skillIconCache.set(url, image)
  }
  return image
}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

const whenIconReady = (image: HTMLImageElement): Promise<void> => {
  let timer: number | undefined
  const timeout = new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, 3000)
  })

  const decoded =
    typeof image.decode === 'function'
      ? image.decode().then(() => undefined, () => undefined)
      : image.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true })
          image.addEventListener('error', () => resolve(), { once: true })
        })

  return Promise.race([decoded, timeout]).then(() => {
    if (timer) window.clearTimeout(timer)
  })
}

let skillRunId = 0

async function runSkillRotation() {
  const runId = ++skillRunId

  while (runId === skillRunId) {
    const nextIndex = (skillDisplayedIndex.value + 1) % skills.length
    const ready = whenIconReady(getSkillIcon(skillIconUrl(skills[nextIndex])))

    await wait(1250)
    if (runId !== skillRunId) return

    await ready
    if (runId !== skillRunId) return

    isSkillChanging.value = true
    await wait(200)
    if (runId !== skillRunId) return

    skillDisplayedIndex.value = nextIndex
    requestAnimationFrame(() => {
      if (runId === skillRunId) isSkillChanging.value = false
    })
  }
}

const aiMessages = [
  'Extracting text from documents',
  'Retrieving relevant context',
  'Generating an LLM response',
  'Automating connected workflows',
]

const aiStep = ref(1)
const aiStatus = computed(() => aiMessages[aiStep.value])

const terminalRuns = [
  {
    command: 'docker build -t app .',
    logs: ['Image built successfully', 'Container scan passed', 'TLS certificate verified'],
    comment: '// routing through nginx + cloudflare',
  },
  {
    command: 'pipeline deploy --prod',
    logs: ['CI/CD checks passed', 'Database migrations applied', 'Deployment is live'],
    comment: '// serving traffic from 3 regions',
  },
  {
    command: 'kubectl rollout status deploy/app',
    logs: ['Pods ready: 3/3', 'Health checks passed', 'Release promoted to stable'],
    comment: '// zero-downtime release complete',
  },
]

const terminalRunIndex = ref(0)
const terminalCommand = ref('')
const terminalLogs = ref<string[]>([])
const terminalComment = ref('')
const terminalIsTyping = ref(true)
let terminalRunId = 0

const typeTerminalText = async (text: string, runId: number) => {
  for (let index = 0; index <= text.length; index += 1) {
    if (runId !== terminalRunId) return false
    terminalCommand.value = text.slice(0, index)
    await wait(42)
  }
  return true
}

async function runTerminal() {
  const runId = ++terminalRunId

  while (runId === terminalRunId) {
    const run = terminalRuns[terminalRunIndex.value]
    terminalCommand.value = ''
    terminalLogs.value = []
    terminalComment.value = ''
    terminalIsTyping.value = true

    if (!(await typeTerminalText(run.command, runId))) return
    terminalIsTyping.value = false
    await wait(700)

    for (const log of run.logs) {
      if (runId !== terminalRunId) return
      terminalLogs.value.push(log)
      await wait(520)
    }

    terminalComment.value = run.comment
    await wait(2500)
    terminalRunIndex.value = (terminalRunIndex.value + 1) % terminalRuns.length
  }
}

let aiInterval: ReturnType<typeof setInterval> | undefined

const tagRotations = [-5, 4, -3, 6, -4, 3]

const root = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const isShown = ref(false)

onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isHidden.value = false
          isShown.value = true
          observer.disconnect()
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -15% 0px' },
  )

  observer.observe(el)
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const run = terminalRuns[0]
    terminalCommand.value = run.command
    terminalLogs.value = run.logs
    terminalComment.value = run.comment
    terminalIsTyping.value = false
    return
  }

  runTerminal()
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  for (const skill of skills) {
    getSkillIcon(skillIconUrl(skill))
  }

  runSkillRotation()

  aiInterval = window.setInterval(() => {
    aiStep.value = (aiStep.value + 1) % aiMessages.length
  }, 2200)
})

onUnmounted(() => {
  skillRunId += 1
  terminalRunId += 1
  if (aiInterval) window.clearInterval(aiInterval)
})
</script>

<template>
  <section id="services" ref="root" class="services"
    :class="[isHidden ? 'pre-reveal' : '', isShown ? 'is-visible' : '']" aria-labelledby="services-title">
    <div class="container">
      <div class="content">
        <header class="head">
          <span class="badge">Core Services</span>
          <h2 id="services-title" class="title">Solutions Built For Growth</h2>
        </header>

        <div class="panel">
          <div class="grid">
            <article v-for="(service, i) in services" :key="service.title" class="card" :style="{ '--i': i }">
              <span class="card-glow" aria-hidden="true" />
              <div class="card-body">
                <h3 class="card-title">{{ service.title }}</h3>
                <p class="card-desc">{{ service.description }}</p>
              </div>
              <ul v-if="!service.visual && !service.uiux && !service.ai && !service.devops" class="tags">
                <li v-for="(tag, j) in service.tags" :key="tag" class="tag"
                  :style="{ '--r': `${tagRotations[j % tagRotations.length]}deg` }">
                  {{ tag }}
                </li>
              </ul>
              <div v-else-if="service.visual" class="card-visual">
                <div class="skill-switcher" aria-label="Programming technology slideshow" aria-live="polite">
                  <div class="skill-icon-frame" :class="{ 'is-changing': isSkillChanging }">
                    <img class="skill-icon" :src="skillIconUrl(activeSkill)" :alt="`${activeSkill.label} logo`"
                      width="31" height="31" decoding="async">
                  </div>
                  <div class="skill-copy">
                    <span class="skill-overline">Currently building with</span>
                    <strong class="skill-name" :class="{ 'is-changing': isSkillChanging }">
                      {{ activeSkill.label }}
                    </strong>
                    <p class="skill-description">Modern tools. Thoughtful engineering.</p>
                  </div>
                </div>
                <span class="skill-counter">{{ skillCounter }}</span>
              </div>
              <div v-else-if="service.uiux" class="card-ui-ux">
                <div class="gallery" role="group" aria-label="Visual inspiration gallery">
                  <figure class="gallery__item gallery__item--feature">
                    <img src="https://picsum.photos/id/1004/400/400" alt="" loading="lazy" decoding="async" />
                    <span class="gallery__veil" aria-hidden="true"></span>
                    <figcaption class="gallery__index">01</figcaption>
                  </figure>

                  <figure class="gallery__item gallery__item--top-a">
                    <img src="https://picsum.photos/id/1013/400/400" alt="" loading="lazy" decoding="async" />
                    <span class="gallery__veil" aria-hidden="true"></span>
                    <figcaption class="gallery__index">02</figcaption>
                  </figure>

                  <figure class="gallery__item gallery__item--top-b">
                    <img src="https://picsum.photos/id/1066/400/400" alt="" loading="lazy" decoding="async" />
                    <span class="gallery__veil" aria-hidden="true"></span>
                    <figcaption class="gallery__index">03</figcaption>
                  </figure>

                  <figure class="gallery__item gallery__item--bottom-a">
                    <img src="https://picsum.photos/id/325/400/400" alt="" loading="lazy" decoding="async" />
                    <span class="gallery__veil" aria-hidden="true"></span>
                    <figcaption class="gallery__index">04</figcaption>
                  </figure>

                  <figure class="gallery__item gallery__item--bottom-b">
                    <img src="https://picsum.photos/id/65/400/400" alt="" loading="lazy" decoding="async" />
                    <span class="gallery__veil" aria-hidden="true"></span>
                    <figcaption class="gallery__index">05</figcaption>
                  </figure>
                </div>
              </div>
              <div v-else-if="service.ai" class="card-ai">
                <section class="ai-mini" aria-label="AI integration and automation">
                  <div class="ai-mini__top">
                    <div class="ai-mini__eyebrow">
                      <span class="ai-mini__spark" aria-hidden="true">&#x2733;</span> AI INTEGRATION
                    </div>
                    <div class="ai-mini__live">
                      <span class="ai-mini__live-dot" aria-hidden="true"></span> ACTIVE
                    </div>
                  </div>

                  <div class="ai-mini__main">
                    <div class="ai-mini__orb" aria-hidden="true">
                      <svg viewBox="0 0 48 48" fill="none">
                        <path d="M24 4.5 28.4 17l12.1 4.5-12.1 4.4L24 38.5l-4.4-12.6L7.5 21.5 19.6 17 24 4.5Z"
                          fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="1.6"
                          stroke-linejoin="round" />
                        <path d="m35.5 29 2.1 5.4L43 36.5l-5.4 2.1-2.1 5.4-2.1-5.4-5.4-2.1 5.4-2.1 2.1-5.4Z"
                          fill="currentColor" />
                        <circle cx="13" cy="36" r="2" fill="currentColor" />
                        <circle cx="36" cy="12" r="1.6" fill="currentColor" />
                      </svg>
                    </div>

                    <div class="ai-mini__copy">
                      <h2 class="ai-mini__title">AI Integration</h2>
                      <p class="ai-mini__desc">From intelligent data to automated action.</p>
                      <div class="ai-mini__status" aria-live="polite">
                        <span class="ai-mini__status-mark"></span>
                        <span>{{ aiStatus }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="ai-mini__tools" aria-label="AI capabilities">
                    <div class="ai-mini__tool" :class="{ 'is-active': aiStep === 0 }">
                      <svg viewBox="0 0 24 24">
                        <path d="M7 3h7l4 4v14H6V4a1 1 0 0 1 1-1Z" />
                        <path d="M14 3v5h4M9 12h6M9 16h6" />
                      </svg>OCR
                    </div>
                    <div class="ai-mini__tool" :class="{ 'is-active': aiStep === 1 }">
                      <svg viewBox="0 0 24 24">
                        <ellipse cx="12" cy="5" rx="8" ry="3" />
                        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                      </svg>RAG
                    </div>
                    <div class="ai-mini__tool" :class="{ 'is-active': aiStep === 2 }">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M12 3v3m0 12v3M3 12h3m12 0h3M5.8 5.8l2.1 2.1m8.2 8.2 2.1 2.1m0-12.4-2.1 2.1m-8.2 8.2-2.1 2.1" />
                        <circle cx="12" cy="12" r="5" />
                      </svg>LLM
                    </div>
                    <div class="ai-mini__tool" :class="{ 'is-active': aiStep === 3 }">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M7 7h10a3 3 0 0 1 3 3v1M17 17H7a3 3 0 0 1-3-3v-1M16 8l1.5-1.5L19 8M8 16l-1.5 1.5L5 16" />
                      </svg>Auto
                    </div>
                  </div>

                  <div class="ai-mini__progress" aria-hidden="true">
                    <span :class="{ 'is-active': aiStep === 0 }"></span>
                    <span :class="{ 'is-active': aiStep === 1 }"></span>
                    <span :class="{ 'is-active': aiStep === 2 }"></span>
                    <span :class="{ 'is-active': aiStep === 3 }"></span>
                  </div>
                </section>
              </div>
              <div v-else-if="service.devops">
                <div class="dt-terminal" aria-label="Animated deployment terminal preview">
                  <div class="dt-termbar">
                    <div class="dt-controls" aria-hidden="true"><i></i><i></i><i></i></div>
                    <span>production-deploy.sh</span>
                    <span>&#x2197;</span>
                  </div>
                  <div class="dt-terminal-body" aria-live="off">
                    <div class="dt-line">
                      <span class="dt-prompt">$</span>
                      <span class="dt-cmd">{{ terminalCommand }}</span><span v-if="terminalIsTyping" class="dt-caret" aria-hidden="true"></span>
                    </div>
                    <div v-for="log in terminalLogs" :key="log" class="dt-log">
                      <span class="dt-check">&#x2713;</span><span>{{ log }}</span>
                    </div>
                    <div v-if="terminalComment" class="dt-comment">{{ terminalComment }}</div>
                  </div>
                  <div class="dt-progress" aria-hidden="true"><span></span></div>
                </div>
              </div>
            </article>
          </div>

          <aside class="cta">
            <div class="cta-photo">
              <img src="/services_impacts.avif" alt="Create a Imapct" loading="lazy" decoding="async">
            </div>
            <div class="cta-text">
              <span class="badge badge--ghost">Trusted By Global Partners</span>
              <h3 class="cta-title">Let&rsquo;s Create Impact</h3>
              <p class="cta-desc">Let&rsquo;s create meaningful and lasting digital impact.</p>
              <button class="cssbuttons-io-button">
                Get started
                <div class="icon">
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  position: relative;
  width: 100%;
  padding: 60px 30px;
  overflow: hidden;
}

/* Soft brand glow behind the whole section for depth */
.services::before {
  content: '';
  position: absolute;
  inset: 0;
  /* background: radial-gradient(60% 50% at 50% 0%, rgba(38, 129, 208, 0.16) 0%, transparent 70%); */
  pointer-events: none;
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
  gap: 64px;
}

.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-size: 24px;
  line-height: 1.2;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  color: var(--token-efbfb639-0154-426f-bea7-37f6ba33b7bb, rgb(38, 129, 208));
}

.badge--ghost {
  border-color: transparent;
  background: #e9ecf3;
  width: fit-content;

  background-image: linear-gradient(
    90deg,
    #3b82f6 0%,
    #8b5cf6 50%,
    #ec4899 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title {
  margin: 0;
  font-family: 'Boldonse', system-ui, sans-serif;
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  color: #fff;
}

.panel {
  display: flex;
  gap: 12px;
  padding: 32px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
}

/* =========================================
   Premium Glass Card — Apple-inspired
   ========================================= */

.card {
  position: relative;
  isolation: isolate;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  min-height: 380px;
  padding: 28px;

  overflow: hidden;
  border-radius: 28px;

  /* Transparent glass surface */
  background:
    radial-gradient(100% 75% at 50% 0%,
      rgba(48, 137, 215, 0.20) 0%,
      rgba(35, 91, 151, 0.08) 42%,
      transparent 75%),
    linear-gradient(145deg,
      rgba(255, 255, 255, 0.075) 0%,
      rgba(255, 255, 255, 0.025) 38%,
      rgba(7, 12, 23, 0.58) 100%);

  -webkit-backdrop-filter: blur(24px) saturate(145%);
  backdrop-filter: blur(24px) saturate(145%);

  /* Fine glass edge */
  border: 1px solid rgba(255, 255, 255, 0.12);

  /* Layered depth */
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 -1px 0 rgba(0, 0, 0, 0.18) inset,
    0 10px 30px rgba(0, 0, 0, 0.16),
    0 2px 8px rgba(0, 0, 0, 0.08);

  transition:
    transform 350ms cubic-bezier(0.2, 0.75, 0.25, 1),
    border-color 350ms ease,
    box-shadow 350ms ease,
    background-color 350ms ease;
}

/* Subtle inner reflection */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;

  border-radius: inherit;
  pointer-events: none;

  background:
    linear-gradient(125deg,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.025) 20%,
      transparent 42%);

  opacity: 0.75;
  transition: opacity 350ms ease;
}

/* Fine illuminated line along the upper edge */
.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1px;
  z-index: 2;

  pointer-events: none;

  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.38),
      rgba(133, 203, 255, 0.62),
      rgba(255, 255, 255, 0.25),
      transparent);

  opacity: 0.55;
  transition: opacity 350ms ease;
}

/* Ambient blue glow */
.card-glow {
  position: absolute;
  inset: 0;
  z-index: 0;

  border-radius: inherit;
  pointer-events: none;

  background:
    radial-gradient(85% 65% at 50% 0%,
      rgba(38, 129, 208, 0.22) 0%,
      rgba(38, 129, 208, 0.07) 42%,
      transparent 76%);

  opacity: 0.85;
  transition:
    opacity 350ms ease,
    transform 500ms ease;
}

/* Keep content above the glass layers */
.card-body,
.tags,
.card-visual,
.card-ui-ux,
.card-ai {
  position: relative;
  z-index: 1;
}

/* Hover interaction */
.card:hover {
  transform: translateY(-5px);

  border-color: rgba(150, 211, 255, 0.28);

  background:
    radial-gradient(100% 75% at 50% 0%,
      rgba(48, 137, 215, 0.27) 0%,
      rgba(35, 91, 151, 0.10) 42%,
      transparent 75%),
    linear-gradient(145deg,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.035) 38%,
      rgba(7, 12, 23, 0.52) 100%);

  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.10) inset,
    0 -1px 0 rgba(0, 0, 0, 0.15) inset,
    0 20px 50px rgba(0, 0, 0, 0.25),
    0 5px 22px rgba(31, 126, 207, 0.10);
}

.card:hover::before {
  opacity: 1;
}

.card:hover::after {
  opacity: 0.95;
}

.card:hover .card-glow {
  opacity: 1;
  transform: scale(1.04);
}

/* Keyboard accessibility */
.card:focus-within {
  outline: 2px solid rgba(133, 203, 255, 0.65);
  outline-offset: 3px;
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {

  .card,
  .card::before,
  .card::after,
  .card-glow {
    transition: none;
  }

  .card:hover {
    transform: none;
  }
}

.card-title {
  margin: 0 0 12px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.06em;
  color: #fff;
}

.card-desc {
  margin: 0;
  max-width: 34ch;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(233, 236, 243, 0.78);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag {
  border-radius: 50px;
  background: #e9ecf3;
  padding: 5px 22px;
  font-size: 14px;
  line-height: 1.5;
  color: #474747;
  transform: rotate(var(--r));
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
}

/* =========================================
   Skill switcher — animated rotating tech stack
   ========================================= */

.card-visual {
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 382px;
}

.skill-switcher {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.skill-icon-frame {
  position: relative;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(196, 181, 253, 0.2);
  border-radius: 17px;
  background:
    radial-gradient(circle at 28% 20%, rgba(139, 92, 246, 0.18), transparent 68%),
    rgba(255, 255, 255, 0.035);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.16);
}

.skill-icon-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 45%);
}

.skill-icon {
  width: 31px;
  height: 31px;
  object-fit: contain;
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
  transition:
    opacity 200ms ease,
    transform 200ms cubic-bezier(0.2, 0.75, 0.25, 1),
    filter 200ms ease;
}

.skill-icon-frame.is-changing .skill-icon {
  opacity: 0;
  transform: translateY(8px) scale(0.68) rotate(-10deg);
  filter: blur(3px);
}

.skill-copy {
  min-width: 0;
}

.skill-overline {
  display: block;
  margin-bottom: 5px;
  color: #8e9ab0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.skill-name {
  display: block;
  color: #f4f7fb;
  font-size: 17px;
  font-weight: 750;
  line-height: 1.25;
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.skill-name.is-changing {
  opacity: 0;
  transform: translateY(5px);
}

.skill-description {
  margin: 6px 0 0;
  color: #9ba7bb;
  font-size: 12px;
  line-height: 1.65;
}

.skill-counter {
  align-self: flex-start;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  width: 100%;
  color: #8793a8;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

@media (max-width: 420px) {
  .skill-icon-frame {
    flex-basis: 52px;
    width: 52px;
    height: 52px;
    border-radius: 15px;
  }

  .skill-icon {
    width: 28px;
    height: 28px;
  }

  .skill-name {
    font-size: 15px;
  }
}

/* ==========================================
   AI Integration widget
   ========================================== */

.card-ai {
  display: flex;
  justify-content: center;
}

.ai-mini {
  --violet: #a99aff;
  --cyan: #68e4dc;
  --muted: #919bb4;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: min(100%, 310px);
  padding: 13px;

  border: 1px solid rgba(157, 170, 220, .16);
  border-radius: 16px;

  background: linear-gradient(140deg, rgba(27, 31, 51, .96), rgba(13, 17, 29, .98));

  box-shadow:
    inset 0 1px rgba(255, 255, 255, .035),
    0 14px 36px rgba(0, 0, 0, .22);
}

.ai-mini::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: -55px;
  top: -52px;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: rgba(126, 106, 255, .14);
  filter: blur(30px);
}

.ai-mini__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ai-mini__eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #aeb7d1;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: .15em;
  text-transform: uppercase;
}

.ai-mini__spark {
  color: var(--violet);
  font-size: 13px;
  filter: drop-shadow(0 0 6px rgba(169, 154, 255, .55));
}

.ai-mini__live {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #85e8dc;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .08em;
}

.ai-mini__live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 0 3px rgba(104, 228, 220, .09);
  animation: aiMiniPulse 1.7s ease-in-out infinite;
}

.ai-mini__main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.ai-mini__orb {
  position: relative;
  display: grid;
  place-items: center;
  flex: 0 0 61px;
  width: 61px;
  height: 61px;
  border: 1px solid rgba(169, 154, 255, .45);
  border-radius: 18px;
  background: radial-gradient(circle at 32% 20%, rgba(122, 105, 230, .43), rgba(40, 43, 79, .94) 65%, rgba(17, 23, 43, .98));
  box-shadow:
    0 0 24px rgba(120, 105, 240, .12),
    inset 0 0 16px rgba(169, 154, 255, .08);
}

.ai-mini__orb::before,
.ai-mini__orb::after {
  content: '';
  position: absolute;
  inset: -5px;
  border: 1px solid rgba(169, 154, 255, .22);
  border-radius: 21px;
  animation: aiMiniRing 3.8s ease-out infinite;
}

.ai-mini__orb::after {
  animation-delay: 1.9s;
}

.ai-mini__orb svg {
  width: 29px;
  height: 29px;
  color: #e2ddff;
  filter: drop-shadow(0 0 7px rgba(195, 184, 255, .35));
}

.ai-mini__copy {
  min-width: 0;
}

.ai-mini__title {
  margin: 0;
  color: #f2f4ff;
  font-size: 15px;
  line-height: 1.15;
  letter-spacing: -.035em;
  font-weight: 720;
}

.ai-mini__desc {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.4;
}

.ai-mini__status {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 7px;
  color: #b9c4df;
  font-size: 9px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ai-mini__status-mark {
  flex: 0 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: var(--cyan);
  box-shadow: 0 0 7px rgba(104, 228, 220, .45);
}

.ai-mini__tools {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
  margin-top: 13px;
}

.ai-mini__tool {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  padding: 7px 4px;
  border: 1px solid rgba(152, 164, 208, .12);
  border-radius: 8px;
  color: #929db9;
  background: rgba(255, 255, 255, .018);
  font-size: 9px;
  font-weight: 750;
  transition:
    background .35s ease,
    color .35s ease,
    border-color .35s ease,
    box-shadow .35s ease;
}

.ai-mini__tool svg {
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ai-mini__tool.is-active {
  color: #bdf8f0;
  border-color: rgba(104, 228, 220, .35);
  background: rgba(66, 197, 190, .09);
  box-shadow: 0 0 13px rgba(66, 197, 190, .06);
}

.ai-mini__progress {
  display: flex;
  gap: 4px;
  margin-top: 10px;
}

.ai-mini__progress span {
  flex: 1;
  height: 2px;
  border-radius: 9px;
  background: rgba(169, 154, 255, .16);
  transition:
    background .3s ease,
    box-shadow .3s ease;
}

.ai-mini__progress span.is-active {
  background: var(--violet);
  box-shadow: 0 0 7px rgba(169, 154, 255, .4);
}

@keyframes aiMiniPulse {
  50% {
    opacity: .42;
  }
}

@keyframes aiMiniRing {
  0% {
    transform: scale(.94);
    opacity: .62;
  }

  100% {
    transform: scale(1.11);
    opacity: 0;
  }
}

@media (max-width: 270px) {
  .ai-mini {
    padding: 10px;
  }

  .ai-mini__main {
    gap: 9px;
  }

  .ai-mini__orb {
    flex-basis: 50px;
    width: 50px;
    height: 50px;
    border-radius: 15px;
  }

  .ai-mini__title {
    font-size: 13px;
  }

  .ai-mini__desc {
    font-size: 9px;
  }

  .ai-mini__tool {
    font-size: 8px;
    gap: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .ai-mini *,
  .ai-mini *::before,
  .ai-mini *::after {
    animation: none !important;
    transition: none !important;
  }
}

/* ==========================================
   PREMIUM GLASS CTA
   Translucent surface · Refined edges · Blue glow
   ========================================== */

.cta {
  --cta-text: #f4f8ff;
  --cta-muted: rgba(226, 235, 248, 0.72);
  --cta-accent: #8fd3ff;

  position: relative;
  isolation: isolate;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  flex: 0 0 350px;
  width: 350px;
  min-width: 0;
  padding: 22px;

  overflow: hidden;
  border-radius: 30px;

  color: var(--cta-text);

  /* Translucent glass surface */
  background:
    radial-gradient(110% 70% at 50% 0%,
      rgba(54, 145, 224, 0.23) 0%,
      rgba(35, 91, 151, 0.09) 45%,
      transparent 78%),
    linear-gradient(145deg,
      rgba(255, 255, 255, 0.095) 0%,
      rgba(255, 255, 255, 0.035) 45%,
      rgba(9, 16, 29, 0.40) 100%);

  border: 1px solid rgba(255, 255, 255, 0.14);

  -webkit-backdrop-filter: blur(28px) saturate(155%);
  backdrop-filter: blur(28px) saturate(155%);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.13),
    inset 0 -1px 0 rgba(255, 255, 255, 0.025),
    0 16px 40px rgba(0, 0, 0, 0.17),
    0 2px 8px rgba(0, 0, 0, 0.08);

  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 300ms ease,
    box-shadow 350ms ease;
}

/* Soft glass reflection */
.cta::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;

  border-radius: inherit;
  pointer-events: none;

  background:
    linear-gradient(125deg,
      rgba(255, 255, 255, 0.10) 0%,
      rgba(255, 255, 255, 0.025) 24%,
      transparent 43%);

  opacity: 0.8;
  transition: opacity 350ms ease;
}

/* Refined illuminated upper edge */
.cta::after {
  content: "";
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1px;
  z-index: 2;

  pointer-events: none;

  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      rgba(143, 211, 255, 0.75),
      rgba(255, 255, 255, 0.35),
      transparent);

  opacity: 0.7;
}

/* Subtle hover interaction */
.cta:hover {
  transform: translateY(-4px);

  border-color: rgba(143, 211, 255, 0.28);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.17),
    inset 0 -1px 0 rgba(255, 255, 255, 0.035),
    0 24px 55px rgba(0, 0, 0, 0.24),
    0 6px 24px rgba(43, 137, 214, 0.10);
}

.cta:hover::before {
  opacity: 1;
}


/* ==========================================
   PHOTO
   ========================================== */

.cta-photo {
  position: relative;
  z-index: 1;

  flex: 0 0 auto;
  width: 100%;
  aspect-ratio: 302 / 365;

  overflow: hidden;
  border-radius: 22px;

}

.cta-photo img {
  display: block;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center 22%;

  transform: scale(1.001);
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Subtle photographic shading */
.cta-photo::after {
  content: "";
  position: absolute;
  inset: 0;

  border-radius: inherit;
  pointer-events: none;

}

.cta:hover .cta-photo img {
  transform: scale(1.035);
}


/* ==========================================
   CONTENT
   ========================================== */

.cta-text {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;

  min-width: 0;
  padding-top: 25px;

  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.cta-title {
  margin: 0;

  color: var(--cta-text);

  font-size: clamp(1.65rem, 2.4vw, 2.15rem);
  font-weight: 550;
  line-height: 1.12;
  letter-spacing: -0.055em;

  text-wrap: balance;
}

.cta-desc {
  margin: 0;
  max-width: 30ch;

  color: var(--cta-muted);

  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: -0.01em;
}


/* ==========================================
   CTA BUTTON
   ========================================== */

.cta-button {
  position: relative;

  display: inline-flex;
  align-items: center;
  gap: 9px;

  max-width: 100%;
  margin-top: 13px;

  color: inherit;
  text-decoration: none;

  border-radius: 999px;

  transition:
    transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 250ms ease;
}

/* Primary label */
.cta-button__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 50px;
  padding: 0 25px;

  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;

  background: linear-gradient(135deg,
      #f5faff 0%,
      #dcefff 100%);

  color: #101d30;

  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.015em;
  white-space: nowrap;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    0 4px 14px rgba(0, 0, 0, 0.12);

  transition:
    background 250ms ease,
    box-shadow 250ms ease;
}

/* Separate glass icon */
.cta-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 50px;
  width: 50px;
  height: 50px;

  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.075);
  color: #f4f8ff;

  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 4px 12px rgba(0, 0, 0, 0.10);

  transition:
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
    background 250ms ease,
    border-color 250ms ease;
}

.cta-button__icon svg {
  display: block;
  width: 19px;
  height: 19px;
}

.cta-button:hover {
  opacity: 1;
}

.cta-button:hover .cta-button__label {
  background: linear-gradient(135deg,
      #ffffff 0%,
      #cceaff 100%);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 5px 18px rgba(52, 153, 226, 0.15);
}

.cta-button:hover .cta-button__icon {
  transform: translate(2px, -2px);

  background: rgba(143, 211, 255, 0.13);
  border-color: rgba(143, 211, 255, 0.35);
}

.cta-button:focus-visible {
  outline: 2px solid var(--cta-accent);
  outline-offset: 5px;
}


/* ==========================================
   TABLET & RESPONSIVE LAYOUT
   ========================================== */

@media (max-width: 1023.98px) {
  .panel {
    flex-direction: column;
  }

  .cta {
    flex: 1 1 auto;
    width: 100%;
    gap: 32px;
  }
}

/* Tablet: horizontal glass CTA */
@media (min-width: 768px) and (max-width: 1023.98px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cta {
    flex-direction: row;
    align-items: center;
    gap: 28px;
  }

  .cta-photo {
    flex: 0 0 40%;
    width: 40%;
    align-self: stretch;
    aspect-ratio: auto;
    min-height: 240px;
  }

  .cta-text {
    flex: 1 1 auto;
    min-width: 0;
    padding-top: 0;
    padding-left: 28px;

    border-top: none;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }
}

/* Smaller mobile screens */
@media (max-width: 480px) {
  .cta {
    padding: 17px;
    border-radius: 25px;
    gap: 28px;
  }

  .cta-photo {
    border-radius: 19px;
  }

  .cta-text {
    padding-top: 21px;
    gap: 11px;
  }

  .cta-title {
    font-size: clamp(1.65rem, 7vw, 2rem);
  }

  .cta-desc {
    font-size: 14px;
  }

  .cta-button__label {
    min-height: 47px;
    padding-inline: 20px;
  }

  .cta-button__icon {
    flex-basis: 47px;
    width: 47px;
    height: 47px;
  }
}


/* ==========================================
   ACCESSIBILITY
   ========================================== */

@media (prefers-reduced-motion: reduce) {

  .cta,
  .cta::before,
  .cta-photo img,
  .cta-button,
  .cta-button__label,
  .cta-button__icon {
    transition: none;
  }

  .cta:hover {
    transform: none;
  }

  .cta:hover .cta-photo img {
    transform: none;
  }

  .cta-button:hover .cta-button__icon {
    transform: none;
  }
}

@media (max-width: 767.98px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 639.98px) {
  .services {
    padding: 48px 16px;
  }

  .panel {
    padding: 16px;
  }

  .content {
    gap: 40px;
  }

  .card {
    min-height: auto;
    gap: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .card,
  .cta,
  .head {
    transition: none;
  }

  .skill-icon,
  .skill-name {
    transition: none;
  }
}

/* ==========================================
   PREMIUM BENTO GALLERY
   Glass surfaces · Editorial layout · Soft motion
   ========================================== */

.card-ui-ux {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 13px;

  width: 100%;
  min-width: 0;
  margin-top: auto;
}

/* Gallery header */

.gallery-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  min-height: 16px;
  padding-inline: 2px;
}

.gallery-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: rgba(221, 235, 250, 0.68);

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 1.4;
}

.gallery-status-dot {
  position: relative;

  flex: 0 0 6px;
  width: 6px;
  height: 6px;

  border-radius: 50%;
  background: #76d9ff;

  box-shadow:
    0 0 7px rgba(118, 217, 255, 0.65),
    0 0 14px rgba(118, 217, 255, 0.22);
}

.gallery-count {
  color: #f1f7ff;

  font-size: 10px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.gallery-count span {
  color: rgba(213, 228, 245, 0.42);
  font-weight: 450;
}


/* Main bento composition */

.gallery {
  position: relative;
  isolation: isolate;

  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr;
  grid-template-rows: repeat(2, minmax(72px, 1fr));

  gap: 8px;

  width: 100%;
  min-width: 0;
  min-height: 166px;
  max-height: 210px;
  aspect-ratio: 1.9 / 1;

  overflow: hidden;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.018);
}


/* Individual image tiles */

.gallery__item {
  position: relative;
  isolation: isolate;

  min-width: 0;
  min-height: 0;
  margin: 0;

  overflow: hidden;
  border-radius: 13px;

  background:
    linear-gradient(145deg,
      rgba(255, 255, 255, 0.07),
      rgba(10, 18, 31, 0.5));

  border: 1px solid rgba(255, 255, 255, 0.12);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 5px 14px rgba(0, 0, 0, 0.12);

  transform: translateZ(0);

  transition:
    border-color 300ms ease,
    box-shadow 300ms ease,
    background-color 300ms ease;
}


/* Bento positions */

.gallery__item--feature {
  grid-column: 1;
  grid-row: 1 / span 2;

  border-radius: 16px;
}

.gallery__item--top-a {
  grid-column: 2;
  grid-row: 1;
}

.gallery__item--top-b {
  grid-column: 3;
  grid-row: 1;
}

.gallery__item--bottom-a {
  grid-column: 2;
  grid-row: 2;
}

.gallery__item--bottom-b {
  grid-column: 3;
  grid-row: 2;
}


/* Image rendering */

.gallery__item img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  opacity: 0.88;

  transform: scale(1.015);

  filter: saturate(0.84) contrast(1.04);

  transition:
    transform 650ms cubic-bezier(0.2, 0.75, 0.25, 1),
    opacity 350ms ease,
    filter 400ms ease;
}

/* Give the featured frame a stronger editorial crop */

.gallery__item--feature img {
  object-position: center;
  filter: saturate(0.92) contrast(1.05);
}


/* Gradient veil */

.gallery__veil {
  position: absolute;
  inset: 0;
  z-index: 1;

  pointer-events: none;

  background:
    linear-gradient(180deg,
      rgba(6, 13, 24, 0.02) 35%,
      rgba(6, 13, 24, 0.12) 58%,
      rgba(6, 13, 24, 0.65) 100%),
    linear-gradient(135deg,
      rgba(132, 202, 255, 0.10),
      transparent 45%);

  opacity: 0.86;
  transition: opacity 350ms ease;
}


/* Glass edge reflection */

.gallery__item::before {
  content: "";

  position: absolute;
  inset: 0;
  z-index: 2;

  border-radius: inherit;
  pointer-events: none;

  background:
    linear-gradient(135deg,
      rgba(255, 255, 255, 0.16),
      rgba(255, 255, 255, 0.025) 26%,
      transparent 48%);

  opacity: 0.55;
  transition: opacity 350ms ease;
}


/* Minimal numeric labels */

.gallery__index {
  position: absolute;
  right: 7px;
  bottom: 7px;
  z-index: 3;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 23px;
  height: 22px;
  padding-inline: 5px;

  border: 1px solid rgba(255, 255, 255, 0.19);
  border-radius: 7px;

  background: rgba(8, 17, 30, 0.40);
  color: rgba(255, 255, 255, 0.92);

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  font-size: 9px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 2px 7px rgba(0, 0, 0, 0.12);

  transition:
    background 300ms ease,
    border-color 300ms ease;
}


/* Featured image receives a more spacious label */

.gallery__item--feature .gallery__index {
  right: 9px;
  bottom: 9px;

  min-width: 27px;
  height: 25px;
  border-radius: 8px;

  background: rgba(8, 17, 30, 0.48);
}


/* Hover interactions */

@media (hover: hover) and (pointer: fine) {
  .gallery__item:hover {
    border-color: rgba(143, 211, 255, 0.48);

    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 7px 20px rgba(0, 0, 0, 0.18),
      0 0 14px rgba(65, 157, 225, 0.08);
  }

  .gallery__item:hover img {
    opacity: 1;
    transform: scale(1.075);
    filter: saturate(1.08) contrast(1.035);
  }

  .gallery__item:hover .gallery__veil {
    opacity: 0.65;
  }

  .gallery__item:hover::before {
    opacity: 1;
  }

  .gallery__item:hover .gallery__index {
    background: rgba(23, 57, 83, 0.65);
    border-color: rgba(143, 211, 255, 0.35);
  }
}


/* Tablet and mobile adaptations */

@media (max-width: 1023.98px) {
  .gallery {
    grid-template-rows: repeat(2, minmax(84px, 1fr));

    min-height: 190px;
    max-height: 235px;

    gap: 9px;
    border-radius: 22px;
  }

  .gallery__item {
    border-radius: 15px;
  }

  .gallery__item--feature {
    border-radius: 17px;
  }
}

@media (max-width: 480px) {
  .card-ui-ux {
    gap: 12px;
  }

  .gallery {
    grid-template-columns: 1.12fr 0.88fr 0.88fr;
    grid-template-rows: repeat(2, minmax(70px, 1fr));

    min-height: 166px;
    max-height: none;
    aspect-ratio: 1.55 / 1;

    gap: 7px;
    border-radius: 18px;
  }

  .gallery__item {
    border-radius: 11px;
  }

  .gallery__item--feature {
    border-radius: 13px;
  }

  .gallery__index {
    right: 5px;
    bottom: 5px;

    min-width: 21px;
    height: 20px;
    padding-inline: 4px;

    border-radius: 6px;
    font-size: 8px;
  }

  .gallery__item--feature .gallery__index {
    right: 6px;
    bottom: 6px;
  }

  .gallery-eyebrow {
    font-size: 8px;
    letter-spacing: 0.12em;
  }

  .gallery-count {
    font-size: 9px;
  }
}


/* Motion accessibility */

@media (prefers-reduced-motion: reduce) {

  .gallery__item,
  .gallery__item img,
  .gallery__item::before,
  .gallery__veil,
  .gallery__index {
    transition: none;
  }

  .gallery__item:hover img {
    transform: none;
  }
}

/* =========================================
   DevOps terminal card
   ========================================= */

.card-devops {
  display: flex;
  justify-content: center;
}

.devops-terminal-card {
  --ink: #17251f;

  width: min(100%, 326px);
  position: relative;
  overflow: hidden;

  border: 1px solid #e0e8e3;
  border-radius: 20px;
  padding: 17px;

  color: var(--ink);
  background: linear-gradient(145deg, #ffffff 0%, #fbfdfb 62%, #f4faf6 100%);

  box-shadow:
    0 18px 45px rgba(24, 53, 39, .09),
    0 2px 8px rgba(24, 53, 39, .035);

  isolation: isolate;
}

.devops-terminal-card::before {
  content: '';
  position: absolute;
  width: 130px;
  height: 130px;
  right: -67px;
  top: -67px;
  border-radius: 50%;
  background: #d8f4e4;
  filter: blur(1px);
  opacity: .72;
  z-index: -1;
}

.dt-terminal {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 13px;
  overflow: hidden;
  background: #17231e;
  box-shadow: 0 7px 17px rgba(20, 41, 30, .10);
}

.dt-termbar {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #a7b8ad;
  border-bottom: 1px solid rgba(255, 255, 255, .09);
  background: #1d2c25;
  font: 9px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.dt-controls {
  display: flex;
  gap: 4px;
}

.dt-controls i {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #53665a;
}

.dt-controls i:first-child {
  background: #d98a77;
}

.dt-controls i:nth-child(2) {
  background: #dbbd6e;
}

.dt-controls i:nth-child(3) {
  background: #79c79a;
}

.dt-terminal-body {
  padding: 10px 11px 11px;
  min-height: 111px;
  font: 9.3px/1.82 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.dt-line {
  display: flex;
  gap: 7px;
  align-items: baseline;
  white-space: nowrap;
}

.dt-prompt {
  color: #6ce0a0;
}

.dt-cmd {
  color: #e7f0e9;
}

.dt-caret {
  display: inline-block;
  width: 5px;
  height: 11px;
  margin-left: 2px;
  vertical-align: -2px;
  background: #6ce0a0;
  animation: dt-blink 1.05s steps(2, end) infinite;
}

.dt-comment {
  color: #82968a;
}

.dt-log {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a2b4a8;
}

.dt-check {
  color: #6ce0a0;
  font-weight: 900;
}

.dt-loading {
  display: inline-block;
  width: 4px;
  height: 10px;
  vertical-align: -2px;
  margin-left: 2px;
  background: #6ce0a0;
  animation: dt-blink 1.05s steps(2, end) infinite;
}

.dt-progress {
  height: 3px;
  background: #25372d;
  overflow: hidden;
}

.dt-progress span {
  display: block;
  height: 100%;
  width: 66%;
  border-radius: 0 5px 5px 0;
  background: linear-gradient(90deg, #49b97b, #a2efbf);
  animation: dt-progress 5.6s ease-in-out infinite;
}

@keyframes dt-blink {

  0%,
  45% {
    opacity: 1;
  }

  46%,
  100% {
    opacity: 0;
  }
}

@keyframes dt-progress {

  0%,
  15% {
    width: 18%;
  }

  55% {
    width: 78%;
  }

  78%,
  100% {
    width: 100%;
  }
}

@media (max-width: 350px) {
  .devops-terminal-card {
    padding: 14px;
    border-radius: 17px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .devops-terminal-card *,
  .devops-terminal-card *::before,
  .devops-terminal-card *::after {
    animation: none !important;
  }
}
</style>
