import React from 'react'

/** Shared button styled via bgColor/textColor props; forwards any other props (onClick, disabled, etc). */
export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl border border-blue-500/20 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/15 transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

 