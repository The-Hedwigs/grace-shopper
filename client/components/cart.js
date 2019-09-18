import React from 'react'
import {connect} from 'react-redux'
// import thunks from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getOrder()
  }

  handleAdd = id => {
    this.props.addToQuant()
  }

  handleSubtract = id => {
    this.props.subtractQuant()
  }

  render() {
    return (
      <div className="large-tomato-box">
        {this.props.tomatoes.map(tomato => (
          <div className="tomatodiv" key={tomato.id}>
            <img src={tomato.imageUrl} className="tomatoPic" />
            <h4>{tomato.name}</h4>
            <h4>{tomato.price}</h4>
            <form>
              <label>Quantity</label>
              <div className="quantity">
                {this.props.quantity}
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
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  getOrder: () => dispatch(getOrderThunk()),
  addToQuant: () => dispatch(addQuantThunk()),
  subtractQuant: () => dispatch(subtractQuantThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
