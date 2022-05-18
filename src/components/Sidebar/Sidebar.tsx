import React from 'react'
import { Link } from 'react-router-dom'

//css
import './Sidebar.scss'

function Sidebar() {
  const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar']
  return (
    <aside className='d-flex flex-column align-items-center'>
      <h3 className='p-2'>Find Pokemon</h3>
      <ul className='sidenav'>
        { regions.map((region, i) => {
          return (
            <li key={i} className='sidenav-item' role='button'>
              <Link to={`/pokemon?${i + 1}`}>{region}</Link>
            </li>
          )
        }) }
      </ul>
    </aside>
  )
}

export default Sidebar