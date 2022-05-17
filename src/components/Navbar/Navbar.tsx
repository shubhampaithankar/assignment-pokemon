import React from 'react'

//css
import './Navbar.scss'

function Navbar() {
  return (
    <header className='d-flex flex-row justify-content-around align-items-center navbar-fixed-top'>
        <div className='brand p-2 d-flex align-items-center'>
          <img src="assets/images/brand-logo.png" alt="pokemon-logo" />
        </div>
        <nav className='navbar-new p-2'>
          <ul className='nav-links d-flex flew-row'>
            <li role="button" className='nav-item'>Home</li>
            <li role="button" className='nav-item'>Profile</li>
            <li role="button" className='nav-item'>Log Out</li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar