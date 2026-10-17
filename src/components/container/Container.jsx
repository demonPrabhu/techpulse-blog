import React from 'react'

/** Centers page content and caps its width globally across the application views */
export default function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 flex flex-col flex-grow">
      {children}
    </div>
  )
}


// import React from 'react'

// /** Centers page content and caps its width; automatically expands to fill the screen. */
// export default function Container({ children }) {
//   return (
//     <div className="relative isolate flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      
//       {/* Global Background Grid Pattern */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"
//       />

//       {/* Decorative Glow Wrapper: Locks coordinates to the 7xl text bounds */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto w-full max-w-7xl">
//         <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
//         <div className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
//       </div>

//       {/* Content Layer */}
//       <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4">
//         {children}
//       </div>
//     </div>
//   )
// }


// import React from 'react'

// /** Centers page content and caps its width; used to wrap each page's main content. */
// export default function Container({ children }) {
//   return (
//     <div className="relative isolate min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
//       />
//       <div className="relative z-10 mx-auto w-full max-w-7xl px-4">{children}</div>
//     </div>
//   )
// }
