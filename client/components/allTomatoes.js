import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllTomatoesThunk, addToCartThunk} from '../store/tomato'
import {ToastsContainer, ToastsStore} from 'react-toasts'
//import {Link} from 'react-router-dom'

export class AllTomatoes extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllTomatoes()
  }

  handleClick(id) {
    this.props.addToCart(id)
    ToastsStore.success('Tomato added to cart! Yum!')
  }

  render() {
    return (
      <div className="container">
        <ToastsContainer className="toasts" store={ToastsStore} />
        <h1 className="display-4 text-center">Our Farm</h1>
        {this.props.tomatoes ? (
          <div className="container">
            <div className="row">
              {this.props.tomatoes.map(tomato => (
                <div className="col-md-4" key={tomato.id}>
                  <div className="card text-center">
                    <div className="wrapper">
                      <img
                        src={tomato.imageUrl}
                        className="card-img-top img-fluid"
                      />
                    </div>
                    <div className="card-body">
                      <Link
                        className="card-link font-weight-bold text-danger"
                        to={`/tomatoes/${tomato.id}`}
                      >
                        {tomato.name}
                      </Link>
                      <div className="card-subtitle mb-2 text-muted">
                        {tomato.description}
                      </div>
                      <div className="card-text">{tomato.price}</div>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-block"
                        onClick={() => this.handleClick(tomato.id)}
                      >
                        Add 🍅 to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          'No tomatoes here!'
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tomatoes: state.tomatoState.tomatoes
})

const mapDispatchToProps = dispatch => {
  return {
    getAllTomatoes: () => dispatch(getAllTomatoesThunk()),
    addToCart: id => dispatch(addToCartThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTomatoes)
