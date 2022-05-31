import React, { useEffect, useState } from 'react'

//Components
import { Modal, Pokeball, PokemonCard } from '../../components/common/'

//models
import { Pokemon, Trainer as TrainerModel } from '../../models'

//Services
import { PokemonService, TrainerService, UtilityService } from '../../services'

//css
import './Trainer.scss'

const Trainer = () => {

  let trainers: TrainerModel[] = JSON.parse(localStorage.getItem('trainers') as string)
  let currentTrainer: TrainerModel = JSON.parse(sessionStorage.getItem('currentUser') as string)

  const [isLoading, setisLoading] = useState(false)
  const [trainerPokemon, setTrainerPokemon] = useState([])
  
  //Modal
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    body: <></>
  })

  const onClose = () => {
    setShow(false)
  }

  const getPokemonData = (trainer: TrainerModel) => {
    setisLoading(true)
    PokemonService.getPokemonData(trainer.pokemon)
      .then((res: any) => {
        setTimeout(() => {
          setTrainerPokemon(res)
          setisLoading(false)
        }, 1000 * 1)
      })
  }

  useEffect(() => {
    getPokemonData(currentTrainer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const releasePokemon = (pokemon: Pokemon) => {

    if (currentTrainer.pokemon.length === 1) {
      setShow(true)
      setModalData({
        title: `Unable to release ${UtilityService.capitalizeString(pokemon.name)}`,
        body: (
          <>
            <h5>You cannot release last Pokemon from your party</h5>
          </>
        )
      })
      return
    }
    
    currentTrainer.pokemon = currentTrainer.pokemon.filter((p: string) => p !== pokemon.name)
    TrainerService.updateTrainer(currentTrainer)
      .then((trainer: TrainerModel) => {
        sessionStorage.setItem('currentUser', JSON.stringify(trainer))
        setShow(true)
        setModalData({
          title: `Released Pokemon`,
          body: (
            <>
              <h5>Released {UtilityService.capitalizeString(pokemon.name)} from your party</h5>
            </>
          )
        })
        getPokemonData(trainer)
      })

  }

  return (
    <>
      <div className='container-fluid'>
        <Modal show={show} title={modalData.title} onClose={onClose}>
          { modalData.body }
        </Modal>
        <section className="row justify-content-center align-items-baseline">
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