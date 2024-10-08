<script setup lang="ts">
import anime from 'animejs'
import { useLocalStorage, useBreakpoints, useVibrate } from '@vueuse/core'
import { ref, computed, onMounted, watch } from 'vue'
import type { Ref } from 'vue'

const activeTab = ref('about_us')
const isInitial = ref(true)
const isDomReady = ref(false)
const isEverythingLoaded = ref(false)

const showCookieBanner = useLocalStorage('showCookieBanner', true)
const showCookieMessage = ref(false)
const cookieMessage = ref(null)
const { vibrate, isSupported } = useVibrate({ pattern: [100] })

const homeBtn: Ref<Element | null> = ref(null)

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 2560
})

const animationKeyframes = computed(() => {
  switch (activeBreakpoint.value) {
    case 'mobile':
      return [
        { maxWidth: '4rem', duration: 300 },
        { maxWidth: '4rem', duration: 300 }
      ]
    case 'tablet':
      return [
        { maxWidth: '1.5rem', duration: 300 },
        { maxWidth: '1.5rem', duration: 300 }
      ]
    case 'laptop':
      return [
        { maxWidth: '2rem', duration: 300 },
        { maxWidth: '2rem', duration: 300 }
      ]
    case 'desktop':
      return [
        { maxWidth: '3rem', duration: 300 },
        { maxWidth: '3rem', duration: 300 }
      ]
    case 'wide':
      return [
        { maxWidth: '4rem', duration: 300 },
        { maxWidth: '4rem', duration: 300 }
      ]
    default:
      return [
        { maxWidth: '4rem', duration: 300 },
        { maxWidth: '4rem', duration: 300 }
      ]
  }
})

const panelHeaderKeyframes = computed(() => {
  switch (activeBreakpoint.value) {
    case 'mobile':
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '100%' },
        { fontSize: ['1.5rem', '1.5rem'] },
        { translateX: ['-50rem', '0rem'] }
      ]
    case 'tablet':
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '100%' },
        { marginBottom: ['4.5rem', '0rem'] },
        { fontSize: ['3rem', '1rem'] }
      ]
    case 'laptop':
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '65%' },
        { marginBottom: ['4.5rem', '0.2rem'] },
        { fontSize: ['2rem', '1.2rem'] }
      ]
    case 'desktop':
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '65%' },
        { marginBottom: ['4.5rem', '0.3rem'] },
        { fontSize: ['3rem', '1.5rem'] }
      ]
    case 'wide':
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '65%' },
        { marginBottom: ['4.5rem', '0.5rem'] },
        { fontSize: ['3rem', '3rem'] }
      ]
    default:
      return [
        { justifyContent: 'flex-end' },
        { alignItems: 'center' },
        { width: '65%' },
        { marginBottom: ['4.5rem', '0rem'] },
        { fontSize: ['3rem', '2rem'] }
      ]
  }
})

const activeBreakpoint = breakpoints.active()
const isMobile = computed(() => activeBreakpoint.value === 'mobile')

const showCookieBannerTitle = computed(
  () => !isMobile.value || (isMobile.value && !showCookieMessage.value)
)

const activateTab = (event: Event) => {
  activeTab.value =
    event.target?.getAttribute('data-tab') || event.target?.parentElement.getAttribute('data-tab')
  collapsePanels()
}

const collapsePanels = () => {
  if (isMobile.value && isSupported) vibrate() // Vibrate on mobile

  if (isInitial.value) {
    anime({
      targets: '.panel-title',
      keyframes: [{ justifyContent: 'flex-end' }],
      duration: 500,
      easing: 'linear'
    })

    anime({
      targets: `.panel[data-name="${activeTab.value}"]`,
      keyframes: [
        { maxWidth: '100%', duration: 300 },
        { maxWidth: '100%', duration: 300 }
      ],
      easing: 'linear'
    })

    anime({
      targets: `.panel:not([data-name="${activeTab.value}"])`,
      keyframes: animationKeyframes.value,
      easing: 'linear',
      complete: () => {
        setTimeout(() => {
          document.querySelectorAll('.panel').forEach((el) => {
            el.classList.remove('initial')
            if (el.getAttribute('data-name') !== activeTab.value) el.classList.add('collapsed')
            else el.classList.remove('collapsed')
          })

          document.querySelector('.menu-button')?.classList.remove('initial')
        }, 100)
      }
    })

    if (isMobile.value) {
      anime({
        targets: `.panel[data-name="${activeTab.value}"] .panel-title h1`,
        keyframes: panelHeaderKeyframes.value,
        duration: 300,
        easing: 'linear',
        complete: () => {}
      })
    } else {
      anime({
        targets: '.panel-title h1',
        keyframes: panelHeaderKeyframes.value,
        duration: 800,
        easing: 'linear',
        complete: () => {}
      })
    }

    anime({
      targets: '.panel-title img.cover',
      keyframes: [
        { opacity: 1, duration: 600 },
        { opacity: 0, duration: 600 }
      ],
      easing: 'linear',
      complete: () => {
        isInitial.value = false
      }
    })

    return
  }

  anime({
    targets: `.panel[data-name="${activeTab.value}"]`,
    keyframes: [
      { maxWidth: '100%', duration: 300 },
      { maxWidth: '100%', duration: 300 }
    ],
    easing: 'linear'
  })

  anime({
    targets: `.panel:not([data-name="${activeTab.value}"])`,
    keyframes: animationKeyframes.value,
    easing: 'linear'
  })

  anime({
    targets: `.panel[data-name="${activeTab.value}"] .panel-title`,
    keyframes: [
      { opacity: 0, duration: 300 },
      { opacity: 0, duration: 300 }
    ],
    duration: 500,
    easing: 'linear'
  })

  anime({
    targets: `.panel:not([data-name="${activeTab.value}"]) .panel-title`,
    keyframes: [
      { opacity: 1, duration: 300 },
      { opacity: 1, duration: 300 }
    ],
    duration: 500,
    easing: 'linear'
  })

  anime({
    targets: `.panel[data-name="${activeTab.value}"] .content-wrapper .content`,
    keyframes: [
      { opacity: 1, duration: 300 },
      { opacity: 1, duration: 300 }
    ],
    duration: 500,
    easing: 'linear'
  })

  anime({
    targets: `.panel:not([data-name="${activeTab.value}"]) .content-wrapper .content`,
    keyframes: [
      { opacity: 0, duration: 300 },
      { opacity: 0, duration: 300 }
    ],
    duration: 500,
    easing: 'linear'
  })
}

const toggleCookieMessage = (event: Event) => {
  event.preventDefault()

  showCookieMessage.value = !showCookieMessage.value
}

console.log('active breakpoint:', activeBreakpoint.value)

watch(activeBreakpoint, () => {
  console.log('active breakpoint:', activeBreakpoint.value)

  if (isMobile.value) {
    window.location.reload()
    return
  }

  collapsePanels()
})

watch(homeBtn, () => {
  if (homeBtn.value) {
    homeBtn.value.addEventListener('click', () => {
      document.querySelectorAll('.panel').forEach((el) => {
        el.classList.add('initial')
        el.classList.remove('collapsed')
      })

      document.querySelector('.menu-button')?.classList.add('initial')

      isInitial.value = true
    })
  }
})

onMounted(() => {
  isDomReady.value = true
  window.onload = () => {
    setTimeout(() => {
      isEverythingLoaded.value = true
    }, 50)
  }
})
</script>
<template>
  <div>
    <Transition name="slide-show" appear>
      <div v-if="!isEverythingLoaded" class="splash-screen">
        <img src="/assets/logos/concept_living_logo_white.svg" alt="Concept Living logo" />
      </div>
      <div v-else id="main-container">
        <div v-if="isMobile" ref="homeBtn" class="menu-button initial" key="menu_button">
          <img src="/assets/icons/home.svg" alt="Home" />
        </div>
        <div id="main-container">
          <section class="panel initial" data-name="about_us" key="about_us">
            <div class="panel-title" data-tab="about_us" @click="activateTab">
              <img
                v-if="isInitial"
                class="home-logo"
                src="/assets/logos/concept_living_logo_white.svg"
                alt=""
              />
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/au.png' : '/assets/columns/col_au.png'"
                alt="Concept Living column image"
              />
              <h1 class="header">About us</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header">Who we are</h2>
                  <p>
                    Concept Living is a well established scandinavian furniture supplier, based in
                    Gothenburg, Sweden. We offer well designed, high quality furniture. Our
                    collections consists of products for the home, as well as project-specific
                    furniture for hotel- and restaurant environments
                  </p>
                </section>
                <section>
                  <h2 class="header">What we do</h2>
                  <p>
                    Concept Living is a reliable partner for private label product development. Our
                    services include design, prototyping, manufacturing, quality control and
                    delivery assurance. We work with a wide network of designers and manufacturers,
                    focusing on creating contemporary, sustainable and price efficient products.
                  </p>
                </section>
                <section>
                  <h2 class="header">Our products</h2>
                  <p>
                    Concept Living has it's own well developed assortment of quality furniture for
                    most of the home's furnished rooms. We have a large selection of dining room
                    furniture, beds, cabinets and coffee tables. We make sure that all the products
                    we sell live up to our keywords - form, function and quality.
                  </p>
                </section>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cau.png" alt="About us" />
              </div>
            </div>
          </section>
          <section class="panel initial" data-name="natural_stone" key="natural_stone">
            <div class="panel-title" data-tab="natural_stone" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/ns.png' : '/assets/columns/col_ns.png'"
                alt=""
              />
              <h1 class="header">Natural stone</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">NATURAL STONE</h2>
                  <p>
                    In our stone collection we use different types of marble, travertin and
                    limestone. The surface of the stone is brushed and unvarnished to emphasize
                    grain and structure. This is to enhance the feeling of natural stone.
                  </p>
                </section>
                <section>
                  <p>
                    Since each block of stone varies in color, texture and grain pattern the
                    expression is vivid. Lime spar, veins, striations and sand pits are natural
                    characteristics that show that the material is genuine. No two stones are alike,
                    which is part of the charm of natural materials like stone.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Natural%20Stone.pdf"
                    target="_blank"
                    download
                    >See all NATURAL STONE</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cns.png" alt="Natural Stone" />
                <!-- <img class="cover-logo" src="/assets/logos/new/ns.svg" alt="Natural Stone logo" /> -->
              </div>
            </div>
          </section>
          <section class="panel initial" data-name="stenhuggardottern" key="stenhuggardottern">
            <div class="panel-title" data-tab="stenhuggardottern" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/s.png' : '/assets/columns/col_s.png'"
                alt=""
              />
              <h1 class="header">STENHUGGARDOTTERN</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">STENHUGGARDOTTERN</h2>
                  <p>
                    Josefin grew up on Kinnekulle, where her ancestors quarried limestone for
                    several generations. Her dream of designing something other than the
                    windowsills, floors, and stone slabs that are made in the stonemasonry became a
                    reality a few years ago and has resulted in several collections of beautifully
                    crafted utility objects in stone.
                  </p>
                </section>
                <section>
                  <p>
                    These plates, candlesticks and vases, chiseled out of the 200 million year old
                    material, humbly reminds us that we only live here on earth for a short time.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Stenhuggardottern.pdf"
                    target="_blank"
                    download
                    >See all STENHUGGARDOTTERN</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cs.png" alt="STENHUGGARDOTTERN" />
                <img
                  class="cover-logo"
                  src="/assets/logos/new/s.svg"
                  alt="STENHUGGARDOTTERN logo"
                />
              </div>
            </div>
          </section>

          <section class="panel initial" data-name="new_line" key="new_line">
            <div class="panel-title" data-tab="new_line" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/nl.png' : '/assets/columns/col_nl.png'"
                alt=""
              />
              <h1 class="header">New line</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">New line</h2>
                  <p>
                    Our range of wooden furniture are made of FSC certified wood such as oak. This
                    material is known for it's exceptional strength and good durability. It is one
                    of the most popular types of hardwood, characterized by hardness, elasticity and
                    resistance to cracking with temperature changes.
                  </p>
                </section>
                <section>
                  <p>
                    All our wooden products come in four different surface treatments, which makes
                    it easy to mix and match them according to preferred interior style. Our
                    standard finishes are; black-, smoked-, natural- and white oiled.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Wood.pdf"
                    target="_blank"
                    download
                    >See all of NEW LINE</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cnl.png" alt="New Line" />
                <img class="cover-logo" src="/assets/logos/new/nl.svg" alt="New Line logo" />
                <img class="cover-logo up" src="/assets/logos/new/nl_DNA.png" alt="New Line DNA" />
              </div>
            </div>
          </section>
          <section class="panel initial" data-name="sabi_garden" key="sabi_garden">
            <div class="panel-title" data-tab="sabi_garden" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/sg.png' : '/assets/columns/col_sg.png'"
                alt=""
              />
              <h1 class="header">Sabi garden</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">Sabi garden</h2>
                  <p>
                    Our japanese inspired outdoor range is made of corten steel. This is a special
                    type of steel alloy which naturally weathers over time to create a beautiful
                    rusty orange-brown colour. The rust layer is transformed into a dense patina
                    layer, sealing-off the steel surface, resisting further corrosion.
                  </p>
                </section>
                <section>
                  <p>
                    This material is not only maintenance free and extremely durable, it constitutes
                    a beautiful contrast to the soft greenery of the garden and have become one of
                    the most trendy and popular materials among architects and landscape designers.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Sabi%20Garden.pdf"
                    target="_blank"
                    download
                    >See all of SABI GARDEN</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/csg.png" alt="Sabi Garden" />
                <img class="cover-logo" src="/assets/logos/new/sg.svg" alt="logo" />
              </div>
            </div>
          </section>

          <section class="panel initial" data-name="supreme_beds" key="supreme_beds">
            <div class="panel-title" data-tab="supreme_beds" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/sb.png' : '/assets/columns/col_sb.png'"
                alt=""
              />
              <h1 class="header">Supreme beds</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">Supreme beds</h2>
                  <p>
                    In our beds assortment you find handmade quality beds. We offer beds that take
                    care of the old Swedish handcraft tradition. You can expect to get a lot of
                    quality for the money since we make sure our beds are manufactured to
                    perfection.
                  </p>
                </section>
                <section>
                  <p>
                    Making a real quality bed is a craft that requires great knowledge, experience
                    and patience. In every detail, our bedmakers develop quality and comfort.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Beds.pdf"
                    target="_blank"
                    download
                    >See all of SUPREME BEDS</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/csb.png" alt="Supreme Beds" />
                <img class="cover-logo" src="/assets/logos/new/sb.svg" alt="logo" />
              </div>
            </div>
          </section>

          <section
            class="panel initial"
            data-name="det_vilda_skafferiet"
            key="det_vilda_skafferiet"
          >
            <div class="panel-title" data-tab="det_vilda_skafferiet" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/dvs.png' : '/assets/columns/col_dvs.png'"
                alt=""
              />
              <h1 class="header">Det vilda skafferiet</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section>
                  <h2 class="header large">Det vilda skafferiet</h2>
                  <p>
                    Our cutting boards are produced in Ukraine and developed in a design
                    collaboration between Ukrainian sawmills and Det Vilda Skafferiet. The project
                    aims to support Ukrainian producers in the wood industry, while at the same time
                    focusing on reuse as the product is made from waste pieces used in domestic oak
                    wood production.
                  </p>
                </section>
                <section>
                  <p>
                    Det Vilda Skafferiet's aims to inspire and spread knowledge about Swedish nature
                    and its various uses in gastronomy. The founder Simon Quartey organizes guided
                    tours in nature and arranges tailor-made dinners in the signs of the seasons.
                  </p>
                </section>
                <div class="links">
                  <a
                    href="https://www.conceptliving.se/cat/CL%20-%20Det%20Vilda%20Skafferiet.pdf"
                    target="_blank"
                    download
                    >See all of DET VILDA SKAFFERIET</a
                  >
                </div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cdvs.png" alt="Det Vilda Skafferiet" />
                <img class="cover-logo" src="/assets/logos/new/dvs.svg" alt="logo" />
              </div>
            </div>
          </section>

          <section class="panel initial" data-name="contact" key="contact">
            <div class="panel-title" data-tab="contact" @click="activateTab">
              <img
                v-if="isInitial"
                class="cover"
                :src="isMobile ? '/assets/columns/mobile/c.png' : '/assets/columns/col_c.png'"
                alt=""
              />
              <h1 class="header">Contact</h1>
              <div class="dampener">&nbsp;</div>
            </div>
            <div class="content-wrapper">
              <div class="content">
                <div class="logo">
                  <img src="/assets/logos/concept_living_logo.svg" alt="" />
                </div>
                <section style="margin-bottom: 2rem">
                  <h2 class="header large">Contact</h2>
                  <p>
                    <strong>General</strong>&nbsp;
                    <a class="standalone-links" href="mailto:info@conceptliving.se" target="_blank"
                      >info@conceptliving.se</a
                    >
                    <br />
                    <strong>Finance</strong>&nbsp;
                    <a
                      class="standalone-links"
                      href="mailto:finance@conceptliving.se"
                      target="_blank"
                      >finance@conceptliving.se
                    </a>
                    <br />
                    <strong>Claims</strong>&nbsp;
                    <a class="standalone-links" href="mailto:claim@conceptliving.se" target="_blank"
                      >claim@conceptliving.se</a
                    >
                  </p>
                </section>
                <section>
                  <h2 class="header large">Office / Showroom</h2>
                  <p>
                    Concept Living <br />
                    <a
                      class="standalone-links"
                      href="https://maps.app.goo.gl/f2G45umpTbX73TuK9"
                      target="_blank"
                    >
                      Plantagegatan 6 <br />
                      41305 Göteborg
                    </a>
                  </p>
                </section>
                <div class="links"></div>
              </div>
              <div class="cover">
                <img src="/assets/categories/new/cc.png" alt="Contact" />
              </div>
            </div>
          </section>
        </div>
        <Transition name="slide-fade">
          <div v-if="showCookieBanner" id="cookie-banner">
            <div class="overlay"></div>
            <div class="cookie-banner-content">
              <img src="/assets/categories/cookies.jpg" class="cover" alt="" />
              <img src="/assets/logos/concept_living_logo_white.svg" class="logo" alt="" />
              <div class="text">
                <Transition name="slide-fade-title" appear mode="in-out">
                  <h1 v-show="showCookieBannerTitle" class="title">Welcome to concept living</h1>
                </Transition>
                <Transition name="slide-fade" mode="out-in">
                  <p v-if="!showCookieMessage">
                    We use cookies and similar technologies to offer the best user experience.
                  </p>
                  <p v-else>
                    We use essential cookies to ensure our website functions properly and Google
                    Analytics to understand how you use our site. No personal data is stored. <br />
                    By continuing to use this site, you agree to our use of cookies.
                  </p>
                </Transition>
                <div class="buttons">
                  <button @click="showCookieBanner = false">accept</button>
                  <button @click="toggleCookieMessage($event)">read more</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
strong {
  font-weight: bold;
}

.standalone-links {
  text-decoration: underline;
  color: #333;
  width: fit-content;
  transition: color ease 0.3s;
}

.slide-show-enter-active,
.slide-show-leave-active {
  transition:
    opacity 0.5s 0.2s,
    transform 0.8s;
}

.slide-show-enter,
.slide-show-leave-to {
  opacity: 0;
}

.slide-show-enter-active img,
.slide-show-leave-active img {
  transition: transform 0.5s;
}

.slide-show-enter img,
.slide-show-leave-to img {
  transform: scale(1.5);
}

.slide-fade-title-enter-active {
  transition: all 0.3s 0.5s;
}

.slide-fade-title-leave-active {
  transition: all 0.3s;
}

.slide-fade-title-enter,
.slide-fade-title-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-title-enter-to,
.slide-fade-title-leave {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-title-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-title-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
