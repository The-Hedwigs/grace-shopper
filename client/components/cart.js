import React from 'react'
import {connect} from 'react-redux'
// import thunks from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  //mounting our existing order onto the cart
  componentDidMount() {
    this.props.getOrder()
  }

  //function to run add quantity thunk
  handleAdd = id => {
    this.props.addToQuant()
  }

  //function to run subtract quantity thunk
  handleSubtract = id => {
    this.props.subtractQuant()
  }

  render() {
    return (
      /*
      component for displaying items
      - to update:
          - still working on names for db, update props names as necesarry
      */
      <div className="cart-item-box">
        {this.props.orderItems.map(item => (
          <div className="itemdiv" key={item.id}>
            <img src={item.imageUrl} className="itemPic" />
            <h4>{item.name}</h4>
            <h4>{item.price}</h4>
            <form>
              <label>Quantity</label>
              <div className="quantity">
                {this.props.orderInfo.quantity}
                <Link to="/cart">
                  <i
                    className="**inserticon**"
                    onClick={() => {
                      this.handleAdd(item.id)
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="**inserticon**"
                    onClick={() => {
                      this.handleSubtract(item.id)
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              {/* <div className='total'>{this.props.total}</div> */}
            </form>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderInfo: state.orderInfo,
  orderItems: state.orderItems
})

const mapDispatchToProps = dispatch => ({
  getOrder: () => dispatch(getOrderThunk()),
  addToQuant: () => dispatch(addQuantThunk()),
  subtractQuant: () => dispatch(subtractQuantThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
