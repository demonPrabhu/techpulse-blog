import React from 'react'

/** Site logo image, served from public/ so it resolves correctly on any route/domain. */
export default function Logo({width='100%'}) {
  return (
    <img 
      src="/TechPulse.png" 
      style={{width}} 
      alt="Logo Placeholder" 
      /* 
        🚀 THE CSS FILTER FIX:
        Boosts contrast and brightness slightly so the light-gray box background 
        becomes pure white, allowing mix-blend-multiply to completely hide it.
      */
      className="contrast-[1.10] brightness-[1.05]"
    />
  )
}



// import React from 'react'

// /** Site logo image, served from public/ so it resolves correctly on any route/domain. */
// export default function Logo({width='100%'}) {
//   return (
//     <img src="/TechPulse.png" style={{width}} alt="Logo Placeholder" />
//   )
// }
