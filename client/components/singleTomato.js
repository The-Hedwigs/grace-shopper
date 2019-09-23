import React from 'react'
import {connect} from 'react-redux'
import {getSingleTomatoThunk, addToCartThunk} from '../store/tomato'

export class SingleTomato extends React.Component {
  componentDidMount() {
    const tomatoId = this.props.match.params.tomatoId
    this.props.getSingleTomato(tomatoId)
  }
  render() {
    return (
      <div className="container">
        <div className="card text-center w-50">
          <div className="wrapper">
            <img
              src={this.props.tomato.imageUrl}
              className="card-img-top img-fluid"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.tomato.name}</h5>
            <div className="card-text">{this.props.tomato.description}</div>
            <div className="card-text">{this.props.tomato.price}</div>
            <button
              type="button"
              className="btn btn-outline-dark btn-block"
              onClick={() => props.addToCart(tomato.id)}
            >
              Add 🍅 to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tomato: state.tomatoState.singleTomato
})

const mapDispatchToProps = dispatch => ({
  getSingleTomato: tomatoId => dispatch(getSingleTomatoThunk(tomatoId)),
  addToCart: tomatoId => dispatch(addToCartThunk(tomatoId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleTomato)
