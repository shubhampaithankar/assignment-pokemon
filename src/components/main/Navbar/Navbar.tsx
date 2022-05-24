import React from 'react'

//css
import './Navbar.scss'

//services
import { AuthenticationService } from '../../../services'
import { Link, useNavigate, } from 'react-router-dom'

function Navbar({ isLoggedIn, setIsLoggedIn }: any) {
  const navigate = useNavigate()

  const OnLogOut = () => {
    AuthenticationService.logout(setIsLoggedIn)
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
              <Link to='/'>Home</Link>
            </li>
            {  isLoggedIn ? (
              <>
                <li role="button" className='nav-item'>
                  <Link to='/trainer'>Profile</Link>
                </li>
                <li role="button" className='nav-item' onClick={() => OnLogOut()}>Log Out</li>
              </>
            ) :  null }
          </ul>
        </nav>
    </header>
  )
}

export default Navbar

// const Dropdown = (name: any) => {
//   return (
//     <>
//       <label>
//         Trainer: {name}
//         <select onChange={() => {}}>
//           <option value="myPokemon">My Pokemon</option>
//           <option value="settings">Settings</option>
//           <hr />
//           <option value="logout">LogOut</option>
//         </select>
//       </label>
//     </>
//   )
// }