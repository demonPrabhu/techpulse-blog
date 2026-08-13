import React from 'react'
import { Container, ForgotPassword as ForgotPasswordComponent } from '../components/index'

/** Page wrapper for the ForgotPassword form component. */
function ForgotPassword() {
  return (
    <div>
      <Container>
        <ForgotPasswordComponent />
      </Container>
    </div>
  )
}

export default ForgotPassword
