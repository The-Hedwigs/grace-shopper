import React from 'react'
import {connect} from 'react-redux'
import {getOrderThunk} from '../store/cart'
import {addToCartThunk} from '../store/tomato'

class Cart extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  //mounting our existing order onto the cart
  componentDidMount() {
    this.props.getOrder()
    console.log('state after mount:', this.state)
  }

  //function to run add quantity thunk
  handleAdd = id => {
    this.props.addToCart(id)
  }

  // //function to run subtract quantity thunk
  // handleSubtract = id => {
  //   this.props.subtractQuant(id)
  // }

  render() {
    return (
      <div className="container">
        <h2>Order Total: ${this.props.orderInfo.total}.00</h2>
        {/* the order total may need to be moved */}
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
                      className="btn btn-secondary btn-light"
                      onClick={() => this.handleAdd(item.id)}
                    >
                      Add 🍅
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-dark"
                      onClick={() => this.handleSubtrack(item.id)}
                    >
                      Remove 🍅
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
  addToCart: id => dispatch(addToCartThunk(id))
  // subtractQuant: () => dispatch(subtractQuantThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
