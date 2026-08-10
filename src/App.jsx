import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./features/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

/**
 * Root layout: restores the Appwrite session on load, syncs it into Redux,
 * then renders the shared Header/Footer around the routed page (Outlet).
 */
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // Check for an existing Appwrite session on first load so refreshing
  // the page doesn't drop the user back to a logged-out state.
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // Hold rendering until the auth check resolves, so protected routes
  // don't briefly flash the logged-out UI before redirecting.
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
