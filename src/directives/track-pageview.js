import hmt from '../index'
export default {
  bind(el, binding, vnode) {
    let ev = binding.arg
    let args = ''

    if (typeof binding.value === 'string' && binding.value !== '') {
      args = binding.value.trim()
      if (args.indexOf('/') !== 0) {
        return console.error(' please check v-track-pageview ')
      }

      ev = typeof ev === 'string' ? ev : 'click'
      // add listener
      el.addEventListener(ev, () => hmt.trackPageview(args), false)
    } else {
      return false
    }
  }
}