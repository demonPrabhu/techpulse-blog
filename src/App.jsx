import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./features/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

/** Root layout wrapper */
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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

  return !loading ? (
    /* 1. Base wrapper governs screen-wide positioning context and theme */
    <div className="relative isolate min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col">
      
      {/* 2. Global Decorative Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"
        />
        {/* Glow Anchors locked relative to global viewport center bounds */}
        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 w-full max-w-7xl h-full top-0">
          <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
      </div>

      {/* 3. True Application UI Stack */}
      <div className="relative z-10 flex flex-col min-h-screen w-full flex-grow">
        <Header />
        
        {/* The child sub-routes automatically expand vertically using flex-grow */}
        <main className="flex-grow w-full flex flex-col">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  ) : null
}

export default App



// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import authService from "./appwrite/auth"
// import { login, logout } from "./features/authSlice"
// import { Footer, Header } from './components'
// import { Outlet } from 'react-router-dom'

// /** Root layout wrapper */
// function App() {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData) => {
//       if (userData) {
//         dispatch(login({userData}))
//       } else {
//         dispatch(logout())
//       }
//     })
//     .finally(() => setLoading(false))
//   }, [])

//   return !loading ? (
//     <div className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"
//       />
//       <div className="relative z-10 flex min-h-screen w-full flex-col">
//         <Header />
//         <main className="flex-grow w-full">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App



// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import authService from "./appwrite/auth"
// import {login, logout} from "./features/authSlice"
// import { Footer, Header } from './components'
// import { Outlet } from 'react-router-dom'

// /**
//  * Root layout: restores the Appwrite session on load, syncs it into Redux,
//  * then renders the shared Header/Footer around the routed page (Outlet).
//  */
// function App() {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()

//   // Check for an existing Appwrite session on first load so refreshing
//   // the page doesn't drop the user back to a logged-out state.
//   useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData) => {
//       if (userData) {
//         dispatch(login({userData}))
//       } else {
//         dispatch(logout())
//       }
//     })
//     .finally(() => setLoading(false))
//   }, [])

//   // Hold rendering until the auth check resolves, so protected routes
//   // don't briefly flash the logged-out UI before redirecting.
//   return !loading ? (
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//       <div className='w-full block'>
//         <Header />
//         <main>
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App
