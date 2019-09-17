import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_TOMATOES = 'GET_ALL_TOMATOES'

/**
 * INITIAL STATE
 */
const productList = {}

/**
 * ACTION CREATORS
 */
const getAllTomatoes = tomatoes => ({type: GET_ALL_TOMATOES, tomatoes})

/**
 * THUNK CREATORS
 */
export const getAllTomatoesThunk = () => async dispatch => {
  try {
    const tomatoes = await axios.get('/api/tomatoes/')
    dispatch(getAllTomatoes(tomatoes))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function tomatoReducer(state = productList, action) {
  switch (action.type) {
    case GET_ALL_TOMATOES:
      return action.tomatoes
    default:
      return state
  }
}

//make sure you import your reducer into the index.js file
