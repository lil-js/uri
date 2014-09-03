/*! lil-uri - v0.1 - MIT License - https://github.com/lil-js/uri */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory)
  } else if (typeof exports === 'object') {
    factory(exports)
    if (typeof module === 'object' && module !== null) {
      module.exports = exports = exports.uri
    }
  } else {
    factory((root.lil = root.lil || {}))
  }
}(this, function (exports) {
  var VERSION = '0.1.0'
  var REGEX = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i

  function mapSearchParams(search) {
    var map = {}
    if (search) {
      search.split('&').forEach(function (values) {
        if (values) {
          values = values.split('=')
          map[values[0]] = values[1]
        }
      })
      return map
    }
  }

  function uriParts(parts) {
    var auth = (parts[3] || '').split(':')
    var host = auth.length ? (parts[2] || '').replace(/(.*\@)/, '') : parts[2]
    return {
      uri: parts[0],
      protocol: parts[1],
      host: host,
      hostname: parts[4],
      port: parts[5],
      auth: parts[3],
      user: auth[0],
      password: auth[1],
      path: parts[6],
      search: parts[7],
      query: mapSearchParams(parts[7]),
      fragment: parts[8]
    }
  }

  function Parser(uri) {
    var parts = decodeURIComponent(uri || '').match(REGEX)
    return uriParts(parts || [])
  }

  function Builder(uri) {
    this.parts = {}
  }

  Builder.prototype.host = function (host) {
    this.parts.host = host
    return this
  }

  Builder.prototype.auth = function (auth) {
    this.parts.auth = auth
    return this
  }

  Builder.prototype.user = function (user) {
    this.parts.user = user
    return this
  }

  Builder.prototype.build = Builder.prototype.get = function () {
    return this.parts
  }

  function uri(uri) {
    if (uri) {
      return Parser(uri)
    } else {
      return Builder()
    }
  }

  uri.VERSION = VERSION

  exports.uri = uri
}))
