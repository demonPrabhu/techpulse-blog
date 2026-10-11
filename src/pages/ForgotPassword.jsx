import React from 'react'
import { ForgotPassword as ForgotPasswordComponent } from '../components/index'

/** Page wrapper managing the flat, dark tech theme layout with header and footer intact. */
function ForgotPassword() {
  return (
    /* 
      🚀 THE DARK TECH FULL CANVAS:
      - min-h-[calc(100vh-64px)] keeps the layout balanced between the header and footer bars.
      - Removed all lifecycle side-effects so the global footer displays natively below it.
    */
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 antialiased font-sans relative overflow-hidden py-12">
      
      {/* Subtle Digital Circuit Micro-Grid Mesh Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* ⚡ Glowing Blue & Cyan Ambient Focus Blur Nodes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Flat Open Component Frame (No white/dark box card container) */}
      <div className="w-full max-w-sm z-10 relative">
        <ForgotPasswordComponent />
      </div>

    </div>
  )
}

export default ForgotPassword



// import React from 'react'
// import { Container, ForgotPassword as ForgotPasswordComponent } from '../components/index'

// /** Page wrapper for the ForgotPassword form component. */
// function ForgotPassword() {
//   return (
//     <div>
//       <Container>
//         <ForgotPasswordComponent />
//       </Container>
//     </div>
//   )
// }

// export default ForgotPassword
