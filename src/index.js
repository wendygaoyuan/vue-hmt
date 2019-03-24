import trackEvent from './directives/track-event'
import trackPageview from './directives/track-pageview'

const methods = [
  'trackPageview',
  'trackEvent'
]

const hmt = {
  _cache: [],

  _push(...args) {
    this.debug(args)
    if (window._hmt) {
      window._hmt.push(...args)
    } else {
      this._cache.push(...args)
    }
  },

  _createMethod(method) {
    return (...args) => {
      this._push([`_${method}`, ...args])
    }
  },

  _appendScript(options, callback) {
    const hmtScript = document.createElement('script')
    hmtScript.innerHTML = `var _hmt = _hmt || []; `

    if (typeof options.autoPageview === 'boolean' && !options.autoPageview) {
      hmtScript.innerHTML += `_hmt.push(['_setAutoPageview', false]);`
    }
    document.head.appendChild(hmtScript)

    const srcScript = document.createElement('script')
    const src = `https://hm.baidu.com/hm.js?` + options.siteId
    srcScript.src = src
    // IE
    if (srcScript.readyState) {
      srcScript.onreadystatechange = () => {
        if (srcScript.readyState === 'loaded' || srcScript.readyState === 'complete') {
          srcScript.onreadystatechange = null
          callback()
        }
      }
    } else { // others
      srcScript.onload = () => {
        callback()
      }
    }
    document.head.appendChild(srcScript)
  },

  debug() {},

  install(Vue, {
    options,
    router
  }) {
    if (typeof options !== 'object') {
      return console.error(' Invalid options ')
    }

    if (!options.siteId) {
      return console.error(' Invalid siteId ')
    }

    if (typeof options.debug === 'boolean' && options.debug) {
      this.debug = console.log
    } else {
      this.debug = () => {}
    }

    if (router) {
      router.beforeEach((to, from, next) => {
        if (to.path) {
          const basePath = router.mode === 'hash' ? '/#' : ''
          this.trackPageview(basePath + to.fullPath)
        }
        next()
      })
    }

    this._appendScript(options, () => {
      if (window._hmt) {
        this._cache.forEach((cache) => {
          window._hmt.push(cache)
        })
        this._cache = []
      } else {
        return console.error('Oops~ loading statistics script failed, please check siteId')
      }
    })

    // add prototype
    Vue.prototype.$hmt = Vue.$hmt = this
    // add directive
    Vue.directive('track-pageview', trackPageview)
    Vue.directive('track-event', trackEvent)
  }
}

methods.forEach((method) => (hmt[method] = hmt._createMethod(method)))

export default hmt