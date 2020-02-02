import AdaptiveCards from './components/AdaptiveCards.vue'

export default {
  install (Vue) {
    Vue.component('adaptive-cards', AdaptiveCards)
  }
}

export { AdaptiveCards }
