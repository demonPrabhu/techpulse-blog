import React from 'react'
import { SignUp as SignUpComponent } from '../components/index'
import signUpBg from '../assets/TechPulse Developer Studio.png' 

/** Page wrapper for the SignUp form component matching the scrolling system layout. */
function SignUp() {
  return (
    /* Uses dynamic minimal heights to let the global footer render beneath it without clipping */
    <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white min-h-[calc(100vh-64px)]">
      
      {/* LEFT PANEL (30% Grid width): Standard centered container for the form */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 bg-white border-r border-gray-100 w-full">
        <div className="w-full max-w-sm">
          <SignUpComponent />
        </div>
      </div>

      {/* RIGHT PANEL (70% Grid width): High-performance developer visual studio */}
      <div
        className="
          hidden lg:block lg:col-span-7
          w-full min-h-full
          items-center justify-center
          overflow-hidden
          bg-[#101827]
        "
      >
        <img 
          src={signUpBg} 
          alt="TechPulse Developer Studio" 
          className="block h-full w-full object-contain object-center"
        />
      </div>

    </div>
  )
}

export default SignUp



// import React, { useEffect } from 'react'
// import { SignUp as SignUpComponent } from '../components/index'
// import signUpBg from '../assets/TechPulse Developer Studio.png'

// /** Page wrapper for the SignUp form component. */
// function SignUp() {
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
//       {/* LEFT PANEL: 30% Width — Signup Form */}
//       <div
//         className="
//           col-span-1 lg:col-span-3
//           flex flex-col justify-center items-center
//           w-full min-h-full
//           px-6 py-8 sm:px-12 lg:px-10 xl:px-16
//           bg-white border-r border-gray-100
//           overflow-y-auto
//         "
//       >
//         <div className="w-full max-w-sm my-auto">
//           <SignUpComponent />
//         </div>
//       </div>

//       {/* RIGHT PANEL: 70% Width — Full Image */}
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
//           src={signUpBg}
//           alt="TechPulse developer workspace"
//           className="
//             block h-full w-full
//             object-contain object-center
//           "
//         />
//       </div>
//     </div>
//   )
// }

// export default SignUp


// import React, { useEffect } from 'react'
// import { SignUp as SignUpComponent } from '../components/index'
// import signUpBg from '../assets/TechPulse Developer Studio.png' 

// /** Page wrapper for the SignUp form component. */
// function SignUp() {
//   useEffect(() => {
//     const footer = document.querySelector('footer')
//     if (footer) footer.style.display = 'none'
//     return () => {
//       if (footer) footer.style.display = 'block'
//     }
//   }, [])

//   return (
//     <div className="w-full grid grid-cols-1 lg:grid-cols-10 antialiased font-sans bg-white h-[calc(100vh-64px)] overflow-hidden">
      
//       {/* LEFT PANEL: 30% Width */}
//       {/* Added top/bottom padding constraints to ensure the form stays clear of the header navbar on small windows */}
//       <div className="col-span-1 lg:col-span-3 flex flex-col justify-start lg:justify-center items-center px-8 sm:px-12 lg:px-16 bg-white border-r border-gray-100 h-full w-full overflow-y-auto pt-8 pb-12 lg:pt-0 lg:pb-0">
//         <div className="w-full max-w-sm my-auto">
//           <SignUpComponent />
//         </div>
//       </div>

//       {/* RIGHT PANEL: 70% Width */}
//       {/* 
//         🚀 THE DECREASED SCREEN SIZE IMAGE FIX:
//         Swapped bg-contain out for bg-cover to eliminate background voids. 
//         Shifted position focus to bg-[78%_center] to lock the visual text firmly on the left margin frame.
//       */}
//       <div 
//         style={{ backgroundImage: `url(${signUpBg})` }}
//         className="hidden lg:block lg:col-span-7 bg-cover bg-[78%_center] bg-no-repeat h-full w-full"
//       />

//     </div>
//   )
// }

// export default SignUp



// import React from 'react'
// import { SignUp as SignUpComponent } from '../components/index'
// import signUpBg from '../assets/TechPulse Developer Studio'

// /** Page wrapper for the SignUp form component. */
// function SignUp() {
//   return (
//     <div>
//       <SignUpComponent />
//     </div>
//   )
// }

// export default SignUp