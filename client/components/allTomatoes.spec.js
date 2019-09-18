import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllTomatoes} from './allTomatoes'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getAllTomatoesThunk} from '../store/tomato'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllTomatoes', () => {
  let allTomates
  let store
  let mockAxios

  const initialTomatoState = {
    tomatoes: [],
    singleTomato: {}
  }
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialTomatoState)
    allTomates = shallow(<AllTomatoes getAllTomatoes={getAllTomatoesThunk} />)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('renders the header', () => {
    expect(allTomates.find('h1').text()).to.be.equal('Our Tomatoes')
  })
})
