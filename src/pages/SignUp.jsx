import React from 'react'
import { SignUp as SignUpComponent } from '../components/index'
import signUpBg from '../assets/TechPulse Developer Studio.png' 

/** Page wrapper for the SignUp form component executing the absolute 70:30 full-screen layout. */
function SignUp() {
  return (
    /* Outer grid container spans the full view height across the screen */
    <div className="grid min-h-screen w-full grid-cols-1 bg-slate-950 font-sans antialiased lg:grid-cols-10">
      
      {/* 30% Column: Form Component Container Area */}
      <div className="col-span-1 flex w-full flex-col items-center justify-center border-slate-900 bg-slate-950 px-8 py-12 sm:px-12 lg:col-span-3 lg:border-r lg:px-16">
        <div className="w-full max-w-sm">
          <SignUpComponent />
        </div>
      </div>

      {/* 70% Column: Studio Image Container Area */}
      <div
        className="hidden w-full min-h-full items-center justify-center overflow-hidden bg-[#101827] lg:flex lg:col-span-7"
      >
        <img 
          src={signUpBg} 
          alt="TechPulse Developer Studio" 
          /* 
            FIXED: 
            1. Changed to object-contain to perfectly preserve original image sizing without cropping.
            2. Stripped out luminosity blend modes, filters, opacity steps, and hover animations.       
            object-cover keeps aspect ratio safe.
            object-left pins the laptop and server racks into full view on layout shifts.
          */
          className="block h-full w-full object-cover object-left" 
        />
      </div>

    </div>
  )
}

export default SignUp


// import React from 'react'
// import { SignUp as SignUpComponent } from '../components/index'
// import signUpBg from '../assets/TechPulse Developer Studio.png' 

// /** Page wrapper for the SignUp form component matching the scrolling system layout. */
// function SignUp() {
//   return (
//     <div className="grid min-h-[calc(100vh-64px)] w-full grid-cols-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-sans antialiased lg:grid-cols-10">
//       <div className="col-span-1 flex w-full flex-col items-center justify-center border-slate-800/80 bg-slate-900/60 px-8 py-12 backdrop-blur-xl sm:px-12 lg:col-span-3 lg:border-r lg:px-16">
//         <div className="w-full max-w-sm">
//           <SignUpComponent />
//         </div>
//       </div>

//       <div
//         className="hidden w-full min-h-full items-center justify-center overflow-hidden bg-[#101827] lg:flex lg:col-span-7"
//       >
//         <img 
//           src={signUpBg} 
//           alt="TechPulse Developer Studio" 
//           className="block h-full w-full object-contain object-center"
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