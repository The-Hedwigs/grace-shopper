import React from 'react'

export default function Tomatoes(props) {
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
