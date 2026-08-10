import React, { useId } from 'react'

/** Labeled text input; generates its own id/label pairing via useId. */
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
