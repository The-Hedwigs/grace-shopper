import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="display-6">GRACE SHOPPER</h1>
      <div className="nav-item active">
        <Link className="nav-link" to="/allTomatoes">
          All Tomatoes
        </Link>
      </div>
      <div className="nav-item active">
        <Link className="nav-link" to="/cart">
          Cart
        </Link>
      </div>
      <div className="nav-item active">
        <Link className="nav-link" to="/checkout">
          Checkout
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-item active">
          {/* The navbar will show these links after you log in */}
          <Link className="nav-link" to="/accountSettings">
            My Account
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <div className="nav-item active">
            {/* The navbar will show these links before you log in */}
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </div>
          <div className="nav-item active">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
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
    handleClick() {
      dispatch(logout())
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
