const {expect} = require('chai')
const db = require('../db')
const Tomatoes = require('./tomatoes')

describe('Tomatoes model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `name`,`imageUrl` and `price`', async () => {
      const tomatoesTest = await Tomatoes.create({
        name: 'Domates',
        imageUrl: 'a beatiful tomato pic',
        price: 2.5
      })

      expect(tomatoesTest.name).to.equal('Domates')
      expect(tomatoesTest.imageUrl).to.equal('a beatiful tomato pic')

      expect(tomatoesTest.price).to.equal('2.50')
    })

    it('has a `name`,`default image` and `default price`', async () => {
      const tomatoesTest = await Tomatoes.create({
        name: 'Domates'
      })

      expect(tomatoesTest.name).to.equal('Domates')
      expect(tomatoesTest.imageUrl).to.equal('some image')
      expect(tomatoesTest.price).to.equal('0.00')
    })
  })
})
