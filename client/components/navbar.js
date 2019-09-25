import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {setOrderThunk} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav
      className="navbar sticky-top navbar-light bg-light"
      style={{height: 70}}
    >
      <div className="container justify-content-center">
        <h1 className="text-center text-uppercase font-weight-bold">
          T🍅-ma-t🍅 Or Not T🍎-ma-t🍎?
        </h1>
      </div>
    </nav>
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      style={{height: 50}}
    >
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="mx-auto order-0 w-auto">
          <ul className="navbar-nav order-md-0">
            <li className="nav-item active ">
              <Link className="nav-link  text-success " to="/tomatoes">
                🍅
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav justify-content-end">
          {isLoggedIn ? (
            <li className="nav-item">
              <a
                className="text-white margin-auto pt-0 pb-0 align-self-center"
                href="#"
                onClick={() => handleClick()}
              >
                Logout
              </a>
            </li>
          ) : null}
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link
                className="nav-link text-white margin-auto pt-0 pb-0 align-self-center"
                to="/login"
              >
                Login
              </Link>
            </li>
          ) : null}
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link
                className="nav-link text-white margin-auto pt-0 pb-0 align-self-center"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          ) : null}
        </ul>
        <div className="navbar-collapse collapse w-10 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link
                className="nav-link text-white margin-auto pt-0 pb-0 align-self-center"
                to="/cart"
              >
                {' '}
                🛒{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
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
