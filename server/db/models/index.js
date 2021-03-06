const User = require('./user')
const Tomatoes = require('./tomatoes')
const Order = require('./order')
const TomOrder = require('./tomorder')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//associations
User.hasMany(Order)
Order.belongsTo(User)

Tomatoes.belongsToMany(Order, {through: TomOrder})
Order.belongsToMany(Tomatoes, {through: TomOrder})

TomOrder.belongsTo(Order)
TomOrder.belongsTo(Tomatoes)

module.exports = {
  User,
  Tomatoes,
  Order
}
