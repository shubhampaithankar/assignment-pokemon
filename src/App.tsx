//Packages
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

//css
import './App.scss';

//Components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

//Pages
import Auth from './pages/Auth/Auth';
import Pokemon from './pages/Pokemon/Pokemon';
import Trainer from './pages/Trainer/Trainer';

//Services
import { TrainerService, PokemonService } from './services'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    TrainerService.setDefaultConfig()

    const localTrainers = JSON.parse(localStorage.getItem('trainers') as string)
    TrainerService.getAllTrainers().then(apiTrainers => {
      // console.log(`getting all trainers`)
      if (localTrainers === null || localTrainers.length === 0) {
        // console.log(`trainers not found, adding from api`)
        localStorage.setItem('trainers', JSON.stringify(apiTrainers))
      } else {
        // console.log(`trainers found`)
        if (JSON.stringify(localTrainers) !== JSON.stringify(apiTrainers)) {
          localStorage.setItem('trainers', JSON.stringify(apiTrainers))
          // console.log(`trainers not updated, updating from api`)
        }
      }
    })

    const localPokemon = JSON.parse(localStorage.getItem(`pokemonList`) as string)
    PokemonService.getPokemonsList().then((apiPokemon) => {
      // console.log(`getting all pokemon`)
      if (!localPokemon) {
        // console.log(`pokemon not found, adding from api`)
        localStorage.setItem('pokemonList', JSON.stringify(apiPokemon))
      } else {
        // console.log(`pokemon found`)
        if (JSON.stringify(localPokemon) !== JSON.stringify(apiPokemon)) {
          localStorage.setItem('pokemonList', JSON.stringify(apiPokemon))
          // console.log(`pokemon not updated, updating from api`)
        }
      }
    })
    setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn') as string) ? JSON.parse(localStorage.getItem('isLoggedIn') as string) : false )
  }, [])

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      { isLoggedIn ? (<Sidebar />) : null}
      <main className={ isLoggedIn ? 'logged-in' : '' }>
      <Routes>
          <Route path='/' element={<Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}  />
          <Route path='/pokemon/:gen' element={<Pokemon isLoggedIn={isLoggedIn} />} />
          <Route path='/trainer' element={<Trainer isLoggedIn={isLoggedIn} />} />  
          <Route path='*' />      
        </Routes>
      </main>
    </Router>
  )

}

export default App;
