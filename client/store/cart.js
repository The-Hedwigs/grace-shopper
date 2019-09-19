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
const getOrder = (orderItems, orderInfo) => ({
  type: GET_ORDER,
  orderItems,
  orderInfo
})

/**
 * THUNK CREATORS
 */

export const getOrderThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
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
      return {
        ...cartState,
        orderItems: action.orderItems,
        orderInfo: action.orderInfo
      }
    default:
      return cartState
  }
}

//make sure you import your reducer into the index.js file
