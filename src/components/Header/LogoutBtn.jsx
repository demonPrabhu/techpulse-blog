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
    className='cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-50 hover:text-red-600'
    onClick={logoutHandler}
    >Logout</button>
  )
}
