import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

//css
import './Sidebar.scss'

function Sidebar({ isSidebarExpanded, setIsSidebarExpanded }: any) {
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
    <aside>
      <div className={`sidebar-div ${isSidebarExpanded ? 'expanded' : 'closed'}`}>
        <div className='d-flex flex-column align-items-center'>
          <h3 className='p-2'>Find Pokemon</h3>
          <ul className='sidenav'>
            { regions.map((region, i) => {
              return (
                <li key={i} className={`sidenav-item ${isActive(i) ? 'active-li' : ''}`} role='button'>
                  <NavLink to={`pokemon/${i + 1}`}>{region}</NavLink>
                </li>
              )
            }) }
          </ul>
        </div>
      </div>
      <button className={`btn toggle-btn py-2 px-1`} style={ isSidebarExpanded ? { left : '220px' } : { left: '0' }} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>{ isSidebarExpanded ? '<' : '>' }</button>
    </aside>
  )
}

export default Sidebar