'use strict'

const db = require('../server/db')
const {User, Tomatoes} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const tomatoes = await Promise.all([
    Tomatoes.create({
      name: 'Spicy Boy',
      imageUrl: '123',
      price: 10.5,
      description: 'one spicy boi'
    }),
    Tomatoes.create({
      name: 'Tigerella',
      iimageUrl:
        'https://www.exotic-plants.de/auktionsbilder/Tomato_Tigerella1.jpg',
      price: 15.5,
      description: 'one feisty lady'
    }),
    Tomatoes.create({
      name: 'Mortgage Lifter',
      iimageUrl:
        'https://d1nw62gticy6e9.cloudfront.net/uploads/Mortgage_Lifter_Tomatoes.jpg',
      price: 10.5,
      description: 'one spicy girl'
    }),
    Tomatoes.create({
      name: 'Dark Galaxy',
      iimageUrl:
        'https://www.rareseeds.com/assets/1/14/dimregular/dark-galaxy-1.jpg',
      price: 20.15,
      description: 'One taste and you will be lost in space'
    }),
    Tomatoes.create({
      name: 'Lucid Gem',
      iimageUrl:
        'https://www.rareseeds.com/assets/1/14/dimregular/brad-gates-anthobicolor1.jpg',
      price: 17.12,
      description: 'Clearly the best'
    }),
    Tomatoes.create({
      name: 'Wagner Blue Green',
      iimageUrl:
        'https://www.rareseeds.com/assets/1/14/dimregular/tomato_wagner-blue-green1.jpg',
      price: 32.15,
      description: 'Wagner? Vagner? You decide'
    })
  ])
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
