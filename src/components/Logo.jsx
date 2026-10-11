import React from 'react'

/** 
 * Clean Production Logo Component:
 * - 'rectangular' (default) loads the transparent shield variant asset for Header/Footer.
 * - 'circular' loads the unclipped circular container variant asset for Forgot Password.
 */
export default function Logo({ width = '100%', variant = 'rectangular' }) {
  // Natively map out the correct graphic asset paths from your public directory
  const imageSrc = variant === 'circular' ? '/TechPulse_circle.png' : '/TechPulse_rect.png';

  return (
    <img 
      src={imageSrc} 
      style={{ width, aspectRatio: '1/1' }} 
      alt={`TechPulse ${variant} Logo`} 
      className="object-contain select-none pointer-events-none" 
    />
  )
}



// import React from 'react'

// /** 
//  * TechPulse Multi-Variant Logo Component:
//  * Crops a single shared sprite image file dynamically using CSS positioning.
//  * - 'rectangular' (default) shifts focus to the left shield logo asset.
//  * - 'circular' shifts focus to the right circular badge asset.
//  */
// export default function Logo({ width = '100%', variant = 'rectangular' }) {
//   return (
//     /* Outer window layout container acting as our viewport window box */
//     <div 
//       style={{ width }} 
//       className="aspect-square overflow-hidden bg-transparent flex items-center justify-center relative select-none pointer-events-none"
//     >
//       <img 
//         src="/TechPulse_Combined.png" 
//         alt="TechPulse Brand Logo" 
//         /* 
//           🚀 THE DYNAMIC VIEWPORT CROP TRICK:
//           - w-[200%] forces the single image to swell to double the container width.
//           - max-w-none stops browser layouts from squeezing the asset down.
//           - object-cover locks the structural aspect ratio safely.
//           - object-left pins the left shield; object-right pins the right circle badge!
//         */
//         className={`
//           h-full w-[200%] max-w-none object-cover transition-all duration-200
//           ${variant === 'circular' ? 'object-right' : 'object-left'}
//         `}
//       />
//     </div>
//   )
// }


// import React from 'react'

// /** Site logo image, served from public/ so it resolves correctly on any route/domain. */
// export default function Logo({width='100%'}) {
//   return (
//     <img 
//       src="/TechPulse.png" 
//       style={{width}} 
//       alt="Logo Placeholder" 
//       /* 
//         🚀 THE CSS FILTER FIX:
//         Boosts contrast and brightness slightly so the light-gray box background 
//         becomes pure white, allowing mix-blend-multiply to completely hide it.
//       */
//       className="contrast-[1.10] brightness-[1.05]"
//     />
//   )
// }



// import React from 'react'

// /** Site logo image, served from public/ so it resolves correctly on any route/domain. */
// export default function Logo({width='100%'}) {
//   return (
//     <img src="/TechPulse.png" style={{width}} alt="Logo Placeholder" />
//   )
// }
