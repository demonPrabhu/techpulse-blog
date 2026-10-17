import React, { useId } from 'react'

/** Labeled text input; generates its own id/label pairing via useId. */
export default function Input({
    type='text',
    label,
    className = '',
    ref,
    ...props
}) {
    const id = useId();
  return (
    <div>
        { label && (
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold tracking-wide text-slate-300">
                {label}
            </label>) }
        <input 
            type={type}
            id={id}
            className={`w-full rounded-xl border border-slate-700/50 bg-slate-950/60 px-4 py-2.5 text-white placeholder:text-slate-600 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            ref={ref}
            {...props}
        />
    </div>
  )
}

// pending ForwardRef
