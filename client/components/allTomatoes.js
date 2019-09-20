import React from 'react'
import {connect} from 'react-redux'
import {getAllTomatoesThunk} from '../store/tomato'
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
    console.log('this is the toms', this.props.tomatoes)
    return (
      <div className="container">
        <h1 className="display-4 text-center">Our Tomatoes</h1>
        {this.props.tomatoes ? (
          <Tomatoes tomatoes={this.props.tomatoes} />
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
  return {getAllTomatoes: () => dispatch(getAllTomatoesThunk())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTomatoes)
