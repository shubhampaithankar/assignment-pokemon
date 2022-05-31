import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../components/common'
import { TrainerService } from '../../services'

//css
import './Auth.scss'

function Auth({ isLoggedIn, setIsLoggedIn }: any) {

  const navigate = useNavigate()

  const [authLogin, setauthLogin] = useState(true)

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    body: <></>
  })

  const onClose = () => {
    setShow(false)
  }

  const OnAuthLoginClick = () => {
    setauthLogin(!authLogin)
  }

  const HandleLogin = (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target)
    let username = data.get('username')
    if (TrainerService.loginTrainer(username, setIsLoggedIn)) { 
      navigate('/pokemon/1')
    } else {
      setShow(true)
      setModalData({
        title: `Unable to login`,
        body: (
          <>
            <h5>User does not exist</h5>
          </>
        )
      })
      return
    }
  }

  const HandleRegister = (e: any) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const username = data.get('username')
    const confirmUsername = data.get('confirm-username')

    if (username !== confirmUsername) {
      setShow(true)
      setModalData({
        title: `Unable to create user`,
        body: (
          <>
            <h5>Usernames dont match</h5>
          </>
        )
      })
      return
    }

    if (TrainerService.createTrainer(username)) {
      setauthLogin(true)
      setShow(true)
      setModalData({
        title: `Success`,
        body: (
          <>
            <h5>Please login with your username</h5>
          </>
        )
      })
    } else {
      setShow(true)
      setModalData({
        title: `Unable to create user`,
        body: (
          <>
            <h5>Username is taken</h5>
          </>
        )
      })
      return
    }
  }

  useEffect(() => {
    isLoggedIn ? navigate(`/pokemon/1`) : navigate('')
  }, [isLoggedIn, navigate])

  return (
    <>
      <div className="container-fluid">
        <Modal show={show} title={modalData.title} onClose={onClose}>
          { modalData.body }
        </Modal>
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