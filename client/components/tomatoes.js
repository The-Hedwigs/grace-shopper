import React from 'react'

export default function Tomatoes(props) {
  return (
    <div>
      <div className="large-tomato-box">
        {props.tomatoes.map(tomato => (
          <div className="tomatodiv" key={tomato.id}>
            <img src={tomato.imageUrl} className="tomatoPic" />
            <h4>{tomato.name}</h4>
            <h4>{tomato.price}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
