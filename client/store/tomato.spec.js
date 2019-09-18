import {expect} from 'chai'
import {getAllTomatoesThunk} from './tomato'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialTomatoState = {
    tomatoes: [],
    singleTomato: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialTomatoState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllTomatoesThunk ', () => {
    it('eventually dispatches the GET ALL TOMATOES action', async () => {
      const fakeTomatoes = {tomatoes: []}
      mockAxios.onGet('/api/tomatoes/').replyOnce(200, fakeTomatoes)
      await store.dispatch(getAllTomatoesThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_TOMATOES')
      expect(actions[0].tomatoes).to.be.deep.equal(fakeTomatoes)
    })
  })
})
