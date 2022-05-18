import React, { useEffect, useState } from 'react'
import { AuthenticationService } from '../../services'

//css
import './Auth.scss'

function Auth() {
  const [authLogin, setauthLogin] = useState(true)

  useEffect(() => {
    AuthenticationService.login({username: 'ash'}) ? (console.log(true)) : (console.log(false))
  })
  
  const OnAuthLoginClick = () => {
    setauthLogin(!authLogin)
  }

  return (
    <div className="container-fluid">
      <section className="row justify-content-center align-items-center">
        <div className="col-12">
          <article className='d-flex flex-column justify-content-center align-items-center'>
            <div className="form-box text-center">
              { authLogin ?
              <LoginForm /> :
              <RegisterForm /> }
              <p className='m-0' role='button' onClick={()=> OnAuthLoginClick()}>
                { authLogin ? 'New Trainer? Register Here' : 'Existing Trainer? Login' }
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Auth

const LoginForm = () => {
  return (
    <>
      <form className=''>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor=''>Username</label>
          <input className='form-control' type='text' name='' id=''/>
        </div>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor=''>Password</label>
          <input className='form-control' type='password' name='' id=''/>
        </div>
        <div className='form-group mx-2 my-3'>
          <input className='btn btn-secondary' type='submit' name='' id='' value='Login'/>
        </div>
      </form>
    </>
  )
}

const RegisterForm = () => {
  return (
    <>
      <form className=''>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor=''>Username</label>
          <input className='form-control' type='text' name='' id=''/>
        </div>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor=''>Password</label>
          <input className='form-control' type='password' name='' id=''/>
        </div>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor=''>Confirm Password</label>
          <input className='form-control' type='password' name='' id=''/>
        </div>
        <div className='form-group m-2 my-3'>
          <input className='btn btn-secondary' type='submit' name='' id='' value='Login'/>
        </div>
      </form>
    </>
  )
}