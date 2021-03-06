import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  UpdatePreferences,
  Checkout
} from './components'
import {me} from './store'
import AllTomatoes from './components/allTomatoes'
import SingleTomato from './components/singleTomato'
import Cart from './components/cart'
import DropIn from './components/DropIn'
import {setOrderThunk} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/tomatoes" component={AllTomatoes} />
        <Route exact path="/tomatoes/:tomatoId" component={SingleTomato} />
        <Route
          exact
          path="/checkout"
          render={props => (
            <Checkout {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        />
        <Route exact path="/paymentinfo" component={DropIn} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/" component={AllTomatoes} />
            <Route
              exact
              path="/updatepreferences"
              render={props => (
                <UpdatePreferences
                  {...props}
                  isLoggedIn={isLoggedIn}
                  user={user}
                />
              )}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(setOrderThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
