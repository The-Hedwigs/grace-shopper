import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const PaymentForm = props => {
  const {name, handleSubmit, displayName, error, isLoggedIn} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {!isLoggedIn ? (
          <div>
            <div>
              <label htmlFor="fullName">
                <small>Name</small>
              </label>
              <input name="fullName" type="text" />
            </div>
            <br />
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
            <label htmlFor="addressOne">
              <small>Address line 1</small>
            </label>
            <input name="addressOne" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="addressTwo">
              <small>Address line 2</small>
            </label>
            <input name="addressTwo" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input name="state" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="zip">
              <small>Zip code</small>
            </label>
            <input name="zip" type="text" pattern="\d{5}([ \-]\d{4})?" />
          </div>
          <br />
          <div>Billing Address</div>
          <br />
          <div>
            <label htmlFor="addressOne">
              <small>Address line 1</small>
            </label>
            <input name="addressOne" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="addressTwo">
              <small>Address line 2</small>
            </label>
            <input name="addressTwo" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input name="state" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="zip">
              <small>Zip code</small>
            </label>
            <input name="zip" type="text" pattern="\d{5}([ \-]\d{4})?" />
          </div>
          <br />
          <div>Payment Information</div>
          <br />
          <div>
            <label htmlFor="cardnumber">
              <small>Debit/Credit Card</small>
            </label>
            <input name="cardnumber" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="expdate">
              <small>Expiration Date</small>
            </label>
            <input name="expdate" type="text" />
          </div>
          <br />
          <div>
            <label htmlFor="cvc">
              <small>CVC</small>
            </label>
            <input name="cvc" type="text" />
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
    name: 'checkout',
    displayName: 'Checkout'
    //error: state.order.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const name = evt.target.fullName.value
      const email = evt.target.email.value
      const address =
        evt.target.addressOne.value +
        ' ' +
        evt.target.addressTwo.value +
        ' ' +
        evt.target.state.value +
        ' ' +
        evt.target.zip.value
    }
  }
}

export const UpdatePreferences = connect(mapPreferences, mapDispatch)(
  PaymentForm
)
export const Checkout = connect(mapOrder, mapDispatch)(PaymentForm)

PaymentForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
