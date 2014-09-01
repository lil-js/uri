describe('type', function () {

  it('should expose the http constructor', function () {
    expect(lil.uri).to.be.a('function')
  })

  it('should expose the VERSION property', function () {
    expect(lil.uri.VERSION).to.be.a('string')
  })
})
