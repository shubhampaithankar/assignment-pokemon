import React, { useEffect, useState } from 'react'

//Components
import { Pokeball, PokemonCard } from '../../components/common/'

//models
import { Pokemon, Trainer as TrainerModel } from '../../models'

//Services
import { PokemonService, TrainerService, UtilityService } from '../../services'

//css
import './Trainer.scss'

function Trainer() {

  let trainers: TrainerModel[] = JSON.parse(localStorage.getItem('trainers') as string)
  let currentTrainer: TrainerModel = JSON.parse(sessionStorage.getItem('currentUser') as string)[0]

  const [trainerPokemon, setTrainerPokemon] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const getPokemonData = (trainer: TrainerModel) => {
    setisLoading(true)
    PokemonService.getPokemonData(trainer.pokemon)
      .then((res: any) => {
        setTimeout(() => {
          setTrainerPokemon(res)
          setisLoading(false)
        }, 100 * 10)
      })
  }

  useEffect(() => {
    getPokemonData(currentTrainer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const releasePokemon = (pokemon: Pokemon) => {
    if (currentTrainer.pokemon.length === 1) return alert(`You cannot release your last pokemon`)
    try {
      currentTrainer.pokemon = currentTrainer.pokemon.filter((p: string) => p !== pokemon.name)
      TrainerService.updateTrainer(currentTrainer)
        .then((trainer: TrainerModel) => {
          sessionStorage.setItem('currentUser', JSON.stringify([trainer]))
          trainers = trainers.map((t: TrainerModel) => t.id === trainer.id ? {...t, pokemon: trainer.pokemon} : t)
          localStorage.setItem('trainers', JSON.stringify(trainers))
          alert(`Released ${UtilityService.capitalizeString(pokemon.name)} from your party`)
          getPokemonData(trainer)
        })

    } catch (error: any) {
      alert(`Couldnt release ${pokemon}: ${error.message}`)
      console.log(error)
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <section className="row justify-content-center align-items-center">
          <div className="col-12">
            <h2 className='text-center'>Welcome { UtilityService.capitalizeString(currentTrainer.username) }!</h2>
          </div>
          <div className="col-12">
            { !isLoading ?
            <>
              <article className='row justify-content-center align-items-center'>
                {
                trainerPokemon.map((pokemon: Pokemon, i) => {
                return (
                <div key={i}
                  className="col-lg-3 col-md-4 col-sm-12 p-0 m-2 d-flex align-items-center justify-content-center">
                  <PokemonCard key={i} pokemon={pokemon} btnName={'Release'} btnFunction={()=>
                    releasePokemon(pokemon)}/>
                </div>
                )
                }) }
              </article>
            </>
            :
            <>
              <article className='d-flex justify-content-center align-items-center'>
                <Pokeball rotate={true} />
              </article>
            </>
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default Trainer

