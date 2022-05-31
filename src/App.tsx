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
import { Navbar, Sidebar, Footer } from './components/main/'

//Models
// import { Trainer as currentTrainer } from './models';

//Pages
import Auth from './pages/Auth/Auth';
import Pokemon from './pages/Pokemon/Pokemon';
import Trainer from './pages/Trainer/Trainer';
import ProtectedRoutes from './routes/ProtectedRoutes';

//Services
import { TrainerService, PokemonService } from './services'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    TrainerService.setDefaults()
    PokemonService.setDefaults()
    
    setIsLoggedIn(JSON.parse(sessionStorage.getItem('isLoggedIn') as string) != null ? JSON.parse(sessionStorage.getItem('isLoggedIn') as string) : false )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      { isLoggedIn ? (<Sidebar isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>) : null }
      <main className={isSidebarExpanded && isLoggedIn ? 'expanded-sidebar' : '' }>
        <Routes>
          <Route path='/'>
            <Route index element={<Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='pokemon'>
                <Route path=':gen' element={<Pokemon />} />
                <Route index element={<Pokemon />} />
              </Route>
              <Route path='trainer'>
                <Route index element={<Trainer />} />
              </Route>
            </Route>
            <Route path='*' element={<>404 - Page not found</>}/>
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  )

}

export default App;
