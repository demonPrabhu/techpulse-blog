import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router'

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
    console.log('test', loader);
  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}
