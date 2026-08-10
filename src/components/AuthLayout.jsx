import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router'

/**
 * Route guard: redirects to /login when a protected page is visited while
 * logged out, or to / when a guest-only page (login/signup) is visited
 * while already logged in. `authentication` sets which case applies.
 */
export default function Protected({children, authentication=true}) {
  const authStatus = useSelector((state) => state.auth.status )

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication ){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  // Block rendering until the redirect check above has run once, so
  // protected content never flashes before the redirect kicks in.
  return loader ? null : <>{children}</>
}
