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
import Auth from './pages/Auth/Auth';

//Pages
import Pokemon from './pages/Pokemon/Pokemon';
import Trainer from './pages/Trainer/Trainer';

//Services
import { TrainerService } from './services'

function App() {

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

  }, [])

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <main>
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
