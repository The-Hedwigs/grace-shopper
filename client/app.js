import React from 'react'

import {Navbar, TopNavbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <TopNavbar />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
