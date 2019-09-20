import React from 'react'

export default function Tomatoes(props) {
  console.log('props:', props)
  return (
    <div className="container">
      <div className="row">
        {props.tomatoes.map(tomato => (
          <div className="col-md-4" key={tomato.id}>
            <div className="card">
              <div className="wrapper">
                <img src={tomato.imageUrl} className="card-img-top img-fluid" />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center">{tomato.name}</h5>
                <div className="card-text text-center">{tomato.price}</div>
                <button type="button" onClick={() => props.addToCart(tomato.id)}>
                  🍅
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
