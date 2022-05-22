import React from 'react'
import { Pokemon } from '../../models/Pokemon'

//css
import './PokemonCard.scss'

function PokemonCard({ pokemon, btnName, btnFunction }: any) {
  const { name, sprites: { other: { 'official-artwork': { front_default = '' } } }, types } = pokemon
  return (
    <div className="card">
        <img className="card-img-top" src={front_default} alt='' />
        <div className="card-body text-center">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              { types.map((type: any, i: number) => {
                return (
                  <button className={`type-btn ${type.name}`}>{type.name}</button>
                )
              }) }
            </p>
            <button onClick={btnFunction} className="btn btn-primary">{btnName}</button>
        </div>
    </div>
  )
}

export default PokemonCard