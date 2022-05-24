import React from 'react'

//services
import { UtilityService } from '../../../services'

//css
import './PokemonCard.scss'

function PokemonCard({ pokemon, btnName, btnFunction }: any) {
  const { name, sprites: { other: { 'official-artwork': { front_default = '' } } }, types, id } = pokemon

  return (
    <div className="card">
        <img className="card-img-top" src={front_default} alt={front_default} />
        <div className="card-body text-center">
            <h5 className="card-title">{UtilityService.capitalizeString(name)}</h5>
            <h6 className=''>National Dex: #{id}</h6>
            <p className="card-text">
              { types.map((entry: any, i: number) => {
                return (
                  <button key={i} className={`type-btn mx-1 ${entry.type.name}`}>{UtilityService.capitalizeString(entry.type.name)}</button>
                )
              }) }
            </p>
            <button onClick={btnFunction} className="btn btn-primary mb-2">{btnName}</button>
        </div>
    </div>
  )
}

export default PokemonCard