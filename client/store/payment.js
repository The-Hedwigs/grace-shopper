import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TOKEN = 'GET_TOKEN'
const SEND_NONCE = 'SEND_NONCE'

/**
 * INITIAL STATE
 */
const initialPayState = {
  clientToken: ''
}

/**
 * ACTION CREATORS
 */
const getToken = token => ({
  type: GET_TOKEN,
  token
})

const sendNonce = () => ({
  type: SEND_NONCE
})
/**
 * THUNK CREATORS
 */

export const getTokenThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/braintree/v1/getToken')
    dispatch(getToken(data.clientToken))
  } catch (err) {
    console.error(err)
  }
}

export const sendNonceThunk = instance => async dispatch => {
  try {
    const {nonce} = await instance.requestPaymentMethod()
    const response = await axios.post('/v1/sandbox', nonce)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function payReducer(payState = initialPayState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {...payState, clientToken: action.token}
    default:
      return payState
  }
}
