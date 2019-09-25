import React from 'react'
import {connect} from 'react-redux'
import {getAllTomatoesThunk, addToCartThunk} from '../store/tomato'
import Tomatoes from './tomatoes'
//import {Link} from 'react-router-dom'

export class AllTomatoes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTomatoes()
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-5 text-center">Our Tomatoes</h1>
        {this.props.tomatoes ? (
          <Tomatoes
            tomatoes={this.props.tomatoes}
            addToCart={id => this.props.addToCart(id)}
          />
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
