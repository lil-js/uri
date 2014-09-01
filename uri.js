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

  function uriParts(parts) {
    var auth = (parts[3] || '').split(':')
    return {
      uri: parts[0],
      protocol: parts[1],
      host: parts[2].replace(/(.*\@)/, ''),
      auth: parts[3],
      user: auth[0],
      password: auth[1],
      hostname: parts[4],
      port: parts[5],
      path: parts[6],
      query: parts[7],
      fragment: parts[8]
    }
  }

  function uriParser(uri) {
    var parts = (uri || '').match(REGEX)
    return uriParts(parts || [])
  }

  function URI(uri) {
    this.parts = {}
  }

  URI.prototype.host = function (host) {
    this.parts.host = host
    return this
  }

  URI.prototype.auth = function (auth) {
    this.parts.auth = auth
    return this
  }

  URI.prototype.user = function (user) {
    this.parts.user = user
    return this
  }

  URI.prototype.build = URI.prototype.get = function () {
    return this.parts
  }

  function uri(uri) {
    if (uri) {
      return uriParser(uri)
    } else {
      return new URI()
    }
  }

  uri.VERSION = VERSION

  exports.uri = uri
}))
