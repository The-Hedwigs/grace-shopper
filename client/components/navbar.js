import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {setOrderThunk} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav
    className="navbar navbar-expand-md navbar-light bg-light mt-0 mb-0"
    style={{height: 80}}
  >
    <div className="navbar-collapse collapse w-10 order-1 order-md-0 dual-collapse2">
      <img
        style={{height: 80, width: 140}}
        src="http://www.kuark.org/wp-content/uploads/2016/03/domatesten-elektrik-%C3%BCretimi1.jpg"
      />
    </div>
    <div className="mx-auto order-0 w-auto">
      <ul className="navbar-nav order-md-0">
        <li className="nav-item active ">
          <Link className="nav-link  text-muted " to="/tomatoes">
            Tomatoes 🍅
          </Link>
          <span className="sr-only">(current)</span>
        </li>
      </ul>
    </div>
    <div className="navbar-collapse collapse w-10 h-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto h-100">
        <li className="nav-item ">
          <Link
            className="nav-link text-muted margin-auto pt-0 pb-0 h-100 align-self-center"
            to="/cart"
          >
            {' '}
            🛒{' '}
          </Link>
        </li>
      </ul>
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
