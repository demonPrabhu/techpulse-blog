import React from 'react'
import { Login as LoginComponent } from '../components/index'
import loginBg from '../assets/TechPulse_ Building What’s Next.png'

/** Page wrapper for the Login form component. */
function Login() {
  return (
    /* Calculates viewport height minus the navbar height to eliminate scrollbars */
    <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white h-[calc(100vh-64px)] overflow-hidden">
      
      {/* LEFT PANEL: 70% Width */}
      <div 
        style={{ backgroundImage: `url(${loginBg})` }}
        className="hidden lg:block lg:col-span-7 bg-cover bg-center h-full w-full"
      />

      {/* RIGHT PANEL: Full 30% Width panel area layout with clean alignment */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 bg-white border-l border-gray-100 h-full w-full overflow-y-auto">
        <div className="w-full max-w-sm">
          <LoginComponent />
        </div>
      </div>

    </div>
  )
}

export default Login




// import React from 'react'
// import {Container, Login as LoginComponent} from '../components/index'
// import loginBg from '../assets/assets/TechPulse_ Building What’s Next.png'

// /** Page wrapper for the Login form component. */
// function Login() {
//   return (
//     <div>
//       <Container>
//         <LoginComponent />
//       </Container>
//     </div>
//   )
// }

// export default Login