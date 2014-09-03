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
        expect(uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host).to.be.equal('www.google.com')
      })
    })

    describe('host + port', function () {
      var url = 'http://www.google.com:8080'

      it('should match the protocol', function () {
        expect(uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host).to.be.equal('www.google.com:8080')
      })

      it('should match the hostname', function () {
        expect(uri(url).hostname).to.be.equal('www.google.com')
      })

      it('should match the port', function () {
        expect(uri(url).port).to.be.equal('8080')
      })
    })

    describe('host + path', function () {
      var url = 'http://www.google.com/some-awesome/nested/path'

      it('should match the protocol', function () {
        expect(uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path).to.be.equal('/some-awesome/nested/path')
      })
    })

    describe('host + path + search', function () {
      var url = 'http://www.google.com/some-awesome?name=John&surname=Norris'

      it('should match the protocol', function () {
        expect(uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path).to.be.equal('/some-awesome')
      })

      it('should match the search params', function () {
        expect(uri(url).search).to.be.equal('name=John&surname=Norris')
      })

      it('should match the query map', function () {
        expect(uri(url).query).to.be.deep.equal({
          name: 'John', surname: 'Norris'
        })
      })
    })

    describe('host + path + search + fragment', function () {
      var url = 'http://www.google.com/some-awesome?name=John&surname=Norris#type=actor'

      it('should match the protocol', function () {
        expect(uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(uri(url).host).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(uri(url).path).to.be.equal('/some-awesome')
      })

      it('should match the search params', function () {
        expect(uri(url).search).to.be.equal('name=John&surname=Norris')
      })

      it('should match the fragment', function () {
        expect(uri(url).fragment).to.be.equal('type=actor')
      })
    })

  })
})
