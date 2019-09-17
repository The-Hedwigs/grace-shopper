import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_TOMATOES = 'GET_ALL_TOMATOES'

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
