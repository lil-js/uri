describe('type', function () {

  it('should expose the http constructor', function () {
    expect(lil.type).to.be.a('function')
  })

  it('should expose the VERSION property', function () {
    expect(lil.type.VERSION).to.be.a('string')
  })
})
