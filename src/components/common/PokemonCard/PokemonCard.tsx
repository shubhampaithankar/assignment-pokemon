import React from 'react'

//services
import { UtilityService } from '../../../services'
import Pokeball from '../Pokeball/Pokeball'

//css
import './PokemonCard.scss'

function PokemonCard({ pokemon, btnName, btnFunction, trainer }: any) {
  const { name, sprites: { other: { 'official-artwork': { front_default = '' } } }, types, id } = pokemon

  return (
    <div className="card">
        <img className="card-img-top" src={front_default} alt={front_default} />
        <div className="card-body text-center">
          <div className='d-flex flex-row align-items-center justify-content-center'>
            <h5 className="card-title m-0">
              { UtilityService.capitalizeString(name) }
            </h5>
            <div className='mx-2'>
              { trainer?.pokemon.includes(name) ? <Pokeball small={true} /> : null }
            </div>
          </div>
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