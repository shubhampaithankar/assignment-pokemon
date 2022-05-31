import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//Models
import { Pokemon as PokemonModel, Trainer } from '../../models'

//Components
import { Modal, Pokeball, PokemonCard } from '../../components/common/'

//Services
import { PokemonService, TrainerService, UtilityService } from '../../services'

//css
import './Pokemon.scss'

function Pokemon() {
  const { gen = '1' } = useParams()
  const navigate = useNavigate()

  let trainers: Trainer[] = JSON.parse(localStorage.getItem('trainers') as string)
  let currentTrainer: Trainer = JSON.parse(sessionStorage.getItem('currentUser') as string)

  const [randomPokemon, setRandomPokemon] = useState([])
  const [isLoading, setisLoading] = useState(false)

  //Modal
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    body: <></>
  })

  const onClose = () => {
    setShow(false)
  }

  const getGenerationPokemon = async (gen: any) => {
    setisLoading(true)
    let pokemonData = localStorage.getItem('pokemonData') as string
    if (pokemonData) {
      let data = JSON.parse(pokemonData)
      console.log(data)
    }
    let arr = await PokemonService.getGenerationData(gen)
      .then(({ pokemon_species }) => {
        return UtilityService.randomItemfromArray(pokemon_species.map((x: any) => x.name), 10)
      })

    PokemonService.getPokemonData(arr)
      .then((res: any) => {
        setTimeout(() => {
          setRandomPokemon(res)
          setisLoading(false)
        }, 1000 * 1)
      })
  }

  useEffect(() => {
    gen >= '9' ? navigate('/') : navigate(``)
    getGenerationPokemon(gen)
  }, [gen])  // eslint-disable-line react-hooks/exhaustive-deps

  const catchPokemon = (pokemon: PokemonModel) => {

    if (currentTrainer.pokemon.length === 6) {
      setShow(true)
      setModalData({
        title: `Unable to catch ${UtilityService.capitalizeString(pokemon.name)}`,
        body: (
          <>
            <h5>You cannot have more than 6 in your party</h5>
          </>
        )
      })
      return
    }

    if (currentTrainer.pokemon.includes(pokemon.name)) {
      setShow(true)
      setModalData({
        title: `Unable to catch ${UtilityService.capitalizeString(pokemon.name)}`,
        body: (
          <>
            <h5>You already have {UtilityService.capitalizeString(pokemon.name)} in your party</h5>
          </>
        )
      })
      return
    }

    currentTrainer.pokemon.push(pokemon.name)
    
    TrainerService.updateTrainer(currentTrainer)
      .then((trainer: any) => {
        sessionStorage.setItem('currentUser', JSON.stringify(trainer))
        trainers = trainers.map((t: Trainer) => t.id === trainer.id ? {...t, pokemon: trainer.pokemon} : t)
        localStorage.setItem('trainers', JSON.stringify(trainers))
        setShow(true)
        setModalData({
          title: `Caught Pokemon`,
          body: (
            <>
              <h5>Added {UtilityService.capitalizeString(pokemon.name)} to your party</h5>
            </>
          )
        })
        getGenerationPokemon(gen)
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
            <article className='d-flex flex-column align-items-center justify-content-center'>
              <h2 className='text-center'>Generate Random Pokemon</h2>
              <button disabled={isLoading} onClick={()=> getGenerationPokemon(gen)} className="btn
                btn-secondary">Generate</button>
            </article>
          </div>
          { !isLoading ? (
          <>
            <div className="col-12">
              <article className='row justify-content-center align-items-center'>
                {randomPokemon?.map((pokemon: PokemonModel, i) => {
                return (
                <div key={i}
                  className="col-lg-2 col-md-3 col-sm-12 p-0 m-2 d-flex align-items-center justify-content-center">
                  <PokemonCard pokemon={pokemon} btnName={'Catch'} btnFunction={()=> catchPokemon(pokemon)}
                    trainer={currentTrainer} />
                </div>
                )
                })}
              </article>
            </div>
          </>
          ) :
          <Pokeball rotate={true} /> }
        </section>
      </div>
    </>
  )
}

export default Pokemon