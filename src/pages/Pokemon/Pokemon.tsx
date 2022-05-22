import React from 'react'
import { Navigate } from 'react-router-dom'


function Pokemon({ isLoggedIn } : any) {

  return (
    <>
      { isLoggedIn ? (<></>) : (<Navigate to='/' />)}
    </>
  )
}

export default Pokemon