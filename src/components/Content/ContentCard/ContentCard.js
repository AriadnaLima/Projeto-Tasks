import React from 'react'
import Card from './Card/Card'

export default function ContentCard() {
  return (
    <div>
      <div className="m-3 bg-light text-dark border border-dark" style={{ width: "200px" }}>
        <div className='p-2 mb-0 bg-primary text-white'>
          Header Card
        </div>

        <div className="p-2 m-2" >
          <button className="btn btn-primary" type="submit">Nova Tarefa</button>
        </div>

      </div>
    </div>
  )
}
