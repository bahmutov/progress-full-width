/*! progress-full-width - v0.0.3 - 2013-07-01 */
;(function (window) {
  var bars = []
  var api = {}

  function totalHeight () {
    var sum = 0
    bars.forEach(function (bar) {
      sum += bar.height
    })
    return sum
  }

  api.init = function init (opts) {
    console.assert(typeof document === 'object', 'missing document')

    var options = opts || {}
    options.id = options.id || 'bar'
    options.color = options.color || '#333333'
    options.height = options.height || 5

    var element = document.createElement('div')
    element.setAttribute('id', options.id)
    var style = element.style
    style.position = 'absolute'
    style.width = '0'
    style.height = options.height + 'px'
    style.left = '0'

    if (options.bottom) {
      style.bottom = '0'
      bars.forEach(function (eachBar) {
        eachBar.move(options.height)
      })
    } else {
      style.bottom = totalHeight() + 'px'
    }

    style.backgroundColor = options.color
    element.classList.add('progressFullWidth')
    document.body.appendChild(element)

    var bar = {
      _element: element,
      height: options.height,
      progress: function (percent) {
        if (percent < 0 || percent > 100) {
          throw new Error('Invalid progress percent ' + percent)
        }
        var w = window.innerWidth
        var barWidth = w * (percent / 100)
        element.style.width = barWidth + 'px'
      },
      remove: function () {
        document.body.removeChild(this._element)
        bars = bars.filter(function (item) {
          return item !== this
        }, this)
      },
      move: function (pixels) {
        this._element.style.bottom = parseInt(this._element.style.bottom, 10) + pixels + 'px'
      },

      _elapsed: function () {
        if (!this.started) {
          throw new Error('Cannot get started time')
        }
        var elapsed = new Date() - this.started
        var elapsedSeconds = elapsed / 1000
        return elapsedSeconds
      },

      timer: function (durationSeconds, interval) {
        if (durationSeconds < 10) {
          throw new Error('Invalid duration ' + durationSeconds + ' should be seconds')
        }
        if (!interval) {
          interval = 100
        }
        if (this._timer) {
          clearInterval(this._timer)
        }
        var bar = this
        bar.started = new Date()
        bar.duration = durationSeconds
        bar._timer = setInterval(function () {
          var elapsedSeconds = bar._elapsed()
          var elapsedPercent = elapsedSeconds / bar.duration * 100
          if (elapsedPercent >= 100) {
            clearInterval(bar.timer)
            elapsedPercent = 100
          }
          bar.progress(elapsedPercent)
        }, interval)
      },
      pause: function () {
        if (this._timer) {
          clearInterval(this._timer)
          // console.log(this)
          this.duration = this.duration - this._elapsed()
          delete this.started
          delete this._timer
        } else {
          console.log('timer has already been paused')
        }
      },
      resume: function () {
        if (this._timer) {
          console.log('timer is already running')
          return
        }
        // console.log('resuming with duration', this.duration)
        if (this.duration > 10) {
          this.timer(this.duration)
        }
      }
    }
    if (options.progress || options.value) {
      bar.progress(options.progress || options.value)
    }
    if (options.timer || options.duration) {
      bar.timer(options.timer || options.duration)
    }
    bars.push(bar)

    return bar
  }

  function identity (item) { return item }

  api.remove = function remove () {
    var items = bars.map(identity)
    items.forEach(function (bar) {
      bar.remove()
    })
  }

  api.version = '1.0.0'

  ;(function registerApi (theApi, name) {
    if (typeof window === 'object') {
      window[name] = api
    }
    if (typeof global === 'object') {
      global[name] = api
    }
  }(api, 'progressBars'))
}(this))
