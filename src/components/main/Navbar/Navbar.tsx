import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'

//css
import './Navbar.scss'

//services
import { TrainerService } from '../../../services'
import { NavLink, useLocation, useNavigate, } from 'react-router-dom'

function Navbar({ isLoggedIn, setIsLoggedIn, isNavExpanded, setIsNavExpanded }: any) {

const location = useLocation()
const navigate = useNavigate()
const wrapperRef = useRef<any>()

const OnLogOut = () => {
  TrainerService.logoutTrainer(setIsLoggedIn)
  setIsNavExpanded(false)
  navigate('/')
}

const onLocationChange = (location: any) => {
  setIsNavExpanded(false)
}


useEffect(() => {
  const handleClickOutside = (event: Event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsNavExpanded(false)
    }
  }
  onLocationChange(location)
  document.addEventListener("click", handleClickOutside, false)
  return () => {
    document.removeEventListener("click", handleClickOutside, false)
  }
   // eslint-disable-next-line
}, [location])


return (
    <header ref={wrapperRef} className='d-flex flex-row justify-content-around align-items-center navbar-fixed-top'>
      <div className='p-2 d-flex align-items-center'>
        <h3 className=''>Pokemon Trainer Hub</h3>
      </div>
      <nav className='navbar-new p-2 d-flex align-items-center'>
        <button className="btn p-2 bar-icon" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className={`nav-links ${isNavExpanded ? 'nav-expanded' : ''}`}>
          <li role="button" className='nav-item'>
            <NavLink to='/'>Home</NavLink>
          </li>
          { isLoggedIn ? (
          <>
            <li role="button" className='nav-item'>
              <NavLink to='trainer'>Profile</NavLink>
            </li>
            <li role="button" className='nav-item' onClick={()=> OnLogOut()}>Log Out</li>
          </>
          ) : null }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar