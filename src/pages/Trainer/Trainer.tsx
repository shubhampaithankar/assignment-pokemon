import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

//Components
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Pokeball from '../../components/Pokeball/Pokeball'

//models
import { Pokemon, Trainer as currentTrainer } from '../../models'

//Services
import { PokemonService, TrainerService } from '../../services'

//css
import './Trainer.scss'

function Trainer({ isLoggedIn } : any) {

  let trainers: currentTrainer[] = JSON.parse(localStorage.getItem('trainers') as string)
  let currentTrainer: currentTrainer = JSON.parse(localStorage.getItem('currentUser') as string)

  const [trainerPokemon, setTrainerPokemon] = useState([])

  useEffect(() => {
    if (!trainerPokemon.length ) { 
      PokemonService.getPokemonData(currentTrainer?.pokemon)
        .then((res: any) => {
          setTimeout(() => {
            setTrainerPokemon(res)
          }, 100 * 10)
        })
    }
  })

  const releasePokemon = (pokemon: Pokemon) => {
    if (currentTrainer.pokemon.length === 1) return alert(`You cannot release your last pokemon`)
    try {

      currentTrainer.pokemon = currentTrainer.pokemon.filter((p: string) => p !== pokemon.name)
      TrainerService.updateTrainer(currentTrainer)
        .then((trainer: currentTrainer) => {
          localStorage.setItem('currentUser', JSON.stringify(trainer))
          trainers = trainers.map((t: currentTrainer) => t.id == trainer.id ? {...t, pokemon: trainer.pokemon} : t)
          localStorage.setItem('trainers', JSON.stringify(trainers))
        })

    } catch (error: any) {
      alert(`Couldnt release ${pokemon}: ${error.message}`)
      console.log(error)
    }
  }

  return (
    <>
      { isLoggedIn ? (
        <div className='container-fluid'>
           <section className="row justify-content-center align-items-center">
              <div className="col-12">
                <article className='row justify-content-center align-items-center'>
                  { trainerPokemon.length ? (
                      trainerPokemon.map((pokemon: Pokemon, i) => {
                        return (
                          <div key={i} className="col-4 d-flex align-items-center justify-content-center">
                            <PokemonCard key={i} pokemon={pokemon} btnName={'Release'} btnFunction={() => releasePokemon(pokemon)}/>
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

