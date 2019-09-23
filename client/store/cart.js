import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const ADD_QUANTITY = 'ADD_QUANTITY'
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY'

/**
 * INITIAL STATE
 */
const initialCartState = {
  orderItems: [],
  orderInfo: {}
}

/**
 * ACTION CREATORS
 */
const getOrder = orderData => ({
  type: GET_ORDER,
  orderData
})

/**
 * THUNK CREATORS
 */

export const getOrderThunk = () => async dispatch => {
  try {
    //thunk pulls data of current cart
    const {data} = await axios.get(`/api/orders/current`)
    console.log('cart store / getOrderThunk / data:', data)
    dispatch(getOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const addQuantThunk = id => async dispatch => {
  try {
    console.log('to do')
  } catch (err) {
    console.error(err)
  }
}

export const subtractQuantThunk = id => async dispatch => {
  try {
    console.log('to do')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function cartReducer(cartState = initialCartState, action) {
  switch (action.type) {
    case GET_ORDER:
      let total = 0
      console.log(total)
      action.orderData.tomatoes.forEach(tomato => {
        total = total + tomato.price * tomato.tomorder.quantity
        console.log(
          'total:',
          total,
          ' price:',
          tomato.price,
          ' quant:',
          tomato.tomorder.quantity
        )
      })
      console.log(total)
      action.orderData.total = total.toFixed(2)
      return {
        ...cartState,
        orderItems: action.orderData.tomatoes,
        orderInfo: action.orderData
      }
    default:
      return cartState
  }
}

//make sure you import your reducer into the index.js file
