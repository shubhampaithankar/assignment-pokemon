import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

//css
import './Sidebar.scss'

function Sidebar() {
  const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar']

  const location = useLocation()

  let gen = Number(location.pathname.split('').pop())
  const [activeLink, setActiveLink] = useState(gen)

  const isActive = (i:number) => {
    if (activeLink === (i+1) && location.pathname.startsWith(`/pokemon/`)) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (location.pathname.startsWith('/pokemon')) {
      setActiveLink(gen)
    }
  }, [location.pathname, gen, activeLink]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <aside className='d-flex flex-column align-items-center'>
      <h3 className='p-2'>Find Pokemon</h3>
      <ul className='sidenav'>
        { regions.map((region, i) => {
          return (
            <li key={i} className={`${isActive(i) ? 'active-li' : ''}  sidenav-item`} role='button'>
              <NavLink to={`pokemon/${i + 1}`}>{region}</NavLink>
            </li>
          )
        }) }
      </ul>
    </aside>
  )
}

export default Sidebar