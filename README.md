# [lil](http://lil-js.github.io)'-uri [![Build Status](https://api.travis-ci.org/lil-js/uri.svg?branch=master)][travis]

Tiny URI parser with semantic API

<table>
<tr>
<td><b>Name</b></td><td>uri</td>
</tr>
<tr>
<td><b>Version</b></td><td>0.1.0</td>
</tr>
<tr>
<td><b>Size</b></td><td>3 KB / 1 KB (gzipped)</td>
</tr>
<tr>
<td><b>Environment</b></td><td>Node, Browser</td>
</tr>
</table>

## Features

- URI parsing
- URI builder
- RFC 3986 compliant
- Full and partial URI support
- Automatic query mapping values
- Support for special characters decoding

## Installation

#### Node.js
```bash
npm install lil-uri
```

#### Browser
Via [Bower](http://bower.io)
```bash
bower install lil-uri
```
Via [Component](http://component.io/)
```bash
component install lil-js/uri
```
Or loading the script remotely
```html
<script src="//cdn.rawgit.com/lil-js/uri/0.1.0/uri.js"></script>
```

### Environments

Cross-browser support guaranteed running tests in [BrowserStack](http://browserstack.com/)

- Node.js
- Chrome >= 5
- Firefox >= 3
- Safari >= 5
- Opera >= 10
- IE >= 9

### Usage

You could fetch de module via `require()` if it's available.
Otherwise, global fallback will be used, exposed via `lil.uri`
```js
var uri = require('lil-uri')
```

Parser
```js
var url = uri('http://user:pass@example.com:8080/bar/foo.xml?foo=bar&hello=world&#frament=1')
url.protocol() // -> http
url.host() // -> example.com:8080
url.hostname() // -> example.com
url.port() // -> 8080
url.auth() // -> { user: 'user', password: 'pass' }
url.user() // -> user
url.password() // -> pass
url.path() // -> /bar/foo.xml
url.search() // -> foo=bar&hello=world
url.query() // -> { foo: 'bar', hello: 'world' }
url.frament() // -> fragment=1
```

Builder
```js
var url = uri('http://user:pass@example.com:8080/bar/foo.xml?foo=bar&hello=world&#frament=1')
url.protocol() // -> http
url.host() // -> example.com:8080
url.hostname() // -> example.com
url.port() // -> 8080
url.auth() // -> { user: 'user', password: 'pass' }
url.user() // -> user
url.password() // -> pass
url.path() // -> /bar/foo.xml
url.search() // -> foo=bar&hello=world
url.query() // -> { foo: 'bar', hello: 'world' }
url.frament() // -> fragment=1
```

## API

#### uri.

#### uri.type.VERSION


## Contributing

Wanna help? Cool! It will be appreciated :)

You must add new test cases for any new feature or refactor you do,
always following the same design/code patterns that already exist

### Development

Only [node.js](http://nodejs.org) is required for development

Clone the repository
```bash
$ git clone https://github.com/lil-js/uri.git && cd uri
```

Install dependencies
```bash
$ npm install
```

Generate browser bundle source
```bash
$ make browser
```

Run tests
```bash
$ make test
```

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/lil-js/uri
