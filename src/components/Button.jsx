import React from 'react'

/** Shared button styled via bgColor/textColor props; forwards any other props (onClick, disabled, etc). */
export default function Button({
    children,
    type= 'button',
    bgColor= 'bg-blue-600',
    textColor= 'text-white',
    className= '',
    ...props
}) {
  return (
    <button type={type} 
      className={ ` p-2 rounded-lg ${bgColor} ${textColor} ${className} ` } {...props}>
        {children}
    </button>
  )
}

 