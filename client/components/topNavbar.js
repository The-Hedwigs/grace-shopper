import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const TopNavbar = ({handleClick, isLoggedIn}) => (
  <nav
    className="navbar navbar-expand-md navbar-dark bg-dark mt-0 mb-0 pt-0 pb-0"
    style={{height: 40}}
  >
    <h6 className="nav-item text-light ">
      Free shipping if you have the spicy boy in your cart!
    </h6>
    <div
      className="collapse navbar-collapse justify-content-end h-100"
      id="navbarNav"
    >
      <ul className="navbar-nav h-100">
        {isLoggedIn ? (
          <li className="nav-item h-100">
            <Link
              className="nav-link h-100 mt-0 mb-0 pt-0 pb-0"
              to="/updatepreferences"
            >
              {' '}
              My Account{' '}
            </Link>
          </li>
        ) : null}
        {isLoggedIn ? (
          <li className="nav-item h-100">
            <a
              className="text-muted h-100 mt-0 mb-0 pt-0 pb-0"
              href="#"
              onClick={() => handleClick()}
            >
              Logout
            </a>
          </li>
        ) : null}
        {!isLoggedIn ? (
          <li className="nav-item h-100">
            <Link
              className="nav-link text-muted h-100 mt-0 mb-0 pt-0 pb-0"
              to="/login"
            >
              Login
            </Link>
          </li>
        ) : null}
        {!isLoggedIn ? (
          <li className="nav-item h-100">
            <Link
              className="nav-link text-muted h-100 mt-0 mb-0 pt-0 pb-0"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  </nav>
)
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(TopNavbar)

/**
 * PROP TYPES
 */
TopNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
