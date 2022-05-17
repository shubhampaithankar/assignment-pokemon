import React from 'react'

//css
import './Sidebar.scss'

function Sidebar() {
  return (
    <aside className='d-flex flex-column align-items-center'>
      <h3 className='p-2'>Find Pokemon</h3>
      <ul className='sidenav'>
        <li className='sidenav-item' role='button'>Gen I</li>
        <li className='sidenav-item' role='button'>Gen II</li>
        <li className='sidenav-item' role='button'>Gen III</li>
        <li className='sidenav-item' role='button'>Gen IV</li>
        <li className='sidenav-item' role='button'>Gen V</li>
        <li className='sidenav-item' role='button'>Gen VI</li>
        <li className='sidenav-item' role='button'>Gen VII</li>
        <li className='sidenav-item' role='button'>Gen VIII</li>
      </ul>
    </aside>
  )
}

export default Sidebar