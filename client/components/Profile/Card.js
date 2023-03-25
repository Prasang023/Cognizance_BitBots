import React from 'react'

function Card({data}) {
  console.log(data);
  return (
    <div className='card'>
      <div className='photo-card'>

      </div>
      <div className='text-box'>
        <h4>{data.heading}</h4>
        <p>{data.para}</p>
      </div>
      <div className='btn-box'>
        <button>Add</button>
        <button>Subtract</button>
      </div>
    </div>
  )
}

export default Card