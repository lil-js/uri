var uri = require('../uri')
var expect = require('chai').expect

describe('uri', function () {

  describe('API', function () {
    it('should expose the http constructor', function () {
      expect(uri).to.be.a('function')
    })

    it('should expose the VERSION property', function () {
      expect(uri.VERSION).to.be.a('string')
    })
  })

  describe('parser', function () {
    describe('protocol + host', function () {
      var url = 'http://www.google.com/'

      it('should match the protocol', function () {
        expect(uri(url).protocol()).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host()).to.be.equal('www.google.com')
      })
    })

    describe('host + port', function () {
      var url = 'http://www.google.com:8080'

      it('should match the protocol', function () {
        expect(uri(url).protocol()).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host()).to.be.equal('www.google.com:8080')
      })

      it('should match the hostname', function () {
        expect(uri(url).hostname()).to.be.equal('www.google.com')
      })

      it('should match the port', function () {
        expect(uri(url).port()).to.be.equal('8080')
      })
    })

    describe('host + path', function () {
      var url = 'http://www.google.com/some-awesome/nested/path'

      it('should match the protocol', function () {
        expect(uri(url).protocol()).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host()).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path()).to.be.equal('/some-awesome/nested/path')
      })
    })

    describe('host + path + search', function () {
      var url = 'http://www.google.com/some-awesome?name=John&surname=Norris'

      it('should match the protocol', function () {
        expect(uri(url).protocol()).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host()).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path()).to.be.equal('/some-awesome')
      })

      it('should match the search params', function () {
        expect(uri(url).search()).to.be.equal('name=John&surname=Norris')
      })

      it('should match the query map', function () {
        expect(uri(url).query()).to.be.deep.equal({
          name: 'John', surname: 'Norris'
        })
      })
    })

    describe('host + path + search + hash', function () {
      var url = 'http://www.google.com/some-awesome?name=John&surname=Norris#type=actor'

      it('should match the protocol', function () {
        expect(uri(url).protocol()).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host()).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path()).to.be.equal('/some-awesome')
      })

      it('should match the search params', function () {
        expect(uri(url).search()).to.be.equal('name=John&surname=Norris')
      })

      it('should match the hash', function () {
        expect(uri(url).hash()).to.be.equal('type=actor')
      })
    })

    describe('partial URI', function () {
      it('should extract the hostname', function () {
        expect(uri('www.google.com:8080').hostname()).to.be.equal('www.google.com')
      })

      it('should extract the host', function () {
        expect(uri('www.google.com:8080').host()).to.be.equal('www.google.com:8080')
      })

      it('should extract the port', function () {
        expect(uri('www.google.com:8080').port()).to.be.equal('8080')
      })

      it('should extract the path', function () {
        expect(uri('/search/user').path()).to.be.equal('/search/user')
      })

      it('should extract the host and path', function () {
        expect(uri('www.google.com/search/user').host()).to.be.equal('www.google.com')
        expect(uri('www.google.com/search/user').path()).to.be.equal('/search/user')
      })

      it('should extract the search params', function () {
        expect(uri('?name=John&age=30').query()).to.be.deep.equal({
          name: 'John', age: '30'
        })
      })

      it('should extract the hash params', function () {
        expect(uri('#name=John&age=30').hash()).to.be.equal('name=John&age=30')
      })

      it('should extract the hash params and search params', function () {
        expect(uri('?query=value#name=John&age=30').hash()).to.be.equal('name=John&age=30')
      })
    })

    describe('duplicated query params keys', function() {
      it('should map multiple query params', function () {
        expect(uri('google.com:8080/?name=John&filter=30&filter=a').query()).to.be.deep.equal({
          name: 'John', filter: ['30', 'a']
        })
      })
    })
  })

  describe('builder', function () {
    var url

    describe('protocol + host', function () {
      before(function () {
        url = uri()
      })

      it('should define the protocol', function () {
        expect(url.protocol('https').protocol()).to.be.equal('https')
      })

      it('should define the host', function () {
        expect(url.host('google.com').host()).to.be.equal('google.com')
      })

      it('should match a valid hostname', function () {
        expect(url.hostname()).to.be.equal('google.com')
      })

      it('should build the URI', function () {
        expect(url.build()).to.be.equal('https://google.com')
      })
    })

    describe('protocol + host + port', function () {
      before(function () {
        url = uri()
      })

      it('should define the protocol', function () {
        expect(url.protocol('https').protocol()).to.be.equal('https')
      })

      it('should define the host', function () {
        expect(url.host('google.com:8080').host()).to.be.equal('google.com:8080')
      })

      it('should match a valid hostname', function () {
        expect(url.hostname()).to.be.equal('google.com')
      })

      it('should match a valid port', function () {
        expect(url.port()).to.be.equal('8080')
      })

      it('should build the URI', function () {
        expect(url.build()).to.be.equal('https://google.com:8080')
      })
    })

    describe('host + path', function () {
      before(function () {
        url = uri()
      })

      it('should define the protocol', function () {
        expect(url.protocol('https').protocol()).to.be.equal('https')
      })

      it('should define the host', function () {
        expect(url.host('google.com').host()).to.be.equal('google.com')
      })

      it('should match a valid hostname', function () {
        expect(url.hostname()).to.be.equal('google.com')
      })

      it('should define a valid path', function () {
        expect(url.path('/search/value').path()).to.be.equal('/search/value')
      })

      it('should build the URI', function () {
        expect(url.build()).to.be.equal('https://google.com/search/value')
      })
    })

    describe('host + path + search', function () {
      before(function () {
        url = uri()
      })

      it('should define the protocol', function () {
        expect(url.protocol('https').protocol()).to.be.equal('https')
      })

      it('should define the host', function () {
        expect(url.host('google.com').host()).to.be.equal('google.com')
      })

      it('should match a valid hostname', function () {
        expect(url.hostname()).to.be.equal('google.com')
      })

      it('should define a valid path', function () {
        expect(url.path('/search/value').path()).to.be.equal('/search/value')
      })

      it('should match the search params', function () {
        expect(url.search('name=John&surname=Norris').search()).to.be.equal('name=John&surname=Norris')
      })

      it('should match the query map', function () {
        expect(url.query()).to.be.deep.equal({
          name: 'John', surname: 'Norris'
        })
      })

      it('should build the query map', function () {
        expect(url.query({
          name: 'John', surname: 'Norris'
        }).search()).to.be.equal('name=John&surname=Norris')
      })

      it('should build the URI', function () {
        expect(url.build()).to.be.equal('https://google.com/search/value?name=John&surname=Norris')
      })
    })

    describe('host + path + search + hash', function () {
      before(function () {
        url = uri()
      })

      it('should build the protocol', function () {
        expect(url.protocol('http').protocol()).to.be.equal('http')
      })

      it('should build the host', function () {
        expect(url.host('www.google.com:8080').host()).to.be.equal('www.google.com:8080')
      })

      it('should build the path', function () {
        expect(url.path('/some-awesome').path()).to.be.equal('/some-awesome')
      })

      it('should build the search params', function () {
        expect(url.query({ name: 'Chuck', surname: 'Norris' }).search()).to.be.equal('name=Chuck&surname=Norris')
      })

      it('should build the hash', function () {
        expect(url.hash('type=actor').hash()).to.be.equal('type=actor')
      })

      it('should build the URI', function () {
        expect(url.build()).to.be.equal('http://www.google.com:8080/some-awesome?name=Chuck&surname=Norris#type=actor')
      })
    })

    describe('duplicated search query keys', function () {
      before(function () {
        url = uri()
      })

      it('should define duplicated query keys', function () {
        expect(url.query({ filter: [ 3, 'Chuck' ]}).search()).to.be.equal('filter=3&filter=Chuck')
      })

      it('should build the URI', function () {
        url.host('www.google.com')
        expect(url.build()).to.be.equal('www.google.com/?filter=3&filter=Chuck')
      })
    })
  })
})
