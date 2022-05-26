import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  
  let pokemonList = JSON.parse(localStorage.getItem('pokemonList') as string)

  let trainers: Trainer[] = JSON.parse(localStorage.getItem('trainers') as string)
  let currentTrainer: Trainer = JSON.parse(sessionStorage.getItem('currentUser') as string)[0]

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

  const getRandomPokemon = (currentGen: any) => {
    let slicedList
    switch (currentGen) {
      case '1':
        slicedList = pokemonList.slice(0, 150) //1 to 151
        break;
      case '2':
        slicedList = pokemonList.slice(151, 250) // 152 to 251
        break;
      case '3':
        slicedList = pokemonList.slice(251, 385) // 252 to 386
        break;
      case '4':
        slicedList = pokemonList.slice(386, 492) // 387 to 493
        break;
      case '5':
        slicedList = pokemonList.slice(493, 648) // 494 to 649
        break;
      case '6':
        slicedList = pokemonList.slice(649, 720) // 650 to 721
        break;
      case '7':
        slicedList = pokemonList.slice(721, 808) // 722 to 809
        break;
      case '8':
        slicedList = pokemonList.slice(809, 904) // 810 to 905
        break;
      default:
        slicedList = pokemonList.slice(0, 150) //1 to 151
        break;
    }
    return UtilityService.randomItemfromArray(slicedList, 10).map(x => x.name)
  }
  
  const generateRandomPokemon = () => {
    setisLoading(true)
    let arr = getRandomPokemon(gen)
    PokemonService.getPokemonData(arr)
      .then((res: any) => {
        setTimeout(() => {
          setRandomPokemon(res)
          setisLoading(false)
        }, 100 * 20)
      })
  } 

  useEffect(() => {
    generateRandomPokemon()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const catchPokemon = (pokemon: PokemonModel) => {

    if (currentTrainer.pokemon.includes(pokemon.name)) {
      setShow(true)
      setModalData({
        title: `Error`,
        body: (
          <>
            <h5>Unable to catch {UtilityService.capitalizeString(pokemon.name)}</h5>
            <p className="p-0 m-0">You already have {UtilityService.capitalizeString(pokemon.name)} in your party</p>
          </>
        )
      })
      return
    }
    if (currentTrainer.pokemon.length === 6) {
      setShow(true)
      setModalData({
        title: `Error`,
        body: (
          <>
            <h5>Unable to catch {UtilityService.capitalizeString(pokemon.name)}</h5>
            <p className="p-0 m-0">You cannot have more than 6 in your party</p>
          </>
        )
      })
      return
    }

    currentTrainer.pokemon.push(pokemon.name)
    
    TrainerService.updateTrainer(currentTrainer)
      .then((trainer: Trainer) => {
        sessionStorage.setItem('currentUser', JSON.stringify([trainer]))
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
        generateRandomPokemon()
      })

  }

  return (
    <>
      <Modal show={show} title={modalData.title} onClose={onClose}>
        { modalData.body }
      </Modal>
      <div className='container-fluid'>
        <section className="row justify-content-center align-items-center">
          { !isLoading ? (
          <>
            <div className="col-12">
              <article className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className='text-center'>Generate Random Pokemon</h2>
                <button onClick={generateRandomPokemon} className="btn btn-secondary">Generate</button>
              </article>
            </div>
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