//Packages
import { useEffect } from 'react';
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

  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') as string)

  useEffect(() => {

    TrainerService.setDefaultConfig()

    const localTrainers = JSON.parse(localStorage.getItem('trainers') as string)
    TrainerService.getAllTrainers().then(apiTrainers => {
      if (localTrainers === null || localTrainers.length === 0) {
        console.log(`trainers not found, adding from api`)
        localStorage.setItem('trainers', JSON.stringify(apiTrainers))
      } else {
        console.log(`trainers found`)
        if (JSON.stringify(localTrainers) !== JSON.stringify(apiTrainers)) {
          localStorage.setItem('trainers', JSON.stringify(apiTrainers))
          console.log(`trainers not updated, updating from api`)
        }
      }
    })

    const localPokemon = JSON.parse(localStorage.getItem(`pokemonList`) as string)
    PokemonService.getPokemonsList().then((apiPokemon) => {
      if (!localPokemon) {
        console.log(`pokemon not found, adding from api`)
        localStorage.setItem('pokemonList', JSON.stringify(apiPokemon))
      } else {
        console.log(`pokemon found`)
        if (JSON.stringify(localPokemon) !== JSON.stringify(apiPokemon)) {
          localStorage.setItem('pokemonList', JSON.stringify(apiPokemon))
          console.log(`pokemon not updated, updating from api`)
        }
      }
    })

  }, [])

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn}/>
      { isLoggedIn ? (<Sidebar />) : null}
      <main className={ isLoggedIn ? 'logged-in' : '' }>
      <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/pokemon' element={<Pokemon />} />
          <Route path='/trainer' element={<Trainer />} />        
        </Routes>
      </main>
    </Router>
  )

}

export default App;
