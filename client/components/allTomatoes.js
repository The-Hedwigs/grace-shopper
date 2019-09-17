import React from 'react'
import {connect} from 'react-redux'
import {getAllTomatoesThunk} from '../store/tomato'
import {Link} from 'react-router-dom'

export class AllTomatoes extends React.Component {
  componentDidMount() {
    this.props.getAllTomatoes()
  }

  render() {
    return (
      <div className="container">
        <h1 className="section-title">Our Tomatoes</h1>
        <div>
          <div className="large-tomato-box">
            {this.props.tomatoes.map(tomato => (
              <div className="tomatodiv" key={tomato.id}>
                <img src={tomato.imageUrl} className="tomatoPic" />
                <h4>{tomato.name}</h4>
                <h4>{tomato.price}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tomatoes: state.tomatoes
})

const mapDispatchToProps = dispatch => ({
  getAllTomatoes: () => dispatch(getAllTomatoesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTomatoes)
