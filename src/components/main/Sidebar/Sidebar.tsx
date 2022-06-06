import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEarthAsia, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

//css
import './Sidebar.scss'

function Sidebar({ isSidebarExpanded, setIsSidebarExpanded }: any) {
  const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar']

  const location = useLocation()
  const wrapperRef = useRef<any>()
  const [isSidenavOpen, setIsSidenavOpen] = useState(false)

  let gen = Number(location.pathname.split('').pop())
  const [activeLink, setActiveLink] = useState(gen)

  const isActive = (i: number) => {
    if (activeLink === (i + 1) && location.pathname.startsWith(`/pokemon/`)) {
      return true
    } else {
      return false
    }
  }

  const onLocationChange = (location: any) => {
    setIsSidenavOpen(false)
  }

  useEffect(() => {
    if (location.pathname.startsWith('/pokemon')) {
      setActiveLink(gen)
    }
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsSidenavOpen(false)
      }
    }
    onLocationChange(location)
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
     // eslint-disable-next-line
  }, [location.pathname, gen, activeLink]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <aside ref={wrapperRef}>
      <nav className={`sidenav ${isSidenavOpen ? 'open-sidenav': ''} ${isSidebarExpanded ? 'expanded-sidenav' : ''}`}>
        <h3 className="sidenav-title my-2">Find Pokemon</h3>
        <ul className={`sidenav-links`}>
          { regions.map((region, i) => {
          return (
          <li key={i} className={`sidenav-item ${isActive(i) ? 'active-li' : '' }`} role='button'>
            <NavLink to={`pokemon/${i + 1}`}>{region}</NavLink>
          </li>
          )
          }) }
        </ul>
      </nav>
      <button className='btn expand-btn' style={isSidebarExpanded ? { left: '220px' } : {}} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
        <FontAwesomeIcon icon={faArrowLeft} flip={!isSidebarExpanded ? 'horizontal' : undefined}/>
      </button>
      <button className="btn navbar-btn" onClick={()=> setIsSidenavOpen(!isSidenavOpen)}>
        <FontAwesomeIcon icon={faEarthAsia} size="lg"/>
      </button>
    </aside>
  )
}

export default Sidebar
/* <button className={`btn toggle-btn py-2 px-1`} style={ isSidebarExpanded ? { left : '220px' } : { left: '0' }}
onClick={()=> setIsSidebarExpanded(!isSidebarExpanded)}>{ isSidebarExpanded ? '<' : '>' }</button> */