import hmt from '../index'
export default {
  bind(el, binding, vnode) {
    let ev = binding.arg
    let args = []

    if (typeof binding.value === 'string' && binding.value !== '') {
      args = binding.value.split(',')

      if (args.length < 2 || args.length > 4) {
        return console.error(' please check v-track-event ')
      }

      args.forEach((arg, i) => (args[i] = arg.trim()))

      ev = typeof ev === 'string' ? ev : 'click'
      // add listener
      el.addEventListener(ev, () => hmt.trackEvent(...args), false)
    } else {
      return false
    }
  }
}