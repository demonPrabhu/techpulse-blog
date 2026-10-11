import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'

/** Site footer: features a high-tech midnight layout with visible, clean logo framing. */
function Footer() {
  return (
    /* 🚀 THE FIXED FOOTER BACKDROP
       - Swapped the old flat bg-gray-400 out for a rich midnight panel (bg-slate-950).
       - Changed the solid thick border to a clean subtle grid line border-t border-slate-800/60.
    */
    <section className="relative overflow-hidden py-12 bg-slate-950 border-t border-slate-800/60 shadow-inner select-none">
        {/* Deep background ambient glowing mesh layer node */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-m-6 flex flex-wrap items-center justify-between">
                
                {/* Left Side Details Column */}
                <div className="w-full p-6 md:w-1/2">
                    <div className="flex h-full flex-col justify-between space-y-4">
                        <div className="inline-flex items-center">
                            <Link to='/' className="inline-flex items-center gap-2 group">
                                {/* Adjusted width and passed rectangular variant prop cleanly */}
                                <Logo width="40px" variant="rectangular" />
                                <span className="font-extrabold text-xl text-white tracking-tight group-hover:text-blue-400 transition-colors duration-200">
                                    TechPulse
                                </span>
                            </Link>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-medium">
                                TechPulse — a blog platform built with React, Redux Toolkit &amp; Appwrite
                            </p>
                            <p className="mt-1 text-xs text-slate-500 font-mono tracking-wide">
                                &copy; 2026 Prabhat Bhatia. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right Side Details Column */}
                <div className="w-full p-6 md:w-1/2">
                    <div className="h-full md:text-right">
                        <h3 className="tracking-widest mb-4 text-xs font-bold uppercase text-slate-500 font-mono">
                            Connect
                        </h3>
                        <ul className="flex flex-col md:items-end gap-3">
                            <li>
                                <a
                                    className="text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5"
                                    href="https://github.com/demonPrabhu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5"
                                    href="https://www.linkedin.com/in/prabhat-bhatia-6344141a0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Footer


// import React from 'react'
// import { Link } from 'react-router'
// import Logo from '../Logo'

// /** Site footer: logo/tagline/copyright plus links to the author's GitHub and LinkedIn. */
// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap items-center justify-between">
//                     <div className="w-full p-6 md:w-1/2">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Link to='/'>
//                                 <Logo width="100px" />
//                                 </Link>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600">
//                                     TechPulse — a blog platform built with React, Redux Toolkit &amp; Appwrite
//                                 </p>
//                                 <p className="mt-2 text-sm text-gray-600">
//                                     &copy; 2026 Prabhat Bhatia. All rights reserved.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2">
//                         <div className="h-full md:text-right">
//                             <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
//                                 Connect
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <a
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         href="https://github.com/demonPrabhu"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         GitHub
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         href="https://www.linkedin.com/in/prabhat-bhatia-6344141a0"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         LinkedIn
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer