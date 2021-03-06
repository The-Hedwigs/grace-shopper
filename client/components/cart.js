import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderThunk, subQuantThunk} from '../store/cart'
import {addToCartThunk} from '../store/tomato'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  //mounting our existing order onto the cart
  componentDidMount() {
    this.props.getOrder()
  }

  //function to run add quantity thunk
  handleSubtract = id => {
    this.props.subtractQuant(id)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.orderItems.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="card text-center">
                <div className="wrapper">
                  <img src={item.imageUrl} className="card-img-top img-fluid" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="card-text">
                    <p>Unit Price: ${item.price}</p>
                  </div>
                  <div className="card-text">
                    <p>Quantity: {item.tomorder.quantity}</p>
                  </div>
                  <div className="btn-group btn-block" role="group">
                    <button
                      type="button"
                      className="btn btn-secondary btn-dark"
                      onClick={() => this.handleSubtract(item.id)}
                    >
                      Remove 🍅
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div>
            Order Total: ${this.props.orderInfo.total}.00
            <Link to="/checkout" className="nav-link text-muted">
              <button type="submit">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderInfo: state.cartState.orderInfo,
  orderItems: state.cartState.orderItems
})

const mapDispatchToProps = dispatch => ({
  getOrder: () => dispatch(getOrderThunk()),
  subtractQuant: id => dispatch(subQuantThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
