import React from 'react'

export default function Tomatoes(props) {
  console.log('props:', props)
  return (
    <div>
      <div className="large-tomato-box">
        {props.tomatoes.map(tomato => (
          <div className="tomatodiv" key={tomato.id}>
            {console.log(tomato)}
            <img src={tomato.imageUrl} className="tomatoPic" />
            <h4>{tomato.name}</h4>
            <h4>{tomato.price}</h4>
            <button type="button" onClick={() => props.addToCart(tomato.id)}>
              🍅
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
