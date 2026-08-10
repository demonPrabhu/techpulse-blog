import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import authService from '../../appwrite/auth'

/** Ends the Appwrite session and clears the logged-in user from Redux. */
export default function LogOutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        // Only clear Redux auth state once the Appwrite session is actually gone.
        authService.logout().then(()=>
        {
            dispatch(logout())
        })
    }

    return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}
