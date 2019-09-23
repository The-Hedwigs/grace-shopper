import React from 'react'
import {Link} from 'react-router-dom'

export default function Tomatoes(props) {
  console.log('props:', props)
  return (
    <div className="container">
      <div className="row">
        {props.tomatoes.map(tomato => (
          <div className="col-md-4" key={tomato.id}>
            <div className="card text-center">
              <div className="wrapper">
                <img src={tomato.imageUrl} className="card-img-top img-fluid" />
              </div>
              <div className="card-body">
                <Link className="nav-link text-muted" to={`/tomatoes/${tomato.id}`>
                <h5 className="card-title">{tomato.name}</h5>
                </Link>
                <div className="card-subtitle mb-2 text-muted">
                  {tomato.description}
                </div>
                <div className="card-text">{tomato.price}</div>
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
        ))}
      </div>
    </div>
  )
}
