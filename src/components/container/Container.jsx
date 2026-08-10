import React from 'react'

/** Centers page content and caps its width; used to wrap each page's main content. */
export default function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}
