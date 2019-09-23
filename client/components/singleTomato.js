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
        <div className="card">
          <div className="wrapper">
            <img
              src={this.props.tomato.imageUrl}
              className="card-img-top img-fluid"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.tomato.name}</h5>
            <div className="card-text text-center">
              {this.props.tomato.description}
            </div>
            <div className="card-text text-center">
              {this.props.tomato.price}
            </div>
            <button
              type="button"
              onClick={() => this.props.addToCart(this.props.tomato.id)}
            >
              🍅➕
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
