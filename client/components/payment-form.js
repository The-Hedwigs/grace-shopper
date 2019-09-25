import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updatepref, submitOrderThunk} from '../store'

const PaymentForm = props => {
  const {name, handleSubmit, displayName, error, isLoggedIn} = props

  return (
    <div>
      <form onSubmit={evt => handleSubmit(evt, props.user)} name={name}>
        {!isLoggedIn ? (
          <div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <br />
          </div>
        ) : null}
        <br />
        <div>
          <div>Shipping Address</div>
          <br />
          <div>
            <label htmlFor="sAddressOne">
              <small>Address line 1</small>
            </label>
            <input name="sAddressOne" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="sAddressTwo">
              <small>Address line 2</small>
            </label>
            <input name="sAddressTwo" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="sCity">
              <small>City</small>
            </label>
            <input name="sCity" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="sState">
              <small>State</small>
            </label>
            <input name="sState" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="sZip">
              <small>Zip code</small>
            </label>
            <input name="sZip" type="text" pattern="\d{5}([ \-]\d{4})?" />
          </div>
          <br />
          <div>Billing Address</div>
          <br />
          <div>
            <label htmlFor="bAddressOne">
              <small>Address line 1</small>
            </label>
            <input name="bAddressOne" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="bAddressTwo">
              <small>Address line 2</small>
            </label>
            <input name="bAddressTwo" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="bCity">
              <small>City</small>
            </label>
            <input name="bCity" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="bState">
              <small>State</small>
            </label>
            <input name="bState" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="bZip">
              <small>Zip code</small>
            </label>
            <input name="bZip" type="text" pattern="\d{5}([ \-]\d{4})?" />
          </div>
          <br />
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapPreferences = state => {
  return {
    name: 'updatePreferences',
    displayName: 'Update',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  }
}

const mapOrder = state => {
  return {
    name: 'continueOrder',
    displayName: 'Continue',
    cart: state.cartState.orderInfo
  }
}

const mapDispatchPref = dispatch => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault()
      const shippingAddress = (
        evt.target.sAddressOne.value +
        ' ' +
        evt.target.sAddressTwo.value +
        ' ' +
        evt.target.sCity.value +
        ' ' +
        evt.target.sState.value +
        ' ' +
        evt.target.sZip.value
      ).replace(/\s+/g, ' ')
      const billingAddress = (
        evt.target.bAddressOne.value +
        ' ' +
        evt.target.bAddressTwo.value +
        ' ' +
        evt.target.bCity.value +
        ' ' +
        evt.target.bState.value +
        ' ' +
        evt.target.bZip.value
      ).replace(/\s+/g, ' ')
      const info = {
        shippingAddress: shippingAddress,
        billingAddress: billingAddress
      }
      dispatch(updatepref(user.id, info))
    }
  }
}

const mapDispatchCheck = dispatch => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault()
      const email = evt.target.email ? evt.target.email.value : user.email
      const shippingAddress = (
        evt.target.sAddressOne.value +
        ' ' +
        evt.target.sAddressTwo.value +
        ' ' +
        evt.target.sState.value +
        ' ' +
        evt.target.sZip.value
      ).replace(/\s+/g, ' ')
      const billingAddress = (
        evt.target.bAddressOne.value +
        ' ' +
        evt.target.bAddressTwo.value +
        ' ' +
        evt.target.bState.value +
        ' ' +
        evt.target.bZip.value
      ).replace(/\s+/g, ' ')
      const info = {
        email: email,
        shipping: shippingAddress,
        billing: billingAddress,
        userId: user.id || null
      }
      dispatch(submitOrderThunk(info))
    }
  }
}

export const UpdatePreferences = connect(mapPreferences, mapDispatchPref)(
  PaymentForm
)
export const Checkout = connect(mapOrder, mapDispatchCheck)(PaymentForm)

PaymentForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
