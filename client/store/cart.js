import axios from 'axios'
import cart from '../components/cart'
// import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ORDER = 'SET_ORDER'
const GET_ORDER = 'GET_ORDER'
const SUB_QUANTITY = 'ADD_QUANTITY'

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
const setOrder = orderData => ({
  type: SET_ORDER,
  orderData
})

const getOrder = orderData => ({
  type: GET_ORDER,
  orderData
})

const subQuantity = orderData => ({
  type: SUB_QUANTITY,
  orderData
})

/**
 * THUNK CREATORS
 */

export const setOrderThunk = () => async dispatch => {
  try {
    console.log('currently in set order thunk')
    const {data} = await axios.post('/api/orders/current')
    dispatch(setOrder(data))
  } catch (error) {
    console.error(err)
  }
}

export const getOrderThunk = () => async dispatch => {
  try {
    //thunk pulls data of current cart
    const {data} = await axios.get(`/api/orders/current`)
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

/**
 * REDUCER
 */
export default function cartReducer(cartState = initialCartState, action) {
  switch (action.type) {
    case SET_ORDER:
      console.log('cart//store//setOrder data: ', action.orderData)
      return {
        ...cartState,
        orderItems: [],
        orderInfo: action.orderData
      }
    case GET_ORDER:
      return {
        ...cartState,
        orderItems: action.orderData.tomatoes,
        orderInfo: action.orderData
      }
    case SUB_QUANTITY:
      // console.log(action.orderData)
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
