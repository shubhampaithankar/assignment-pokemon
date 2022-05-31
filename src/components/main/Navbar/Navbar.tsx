import React from 'react'

//css
import './Navbar.scss'

//services
import { TrainerService } from '../../../services'
import { NavLink, useNavigate, } from 'react-router-dom'

function Navbar({ isLoggedIn, setIsLoggedIn }: any) {
  const navigate = useNavigate()

  const OnLogOut = () => {
    TrainerService.logoutTrainer(setIsLoggedIn)
    navigate('/')
  }
  return (
    <header className='d-flex flex-row justify-content-around align-items-center navbar-fixed-top'>
        <div className='brand p-2 d-flex align-items-center'>
          <img src="assets/images/brand-logo.png" alt="pokemon-logo" />
        </div>
        <nav className='navbar-new p-2'>
          <ul className='nav-links d-flex flew-row'>
            <li role="button" className='nav-item'>
              <NavLink to='/'>Home</NavLink>
            </li>
            {  isLoggedIn ? (
              <>
                <li role="button" className='nav-item'>
                  <NavLink to='trainer'>Profile</NavLink>
                </li>
                <li role="button" className='nav-item' onClick={() => OnLogOut()}>Log Out</li>
              </>
            ) :  null }
          </ul>
          <Dropdown name={'ash'} />
        </nav>
    </header>
  )
}

export default Navbar
const Dropdown = (name: any) => {
  return (
    <>
    </>
  )
}