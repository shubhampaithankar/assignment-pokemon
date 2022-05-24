import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = (props: any) => {

    const useAuth = () => {
        return JSON.parse(sessionStorage.getItem('isLoggedIn') as string) && !!JSON.parse(sessionStorage.getItem('currentUser') as string) ? true : false
    }
    const auth = useAuth()

    return auth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes