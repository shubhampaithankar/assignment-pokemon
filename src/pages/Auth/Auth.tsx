import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthenticationService } from '../../services'

//css
import './Auth.scss'

function Auth({ isLoggedIn, setIsLoggedIn }: any) {

  
  const navigate = useNavigate()
  
  const [authLogin, setauthLogin] = useState(true)

  const OnAuthLoginClick = () => {
    setauthLogin(!authLogin)
  }

  const HandleLogin = (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target)
    let username = data.get('username')
    AuthenticationService.login(username, setIsLoggedIn) ? navigate('/pokemon') : alert(`User does not exist`);
  }

  const HandleRegister = (e: any) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const username = data.get('username')
    const confirmUsername = data.get('confirm-username')

    if (username !== confirmUsername) return alert(`Usernames dont match`)

    AuthenticationService.register(username) ? setauthLogin(true) : alert('Username is taken')
  }

  return (
    <>
      { isLoggedIn ? <Navigate to='/pokemon' /> : (
          <div className="container-fluid">
            <section className="row justify-content-center align-items-center">
              <div className="col-12">
                <article className='d-flex flex-column justify-content-center align-items-center'>
                  <div className="form-box text-center">
                    { authLogin ?
                    <LoginForm HandleLogin={HandleLogin} /> :
                    <RegisterForm HandleRegister={HandleRegister} /> }
                    <p className='m-0' role='button' onClick={()=> OnAuthLoginClick()}>
                      { authLogin ? 'New Trainer? Register' : 'Existing Trainer? Login' }
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>
      ) }
    </>
  )
}

export default Auth

const LoginForm = ({HandleLogin} : any) => {
  return (
    <>
      <form onSubmit={(e) => HandleLogin(e)} className=''>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor='username'>Username</label>
          <input className='form-control' type='text' name='username' id='username' required/>
        </div>
        <div className='form-group mx-2 my-3'>
          <input className='btn btn-secondary' type='submit' name='' id='' value='Login'/>
        </div>
      </form>
    </>
  )
}

const RegisterForm = ({HandleRegister}: any) => {
  return (
    <>
      <form onSubmit={(e) => HandleRegister(e)}  className=''>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor='username'>Username</label>
          <input className='form-control' type='text' name='username' id='username' required/>
        </div>
        <div className='form-group mx-2 my-2'>
          <label className='form-label' htmlFor='confirm-username'>Confirm Username</label>
          <input className='form-control' type='text' name='confirm-username' id='confirm-username' required/>
        </div>
        <div className='form-group m-2 my-3'>
          <input className='btn btn-secondary' type='submit' name='' id='' value='Login'/>
        </div>
      </form>
    </>
  )
}