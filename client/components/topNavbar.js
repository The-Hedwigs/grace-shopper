import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const TopNavbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{height: 40}}>
    <h6 className="nav-item text-light ">
      Free shipping if you have the spicy boy in your cart!
    </h6>
    <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
      <ul className="navbar-nav ">
        {isLoggedIn ? (
          <li className="nav-item ">
            <Link className="nav-link" to="/accountSettings">
              {' '}
              My Account{' '}
            </Link>
          </li>
        ) : null}
        {isLoggedIn ? (
          <li className="nav-item">
            <a className="nav-link text-muted" href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
        ) : null}
        {!isLoggedIn ? (
          <li className="nav-item">
            <a className="nav-link" href="#">
              <Link className="nav-link text-muted" to="/login">
                Login
              </Link>
            </a>
            <a className="nav-link" href="#">
              <Link className="nav-link text-muted" to="/signup">
                Sign Up
              </Link>
            </a>
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
