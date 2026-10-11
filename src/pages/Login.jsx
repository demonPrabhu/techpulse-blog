import React from 'react'
import { Login as LoginComponent } from '../components/index'
import loginBg from '../assets/TechPulse_ Building What’s Next.png'

/** Page wrapper for the Login form component matching the scrolling system layout. */
function Login() {
  return (
    /* Uses dynamic minimal heights to let the global footer render beneath it without clipping */
    <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white min-h-[calc(100vh-64px)]">
      
      {/* LEFT PANEL: 70% Width */}
      <div
        className="
          hidden lg:flex lg:col-span-7
          w-full min-h-full
          items-center justify-center
          overflow-hidden
          bg-[#101827]
        "
      >
        <img
          src={loginBg}
          alt="TechPulse developer workspace"
          className="block h-full w-full object-contain object-center"
        />
      </div>

      {/* RIGHT PANEL: 30% Width */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center items-center w-full px-6 py-12 sm:px-12 lg:px-10 xl:px-16 bg-white border-l border-gray-100">
        <div className="w-full max-w-sm">
          <LoginComponent />
        </div>
      </div>

    </div>
  )
}

export default Login


// import React, { useEffect } from 'react'
// import { Login as LoginComponent } from '../components/index'
// import loginBg from '../assets/TechPulse_ Building What’s Next.png'

// /** Page wrapper for the Login form component. */
// function Login() {
//   useEffect(() => {
//     const footer = document.querySelector('footer')

//     if (footer) footer.style.display = 'none'

//     return () => {
//       if (footer) footer.style.display = 'block'
//     }
//   }, [])

//   return (
//     <div
//       className="
//         grid grid-cols-1 lg:grid-cols-10
//         w-full min-h-[calc(100dvh-64px)]
//         font-sans antialiased bg-white
//         lg:h-[calc(100dvh-64px)]
//         lg:overflow-hidden
//       "
//     >
//       {/* LEFT PANEL: 70% Width — Full Image */}
//       <div
//         className="
//           hidden lg:flex lg:col-span-7
//           h-full w-full
//           items-center justify-center
//           overflow-hidden
//           bg-[#101827]
//         "
//       >
//         <img
//           src={loginBg}
//           alt="TechPulse developer workspace"
//           className="
//             block h-full w-full
//             object-contain object-center
//           "
//         />
//       </div>

//       {/* RIGHT PANEL: 30% Width — Login Form */}
//       <div
//         className="
//           col-span-1 lg:col-span-3
//           flex flex-col justify-center items-center
//           w-full min-h-full
//           px-6 py-8 sm:px-12 lg:px-10 xl:px-16
//           bg-white border-l border-gray-100
//           overflow-y-auto
//         "
//       >
//         <div className="w-full max-w-sm my-auto">
//           <LoginComponent />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


// import React, { useEffect } from 'react'
// import { Login as LoginComponent } from '../components/index'
// import loginBg from '../assets/TechPulse_ Building What’s Next.png'

// /** Page wrapper for the Login form component. */
// function Login() {
//   useEffect(() => {
//     const footer = document.querySelector('footer')
//     if (footer) footer.style.display = 'none'
//     return () => {
//       if (footer) footer.style.display = 'block'
//     }
//   }, [])

//   return (
//     <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white h-[calc(100vh-64px)] overflow-hidden">
      
//       {/* LEFT PANEL: 70% Width */}
//       {/* 
//         🚀 THE SMALL SCREEN IMAGE FIX:
//         Uses bg-cover to eliminate black voids, but shifts the alignment focus 
//         to bg-[20%_center] so the text is fully visible on the right side of the image.
//       */}
//       <div 
//         style={{ backgroundImage: `url(${loginBg})` }}
//         className="hidden lg:block lg:col-span-7 bg-cover bg-[20%_center] bg-no-repeat h-full w-full"
//       />

//       {/* RIGHT PANEL: 30% Width */}
//       {/* Added pt-8 pb-12 to ensure the header text doesn't clip into the navbar on short screens */}
//       <div className="col-span-1 lg:col-span-3 flex flex-col justify-start lg:justify-center items-center px-8 sm:px-12 lg:px-16 bg-white border-l border-gray-100 h-full w-full overflow-y-auto pt-8 pb-12 lg:pt-0 lg:pb-0">
//         <div className="w-full max-w-sm my-auto">
//           <LoginComponent />
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Login



// import React from 'react'
// import { Login as LoginComponent } from '../components/index'
// import loginBg from '../assets/TechPulse_ Building What’s Next.png'

// /** Page wrapper for the Login form component. */
// function Login() {
//   return (
//     /* Calculates viewport height minus the navbar height to eliminate scrollbars */
//     <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white h-[calc(100vh-64px)] overflow-hidden">
      
//       {/* LEFT PANEL: 70% Width */}
//       <div 
//         style={{ backgroundImage: `url(${loginBg})` }}
//         className="hidden lg:block lg:col-span-7 bg-cover bg-center h-full w-full"
//       />

//       {/* RIGHT PANEL: Full 30% Width panel area layout with clean alignment */}
//       <div className="col-span-1 lg:col-span-3 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 bg-white border-l border-gray-100 h-full w-full overflow-y-auto">
//         <div className="w-full max-w-sm">
//           <LoginComponent />
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Login




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