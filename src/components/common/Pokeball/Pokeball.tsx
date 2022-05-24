import React from 'react'

//css
import './Pokeball.scss'

function Pokeball({ rotate, small }: any) {
  return (
    <div className={ `pokeball ${rotate ? 'rotate' : ''} ${ small ? 'small-ball' : 'regular'}`}></div>
  )
}

export default Pokeball