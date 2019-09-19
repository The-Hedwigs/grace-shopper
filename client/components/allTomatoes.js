import React from 'react'
import {connect} from 'react-redux'
import {getAllTomatoesThunk, addToCartThunk} from '../store'
import Tomatoes from './tomatoes'

import {Link} from 'react-router-dom'

class AllTomatoes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTomatoes()
  }

  render() {
    console.log('this is the toms', this.props.tomatoes)
    return (
      <div className="container">
        <h1 className="section-title">Our Tomatoes</h1>
        {this.props.tomatoes ? (
          <Tomatoes
            tomatoes={this.props.tomatoes}
            addToCart={this.props.addToCart()}
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
  // console.log(getAllTomatoesThunk())
  return {
    getAllTomatoes: () => dispatch(getAllTomatoesThunk()),
    addToCart: id => dispatch(addToCartThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTomatoes)
