import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'

//css
import './Navbar.scss'

//services
import { TrainerService } from '../../../services'
import { NavLink, useNavigate, } from 'react-router-dom'

function Navbar({ isLoggedIn, setIsLoggedIn, isNavExpanded, setIsNavExpanded }: any) {

const navigate = useNavigate()
const wrapperRef = useRef<any>()

const OnLogOut = () => {
  TrainerService.logoutTrainer(setIsLoggedIn)
  setIsNavExpanded(false)
  navigate('/')
}

const handleClickOutside = (event: Event) => {
  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    setIsNavExpanded(false)
  }
}

useEffect(() => {
  document.addEventListener("click", handleClickOutside, false)
  document.addEventListener("scroll", handleClickOutside, { passive: true })
  return () => {
    document.removeEventListener("click", handleClickOutside, false)
    document.removeEventListener("scroll", handleClickOutside, false)
  }
})


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