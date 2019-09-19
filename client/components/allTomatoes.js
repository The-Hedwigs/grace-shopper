import React from 'react'
import {connect} from 'react-redux'
import {getAllTomatoesThunk, addToCartThunk} from '../store/tomato'
import Tomatoes from './tomatoes'

class AllTomatoes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTomatoes()
  }

  render() {
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
  return {
    getAllTomatoes: () => dispatch(getAllTomatoesThunk()),
    addToCart: id => dispatch(addToCartThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTomatoes)
