import type { Directive } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const reveal: Directive<HTMLElement> = {
  getSSRProps() {
    return {}
  },
  mounted(element) {
    element.classList.add('reveal')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.unobserve(element)
        }
      }
    }, { threshold: 0.1 })

    observers.set(element, observer)
    observer.observe(element)
  },
  unmounted(element) {
    observers.get(element)?.disconnect()
    observers.delete(element)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
