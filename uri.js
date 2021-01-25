/*! lil-uri - v0.2.0 - MIT License - https://github.com/lil-js/uri */
;(function (root, factory) {
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
  'use strict'

  var VERSION = '0.2.2'
  var REGEX = /^(?:([^:\/?#]+):\/\/)?((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?)?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i

  function isStr (o) {
    return typeof o === 'string'
  }
  
  function decode (uri) {
	  try{
		  return decodeURIComponent(uri)
	  } catch (e) {
		  return unescape(uri)
	  }
  }

  function mapSearchParams(search) {
    var map = {}
    if (typeof search === 'string') {
      search.split('&').forEach(function (values) {
        values = values.split('=')
        if (map.hasOwnProperty(values[0])) {
          map[values[0]] = Array.isArray(map[values[0]]) ? map[values[0]] : [ map[values[0]] ]
          map[values[0]].push(values[1])
        } else {
          map[values[0]] = values[1]
        }
      })
      return map
    }
  }

  function accessor(type) {
    return function (value) {
      if (value) {
        this.parts[type] = isStr(value) ? decode(value) : value
        return this
      }
      this.parts = this.parse(this.build())
      return this.parts[type]
    }
  }

  function URI(uri) {
    this.uri = uri || null
    if (isStr(uri) && uri.length) {
      this.parts = this.parse(uri)
    } else {
      this.parts = {}
    }
  }

  URI.prototype.parse = function (uri) {
    var parts = decode(uri || '').match(REGEX)
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
      hash: parts[8]
    }
  }

  URI.prototype.protocol = function (host) {
    return accessor('protocol').call(this, host)
  }

  URI.prototype.host = function (host) {
    return accessor('host').call(this, host)
  }

  URI.prototype.hostname = function (hostname) {
    return accessor('hostname').call(this, hostname)
  }

  URI.prototype.port = function (port) {
    return accessor('port').call(this, port)
  }

  URI.prototype.auth = function (auth) {
    return accessor('host').call(this, auth)
  }

  URI.prototype.user = function (user) {
    return accessor('user').call(this, user)
  }

  URI.prototype.password = function (password) {
    return accessor('password').call(this, password)
  }

  URI.prototype.path = function (path) {
    return accessor('path').call(this, path)
  }

  URI.prototype.search = function (search) {
    return accessor('search').call(this, search)
  }

  URI.prototype.query = function (query) {
    return query && typeof query === 'object' ? accessor('query').call(this, query) : this.parts.query
  }

  URI.prototype.hash = function (hash) {
    return accessor('hash').call(this, hash)
  }

  URI.prototype.get = function (value) {
    return this.parts[value] || ''
  }

  URI.prototype.build = URI.prototype.toString = URI.prototype.valueOf = function () {
    var p = this.parts, buf = []

    if (p.protocol) buf.push(p.protocol + '://')
    if (p.auth) buf.push(p.auth + '@')
    else if (p.user) buf.push(p.user + (p.password ? ':' + p.password : '') + '@')

    if (p.host) {
      buf.push(p.host)
    } else {
      if (p.hostname) buf.push(p.hostname)
      if (p.port) buf.push(':' + p.port)
    }

    if (p.path) buf.push(p.path)
    if (p.query && typeof p.query === 'object') {
      if (!p.path) buf.push('/')
      buf.push('?' + (Object.keys(p.query).map(function (name) {
        if (Array.isArray(p.query[name])) {
          return p.query[name].map(function (value) {
            return name + (value ? '=' + value : '')
          }).join('&')
        } else {
          return name + (p.query[name] != null ? '=' + p.query[name] : '')
        }
      }).join('&')))
    } else if (p.search) {
      buf.push('?' + p.search)
    }

    if (p.hash) {
      if (!p.path) buf.push('/')
      buf.push('#' + p.hash)
    }

    return this.url = buf.filter(function (part) { return isStr(part) }).join('')
  }

  function uri(uri) {
    return new URI(uri)
  }

  function isURL(uri) {
    return typeof uri === 'string' && REGEX.test(uri)
  }

  uri.VERSION = VERSION
  uri.is = uri.isURL = isURL
  uri.URI = URI

  return exports.uri = uri
}));
