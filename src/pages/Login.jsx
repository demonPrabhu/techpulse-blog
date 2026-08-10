import React from 'react'
import {Container, Login as LoginComponent} from '../components/index'

/** Page wrapper for the Login form component. */
function Login() {
  return (
    <div>
      <Container>
        <LoginComponent />
      </Container>
    </div>
  )
}

export default Login