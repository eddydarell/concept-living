<script setup>
import anime from 'animejs'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

const activeTab = ref('about_us')
const isInitial = ref(true)
const click = ref(0)
const showCookieBanner = useLocalStorage('showCookieBanner', true)

const activateTab = (event) => {
    
  activeTab.value =
    event.target.getAttribute('data-tab') || event.target.parentElement.getAttribute('data-tab')
  collapsePanels()
}

const collapsePanels = () => {
    if (isInitial.value) {

        anime({
            targets: '.panel-title',
            keyframes: [
                { justifyContent: 'flex-end' },
            ],
            duration: 500,
            easing: 'linear',
            complete: () => {
                    // document.querySelectorAll('.panel').forEach((el) => {
                    //     el.classList.remove('initial')
                    //     if (el.getAttribute('data-name') !== activeTab.value) el.classList.add('collapsed')
                    //     else el.classList.remove('collapsed')
                    // })
                
            }
        })

        anime({
        targets: `.panel[data-name="${ activeTab.value}"]`,
        keyframes: [
            { maxWidth: '100%', duration: 300 },
            { maxWidth: '100%', duration: 300 }
        ],
        easing: 'linear'
    })

    anime({
        targets: `.panel:not([data-name="${ activeTab.value}"])`,
        keyframes: [
            { maxWidth: '4rem', duration: 300 },
            { maxWidth: '4rem', duration: 300 }
        ],
        easing: 'linear',
        complete: () => {
            setTimeout(() => {
               document.querySelectorAll('.panel').forEach((el) => {
                el.classList.remove('initial')
                if (el.getAttribute('data-name') !== activeTab.value) el.classList.add('collapsed')
                else el.classList.remove('collapsed')
            })
            }, 100)
            
        }
    })

        anime({
            targets: '.panel-title h1',
            keyframes: [
                { justifyContent: 'flex-end' },
                { alignItems: 'center' },
                { width: '65%' },
                { marginBottom: ['4.5rem', '0rem'] },
                { fontSize: ['3rem', '2rem'] },
            ],
            duration: 800,
            easing: 'linear',
            complete: () => {
            }
        })

        anime({
        targets: '.panel-title img.cover',
        keyframes: [
            { opacity: 1, duration: 800 },
            { opacity: 0, duration: 800 }
        ],
            easing: 'linear',
            complete: () => {
                isInitial.value = false
            }
        })

        return
    }

    anime({
        targets: `.panel[data-name="${ activeTab.value}"]`,
        keyframes: [
            { maxWidth: '100%', duration: 300 },
            { maxWidth: '100%', duration: 300 }
        ],
        easing: 'linear'
    })

    anime({
        targets: `.panel:not([data-name="${ activeTab.value}"])`,
        keyframes: [
            { maxWidth: '4rem', duration: 300 },
            { maxWidth: '4rem', duration: 300 }
        ],
        easing: 'linear'
    })

    anime({
        targets: `.panel[data-name="${ activeTab.value}"] .panel-title`,
        keyframes: [
            { opacity: 0, duration: 300 },
            { opacity: 0, duration: 300 }
        ],
        duration: 500,
        easing: 'linear'
    })

    anime({
        targets: `.panel:not([data-name="${ activeTab.value}"]) .panel-title`,
        keyframes: [
            { opacity: 1, duration: 300 },
            { opacity: 1, duration: 300 }
        ],
        duration: 500,
        easing: 'linear'
    })

    anime({
        targets: `.panel[data-name="${ activeTab.value}"] .content-wrapper .content`,
        keyframes: [
            { opacity: 1, duration: 300 },
            { opacity: 1, duration: 300 }
        ],
        duration: 500,
        easing: 'linear'
    })

    anime({
        targets: `.panel:not([data-name="${ activeTab.value}"]) .content-wrapper .content`,
        keyframes: [
            { opacity: 0, duration: 300 },
            { opacity: 0, duration: 300 }
        ],
        duration: 500,
        easing: 'linear'
    })


}

const onBeforeEnter = (el) => {
    console.log('onBeforeEnter')
}

const onEnter = (el, done) => {
    console.log('onEnter')
}

const onAfterEnter = (el) => {
    console.log('onAfterEnter')
}

const onEnterCancelled = (el) => {
    console.log('onEnterCancelled')
}

const onBeforeLeave = (el) => {
    console.log('onBeforeLeave')
}

const onLeave = (el, done) => {
    console.log('onLeave')
}

const onAfterLeave = (el) => {
    console.log('onAfterLeave')
}

const onLeaveCancelled = (el) => {
    console.log('onLeaveCancelled')
}





</script>
<template>
  <div>
    <TransitionGroup
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
      tag="div"
      id="main-container"
      name="curtain"
      :key="click"
    >
      <section class="panel initial" data-name="about_us" key="about_us">
        <div class="panel-title" data-tab="about_us" @click="activateTab">
          <img
            v-if="isInitial"
            class="home-logo"
            src="/assets/logos/concept_living_logo_white.svg"
            alt=""
          />
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_cl.jpg" alt="" />
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
                Gothenburg, Sweden. We offer well designed, high quality furniture. Our collections
                consists of products for the home, as well as project-specific furniture for hotel-
                and restaurant environments
              </p>
            </section>
            <section>
              <h2 class="header">What we do</h2>
              <p>
                Concept Living is a reliable partner for private label product development. Our
                services include design, prototyping, manufacturing, quality control and delivery
                assurance. We work with a wide network of designers and manufacturers, focusing on
                creating contemporary, sustainable and price efficient products.
              </p>
            </section>
            <section>
              <h2 class="header">Our products</h2>
              <p>
                Concept Living has it's own well developed assortment of quality furniture for most
                of the home's furnished rooms. We have a large selection of dining room furniture,
                beds, cabinets and coffee tables. We make sure that all the products we sell live up
                to our keywords - form, function and quality.
              </p>
            </section>
            <div class="links">
              <a href="">info@conceptliving.se</a>
              <a href="https://www.conceptliving.se">www.conceptliving.se</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_cl.jpg" alt="" />
          </div>
        </div>
      </section>
      <section class="panel initial" data-name="natural_stone" key="natural_stone">
        <div class="panel-title" data-tab="natural_stone" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_s.jpg" alt="" />
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
                In our stone collection we use different types of marble, travertin and limestone.
                The surface of the stone is brushed and unvarnished to emphasize grain and
                structure. This is to enhance the feeling of natural stone.
              </p>
            </section>
            <section>
              <p>
                Since each block of stone varies in color, texture and grain pattern the expression
                is vivid. Lime spar, veins, striations and sand pits are natural characteristics
                that show that the material is genuine. No two stones are alike, which is part of
                the charm of natural materials like stone.
              </p>
            </section>
            <div class="links">
              <a href="#">See all NATURAL STONE</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_s.jpg" alt="" />
          </div>
        </div>
      </section>
      <section class="panel initial" data-name="stenhuggardottern" key="stenhuggardottern">
        <div class="panel-title" data-tab="stenhuggardottern" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_sd.jpg" alt="" />
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
                Josefin grew up on Kinnekulle, where her ancestors quarried limestone for several
                generations. Her dream of designing something other than the windowsills, floors,
                and stone slabs that are made in the stonemasonry became a reality a few years ago
                and has resulted in several collections of beautifully crafted utility objects in
                stone.
              </p>
            </section>
            <section>
              <p>
                These plates, candlesticks and vases, chiseled out of the 200 million year old
                material, humbly reminds us that we only live here on earth for a short time.
              </p>
            </section>
            <div class="links">
              <a href="#">See all STENHUGGARDOTTERN</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_sd.jpg" alt="" />
          </div>
        </div>
      </section>

      <section class="panel initial" data-name="new_line" key="new_line">
        <div class="panel-title" data-tab="new_line" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_nl.jpg" alt="" />
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
                material is known for it's exceptional strength and good durability. It is one of
                the most popular types of hardwood, characterized by hardness, elasticity and
                resistance to cracking with temperature changes.
              </p>
            </section>
            <section>
              <p>
                All our wooden products come in four different surface treatments, which makes it
                easy to mix and match them according to preferred interior style. Our standard
                finishes are; black-, smoked-, natural- and white oiled.
              </p>
            </section>
            <div class="links">
              <a href="#">See all of NEW LINE</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_nl.jpg" alt="" />
          </div>
        </div>
      </section>
      <section class="panel initial" data-name="sabi_garden" key="sabi_garden">
        <div class="panel-title" data-tab="sabi_garden" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_sg.jpg" alt="" />
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
                Our japanese inspired outdoor range is made of corten steel. This is a special type
                of steel alloy which naturally weathers over time to create a beautiful rusty
                orange-brown colour. The rust layer is transformed into a dense patina layer,
                sealing-off the steel surface, resisting further corrosion.
              </p>
            </section>
            <section>
              <p>
                This material is not only maintenance free and extremely durable, it constitutes a
                beautiful contrast to the soft greenery of the garden and have become one of the
                most trendy and popular materials among architects and landscape designers.
              </p>
            </section>
            <div class="links">
              <a href="#">See all of SABI GARDEN</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_sg.jpg" alt="" />
          </div>
        </div>
      </section>

      <section class="panel initial" data-name="supreme_beds" key="supreme_beds">
        <div class="panel-title" data-tab="supreme_beds" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_sb.jpg" alt="" />
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
                In our beds assortment you find handmade quality beds. We offer beds that take care
                of the old Swedish handcraft tradition. You can expect to get a lot of quality for
                the money since we make sure our beds are manufactured to perfection.
              </p>
            </section>
            <section>
              <p>
                Making a real quality bed is a craft that requires great knowledge, experience and
                patience. In every detail, our bedmakers develop quality and comfort.
              </p>
            </section>
            <div class="links">
              <a href="#">See all of SUPREME BEDS</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_sb.jpg" alt="" />
          </div>
        </div>
      </section>

      <section class="panel initial" data-name="det_vilda_skafferiet" key="det_vilda_skafferiet">
        <div class="panel-title" data-tab="det_vilda_skafferiet" @click="activateTab">
          <img v-if="isInitial" class="cover" src="/assets/columns/kolumner_dvs.jpg" alt="" />
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
                Our cutting boards are produced in Ukraine and developed in a design collaboration
                between Ukrainian sawmills and Det Vilda Skafferiet. The project aims to support
                Ukrainian producers in the wood industry, while at the same time focusing on reuse
                as the product is made from waste pieces used in domestic oak wood production.
              </p>
            </section>
            <section>
              <p>
                Det Vilda Skafferiet's aims to inspire and spread knowledge about Swedish nature and
                its various uses in gastronomy. The founder Simon Quartey organizes guided tours in
                nature and arranges tailor-made dinners in the signs of the seasons.
              </p>
            </section>
            <div class="links">
              <a href="#">See all of DET VILDA SKAFFERIET</a>
            </div>
          </div>
          <div class="cover">
            <img src="/assets/categories/kategoribild_dvs.jpg" alt="" />
          </div>
        </div>
      </section>
    </TransitionGroup>
    <Transition name="slide-fade">
      <div v-if="showCookieBanner" id="cookie-banner">
        <div class="overlay"></div>
        <div class="cookie-banner-content">
          <img src="/assets/categories/cookies.jpg" class="cover" alt="" />
          <img src="/assets/logos/concept_living_logo_white.svg" class="logo" alt="" />
          <div class="text">
            <h1 class="title">Welcome to concept living</h1>
            <p>We use cookies and similar technologies to offer the best user experience.</p>
            <div class="buttons">
              <button @click="showCookieBanner = false">accept</button>
              <button>read more</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
/* .panel .panel-title {
  align-items: center;
  transform: translateX(calc(-50% + calc(100vw / 14))) rotate(-90deg);
  height: calc(100vw / 7 + 3px);
  opacity: 1;
  background-color: #c1a59c;
  overflow: hidden;
  border: 0;
}

.panel .panel-title:hover img.cover {
  filter: grayscale(0%) saturate(100%);
  cursor: pointer;
}

.panel .panel-title h1 {
  display: flex;
  font-size: 3rem;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 4.5rem;
  width: 65%;
  height: 100%;
}

.panel:last-child .panel-title h1 {
  margin-bottom: 0rem;
} */



</style>
