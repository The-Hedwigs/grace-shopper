import React from 'react'
import {connect} from 'react-redux'
import DropInUI from 'braintree-web-drop-in-react'
import {
  getTokenThunk,
  submitOrderThunk,
  sendNonceThunk,
  clearOrderThunk
} from '../store'

export class DropIn extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getToken()
  }

  render() {
    return (
      <div>
        {!this.props.clientToken ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div>
            <DropInUI
              options={{authorization: this.props.clientToken}}
              onInstance={instance => (this.instance = instance)}
            />
            <button
              type="submit"
              onClick={evt => this.props.handlePay(evt, this.instance)}
            >
              Pay
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clientToken: state.payState.clientToken
})

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch(getTokenThunk()),
    handlePay(evt, instance) {
      evt.preventDefault()
      dispatch(sendNonceThunk(instance))
      dispatch(submitOrderThunk({submitted: true}))
      dispatch(clearOrderThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropIn)
