import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const SUB_QUANTITY = 'ADD_QUANTITY'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
// const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY'

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

const subQuantity = orderData => ({
  type: SUB_QUANTITY,
  orderData
})

const submitOrder = orderData => ({
  type: SUBMIT_ORDER,
  orderData
})
/**
 * THUNK CREATORS
 */

export const getOrderThunk = () => async dispatch => {
  try {
    //thunk pulls data of current cart
    const {data} = await axios.get(`/api/orders/current`)
    // console.log('cart store / getOrderThunk / data:', data)
    dispatch(getOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const subQuantThunk = id => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders/current', {id})
    console.log('cart store / addQuantThunk / data:', data)
    dispatch(subQuantity(data))
  } catch (err) {
    console.error(err)
  }
}

export const submitOrderThunk = info => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/checkout', info)
    dispatch(submitOrder(data))
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
        orderItems: action.orderData.tomatoes,
        orderInfo: action.orderData
      }
    case SUB_QUANTITY:
      console.log(action.orderData)
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
