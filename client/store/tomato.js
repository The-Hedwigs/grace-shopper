import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_TOMATOES = 'GET_ALL_TOMATOES'
const ADD_TOMATO = 'ADD_TOMATO'

/**
 * INITIAL STATE
 */
const initialTomatoState = {
  tomatoes: [],
  singleTomato: {}
}

/**
 * ACTION CREATORS
 */
const getAllTomatoes = tomatoes => ({type: GET_ALL_TOMATOES, tomatoes})
const addTomato = tomato => ({
  type: ADD_TOMATO,
  tomato
})

/**
 * THUNK CREATORS
 */
export const getAllTomatoesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/tomatoes/')
    dispatch(getAllTomatoes(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = id => async dispatch => {
  try {
    const session = await axios.get('/api/session')
    const user = session.userId
    let newOrder
    if (!session.orderId) {
      //check if there is a user on session
      if (user) {
        newOrder = await axios.post('/api/orders', {
          userId: user
        })
      } else {
        newOrder = await axios.post('/api/orders')
      }

      let orderId = newOrder.data.id
      await axios.put('/api/session', {
        orderId: orderId
      })
    }

    //adds tomato to tomorder
    //make sure to edit later that we need to check if tomato alreadt exists in order
    const {data} = await axios.post('/api/tomorders', {
      orderId: session.orderId,
      tomatoId: id,
      quantity: 1
    })
    dispatch(addTomato(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function tomatoReducer(
  tomatoState = initialTomatoState,
  action
) {
  switch (action.type) {
    case GET_ALL_TOMATOES:
      return {...tomatoState, tomatoes: action.tomatoes}
    default:
      return tomatoState
  }
}

//make sure you import your reducer into the index.js file
