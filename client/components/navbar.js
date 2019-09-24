import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav
    className="navbar navbar-expand-md navbar-light bg-light"
    style={{height: 80}}
  >
    <div className="navbar-collapse collapse w-10 order-1 order-md-0 dual-collapse2">
      <a className="navbar-brand font-italic" href="#">
        <img
          style={{height: 80, width: 140}}
          src="http://www.kuark.org/wp-content/uploads/2016/03/domatesten-elektrik-%C3%BCretimi1.jpg"
        />
      </a>
    </div>
    <div className="mx-auto order-0 w-auto">
      <ul className="navbar-nav order-md-0">
        <li className="nav-item active ">
          <a className="nav-link" href="#">
            <Link className="nav-link  text-muted " to="/tomatoes">
              Tomatoes 🍅
            </Link>
            <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
    <div className="navbar-collapse collapse w-10 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <a className="nav-link" href="#">
            <Link className="nav-link text-muted" to="/cart">
              {' '}
              🛒{' '}
            </Link>
          </a>
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
