import React, { useId } from 'react'

export default function Input({
    type='text',
    label,
    className,
    ref,
    ...props
}) {
    const id = useId();
  return (
    <div>
        { label && (
            <label htmlFor={id}>
                {label}
            </label>) }
        <input 
        type={type}     
        id={id} 
        className={` ${className}`}
        ref={ref}
        {...props}
        />
    </div>
  )
}

// pending ForwardRef
