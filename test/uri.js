describe('uri', function () {

  describe('API', function () {
    it('should expose the http constructor', function () {
      expect(lil.uri).to.be.a('function')
    })

    it('should expose the VERSION property', function () {
      expect(lil.uri.VERSION).to.be.a('string')
    })
  })

  describe('parser', function () {

    describe('protocol + host', function () {
      var url = 'http://www.google.com/'

      it('should match the protocol', function () {
        expect(lil.uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(lil.uri(url).host).to.be.equal('www.google.com')
      })
    })

    describe('host + port', function () {
      var url = 'http://www.google.com:8080'

      it('should match the protocol', function () {
        expect(lil.uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(lil.uri(url).host).to.be.equal('www.google.com:8080')
      })

      it('should match the hostname', function () {
        expect(lil.uri(url).hostname).to.be.equal('www.google.com')
      })

      it('should match the port', function () {
        expect(lil.uri(url).port).to.be.equal('8080')
      })
    })

    describe('host + path', function () {
      var url = 'http://www.google.com/some-awesome/nested/path'

      it('should match the protocol', function () {
        expect(lil.uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(lil.uri(url).host).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(lil.uri(url).path).to.be.equal('/some-awesome/nested/path')
      })
    })

    describe('host + path + search', function () {
      var url = 'http://www.google.com/some-awesome?name=John&surname=Norris'

      it('should match the protocol', function () {
        expect(lil.uri(url).protocol).to.be.equal('http')
      })

      it('should match the host', function () {
        expect(lil.uri(url).host).to.be.equal('www.google.com')
      })

      it('should match the path', function () {
        expect(lil.uri(url).path).to.be.equal('/some-awesome')
      })

      it('should match the search params', function () {
        expect(lil.uri(url).search).to.be.equal('name=John&surname=Norris')
      })

      it('should match the query map', function () {
        expect(lil.uri(url).query).to.be.deep.equal({
          name: 'John', surname: 'Norris'
        })
      })
    })

  })
})
