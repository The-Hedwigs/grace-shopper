import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import tomato from './tomato'
import cart from './cart'
import payment from './payment'

const reducer = combineReducers({
  user: user,
  tomatoState: tomato,
  cartState: cart,
  payState: payment
})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './payment'
