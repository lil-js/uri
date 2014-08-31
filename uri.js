/*! lil-uri - v0.1 - MIT License - https://github.com/lil-js/uri */
(function (global) {
  var VERSION = '0.1.0'
  var lil = global.lil || {}
  var REGEX = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i
  
  function uri() {}

  type.VERSION = VERSION

  lil.uri = uri
  if (typeof define === 'function' && define.amd) {
    define(function () { return type })
  } else {
    global.lil = lil
  }
}(this))
