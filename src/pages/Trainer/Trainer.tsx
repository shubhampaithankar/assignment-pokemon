import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

//Components
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Pokeball from '../../components/Pokeball/Pokeball'

//models
import { Pokemon, Trainer as currentTrainer } from '../../models'

//Services
import { PokemonService } from '../../services'

//css
import './Trainer.scss'

function Trainer({ isLoggedIn } : any) {
  let [first]: currentTrainer[] = JSON.parse(localStorage.getItem('currentUser') as string)
  let pokemonArr: Pokemon[] = []

  const [trainerPokemon, setTrainerPokemon] = useState(pokemonArr)

  useEffect(() => {
    let arr = PokemonService.getPokemonData(first.pokemon)
    setTrainerPokemon(arr)
  }, [first.pokemon])

  const releasePokemon = (pokemon: any) => {
    console.log(`released mon: ${pokemon}`)
  }

  return (
    <>
      { isLoggedIn ? (
        <div className='container-fluid'>
           <section className="row justify-content-center align-items-center">
              <div className="col-12">
                <article className='row justify-content-center align-items-center'>
                  { trainerPokemon.length ? (
                      trainerPokemon.map((pokemon: Pokemon, index: any) => {
                        return (
                          <div key={index} className="col-4 d-flex align-items-center justify-content-center">
                            <PokemonCard pokemon={pokemon} btnName={'Release'} btnFunction={() => releasePokemon(pokemon)}/>
                          </div>
                        )
                      })
                    )  : <Pokeball /> }
                </article>
              </div>
            </section>
        </div>
      ) : (<Navigate to='/' />)}
    </>
  )
}

export default Trainer

