import React, { useId } from 'react'

export default function Select({
    options,
    label,
    children,
    className, // keep this as className-='' so when it is null, it won't effect much
    ref,       // Ref is used to pass data to Parent, Before React19 forwardRef is used
    ...props
}) 
 {    
  const id = useId()
  return (
    <div>
        {label && 
        <label htmlFor={id}>
            {label}
        </label>
        }
        <select className={` ${className}`} id={id} {...props}>
            {options?.map((option)=>(   // ? to check array has elements
                <option
                key={option}
                value={option}
                ref={ref}
                >
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

// pending forward ref