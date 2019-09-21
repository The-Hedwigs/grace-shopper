import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_TOMATOES = 'GET_ALL_TOMATOES'
const ADD_TOMATO = 'ADD_TOMATO'
const GET_SINGLE_TOMATO = 'GET_SINGLE_TOMATO'

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

const getSingleTomato = tomato => ({
  type: GET_SINGLE_TOMATO,
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

export const getSingleTomatoThunk = tomatoId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tomatoes/${tomatoId}`)
    dispatch(getSingleTomato(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = id => async dispatch => {
  try {
    console.log('thunk id:', id)
    const {data} = await axios.post('/api/orders', {id})
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
    case GET_SINGLE_TOMATO:
      return {...tomatoState, singleTomato: action.tomato}
    default:
      return tomatoState
  }
}

//make sure you import your reducer into the index.js file
