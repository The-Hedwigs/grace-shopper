import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {setOrderThunk} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar sticky-top navbar-light bg-light" style={{height: 70}}>
    <div className="container justify-content-center">
      <h1 className="text-center text-uppercase font-weight-bold">
        T🍅-ma-t🍅 Or Not T🍎-ma-t🍎?
      </h1>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async handleClick() {
      await dispatch(logout())
      await dispatch(setOrderThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
