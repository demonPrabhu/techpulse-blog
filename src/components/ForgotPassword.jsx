import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import authService from '../appwrite/auth'
import { Logo, Input, Button } from './index'

/** Sends an Appwrite password-recovery email inside an overlapping 3D glass card layout. */
export default function ForgotPassword() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [sent, setSent] = useState(false)

    const requestReset = async (data) => {
        try {
            setError('')
            setSubmitting(true)
            await authService.forgotPassword(data.email)
            setSent(true)
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        /* 
          🚀 THE 3D GLASS CARD FRAMEWORK LAYOUT:
          - The outer card styling wrapper is managed in the page module (`pages/ForgotPassword.jsx`).
          - This inner component handles the relative logo position offsets natively.
        */
        <div className="w-full flex flex-col items-center bg-transparent">

            {/* 🚀 LOGO POSITIONED HALF-INSIDE / HALF-OUT */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 bg-slate-950 rounded-full flex items-center justify-center p-0.5 ring-4 ring-slate-900 shadow-2xl z-20">
                <Logo width="100%" variant="circular" />
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center text-center w-full space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Reset your password
                </h2>
                <p className="text-sm text-slate-400">
                    Remembered your password?{' '}
                    <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                        Log in
                    </Link>
                </p>
            </div>

            {/* Global Error Banner */}
            {error && (
                <div className="p-4 mt-6 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg text-left w-full" role="alert">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}

            {sent ? (
                /* Success Notification Banner */
                <div className="p-4 mt-6 text-sm text-green-400 bg-green-950/40 border border-green-900/50 rounded-lg text-left w-full" role="status">
                    Check your email for a reset link. It's valid for 1 hour.
                </div>
            ) : (
                /* Form Section */
                <form onSubmit={handleSubmit(requestReset)} className="space-y-5 w-full text-left mt-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold tracking-wide text-slate-300 block mb-1.5">
                                Email Address
                            </label>
                            <Input
                                placeholder="Enter your registered email"
                                type="email"
                                className="w-full px-4 py-2.5 border border-slate-700/50 rounded-lg bg-slate-950/60 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                                /* 🚀 FIXED VALIDATION PARAMETER LAYER */
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400 font-medium">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </div>
                </form>
            )}

        </div>
    )
}




// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { Link } from 'react-router'
// import authService from '../appwrite/auth'
// import { Logo, Input, Button } from './index'

// /** Sends an Appwrite password-recovery email; the link in that email lands on ResetPassword. */
// export default function ForgotPassword() {

//     const { register, handleSubmit, formState: { errors } } = useForm()
//     const [error, setError] = useState('')
//     const [submitting, setSubmitting] = useState(false)
//     const [sent, setSent] = useState(false)

//     const requestReset = async (data) => {
//         try {
//             setError('')
//             setSubmitting(true)
//             await authService.forgotPassword(data.email)
//             setSent(true)
//         } catch (error) {
//             setError(error.message)
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 my-4">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">

//                 {/* Header Section */}
//                 <div className="flex flex-col items-center text-center">
//                     <div className="mb-2">
//                         <Logo width="100%" />
//                     </div>
//                     <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
//                         Reset your password
//                     </h2>
//                     <p className="mt-2 text-sm text-gray-600">
//                         Remembered your password?{' '}
//                         <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                             Log in
//                         </Link>
//                     </p>
//                 </div>

//                 {/* Global Error Banner */}
//                 {error && (
//                     <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
//                         <span className="font-medium">Error:</span> {error}
//                     </div>
//                 )}

//                 {sent ? (
//                     /* Success Banner */
//                     <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg" role="status">
//                         Check your email for a reset link. It's valid for 1 hour.
//                     </div>
//                 ) : (
//                     /* Form Section */
//                     <form onSubmit={handleSubmit(requestReset)} className="space-y-5">
//                         <div className="space-y-4">
//                             <div>
//                                 <Input
//                                     label="Email Address"
//                                     placeholder="Enter your email"
//                                     type="email"
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: {
//                                             value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//                                             message: "Email address must be a valid address"
//                                         }
//                                     })}
//                                 />
//                                 {errors.email && (
//                                     <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="pt-2">
//                             <Button
//                                 type="submit"
//                                 disabled={submitting}
//                                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                             >
//                                 {submitting ? 'Sending...' : 'Send Reset Link'}
//                             </Button>
//                         </div>
//                     </form>
//                 )}

//             </div>
//         </div>
//     )
// }
