import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Logo, Input, Button } from './index'

/**
 * Completes the Appwrite password-recovery flow. Reads userId/secret from
 * the URL query params and submits a new password against them inside an overlapping 3D glass card layout.
 */
export default function ResetPassword() {

    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const resetPassword = async (data) => {
        try {
            setError('')
            setSubmitting(true)
            /* 🚀 Keep your exact object configuration parameter intact */
            await authService.resetPassword({ userId, secret, password: data.password })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    // No userId/secret means this wasn't reached via a valid recovery email link
    if (!userId || !secret) {
        return (
            <div className="w-full flex flex-col items-center text-center bg-transparent">
                {/* 🚀 LOGO POSITIONED HALF-INSIDE / HALF-OUT */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 bg-slate-950 rounded-full flex items-center justify-center p-0.5 ring-4 ring-slate-900 shadow-2xl z-20">
                    <Logo width="100%" variant="circular" />
                </div>

                <div className="flex flex-col items-center w-full space-y-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">
                        Invalid or expired link
                    </h2>
                    <p className="text-sm text-slate-400 max-w-xs">
                        This password reset link is missing or no longer valid.
                    </p>
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer mt-2"
                    >
                        Request a new link
                    </Link>
                </div>
            </div>
        )
    }

    return (
        /* 
          🚀 THE LAYOUT DECOUPLING FIX:
          Removed all duplicate bg-white, shadow-xl, and min-h-screen classes.
          This lets the parent page wrapper control the 3D dimensions seamlessly!
        */
        <div className="w-full flex flex-col items-center bg-transparent">

            {/* 🚀 LOGO POSITIONED PERFECTLY HALF-INSIDE / HALF-OUT */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 bg-slate-950 rounded-full flex items-center justify-center p-0.5 ring-4 ring-slate-900 shadow-2xl z-20">
                <Logo width="100%" variant="circular" />
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center text-center w-full space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Set a new password
                </h2>
                <p className="text-sm text-slate-400">
                    Ensure your new credential profile is secure and unique.
                </p>
            </div>

            {/* Global Error Banner */}
            {error && (
                <div className="p-4 mt-6 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg text-left w-full" role="alert">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}

            {success ? (
                /* Success Banner styled for dark theme integration */
                <div className="p-4 mt-6 text-sm text-green-400 bg-green-950/40 border border-green-900/50 rounded-lg text-left w-full" role="status">
                    Password updated. Redirecting you to log in...
                </div>
            ) : (
                /* Form Section */
                <form onSubmit={handleSubmit(resetPassword)} className="space-y-5 w-full text-left mt-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold tracking-wide text-slate-300 block mb-1.5">
                                New Password
                            </label>
                            <Input
                                placeholder="Enter your new password"
                                type="password"
                                className="w-full px-4 py-2.5 border border-slate-700/50 rounded-lg bg-slate-950/60 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold tracking-wide text-slate-300 block mb-1.5">
                                Confirm Password
                            </label>
                            <Input
                                placeholder="Re-enter your new password"
                                type="password"
                                className="w-full px-4 py-2.5 border border-slate-700/50 rounded-lg bg-slate-950/60 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-400 font-medium">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </form>
            )}

        </div>
    )
}


// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, useNavigate, useSearchParams } from 'react-router-dom'
// import authService from '../appwrite/auth'
// import { Logo, Input, Button } from './index'

// /**
//  * Completes the Appwrite password-recovery flow. Reads userId/secret from
//  * the URL query params (added by Appwrite to the link sent in ForgotPassword's
//  * email) and submits a new password against them.
//  */
// export default function ResetPassword() {

//     const [searchParams] = useSearchParams()
//     const userId = searchParams.get('userId')
//     const secret = searchParams.get('secret')

//     const navigate = useNavigate()
//     const { register, handleSubmit, watch, formState: { errors } } = useForm()
//     const [error, setError] = useState('')
//     const [submitting, setSubmitting] = useState(false)
//     const [success, setSuccess] = useState(false)

//     const resetPassword = async (data) => {
//         try {
//             setError('')
//             setSubmitting(true)
//             await authService.resetPassword({ userId, secret, password: data.password })
//             setSuccess(true)
//             setTimeout(() => navigate('/login'), 2000)
//         } catch (error) {
//             setError(error.message)
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     // No userId/secret means this wasn't reached via a valid recovery email
//     // link (or the link's already been used/edited) — nothing to submit against.
//     if (!userId || !secret) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 my-4">
//                 <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
//                     <div className="flex flex-col items-center">
//                         <div className="mb-2">
//                             <Logo width="100%" />
//                         </div>
//                         <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
//                             Invalid or expired link
//                         </h2>
//                         <p className="mt-3 text-sm text-gray-600">
//                             This password reset link is missing or no longer valid.
//                         </p>
//                     </div>
//                     <Link
//                         to="/forgot-password"
//                         className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-blue-700"
//                     >
//                         Request a new link
//                     </Link>
//                 </div>
//             </div>
//         )
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
//                         Set a new password
//                     </h2>
//                 </div>

//                 {/* Global Error Banner */}
//                 {error && (
//                     <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
//                         <span className="font-medium">Error:</span> {error}
//                     </div>
//                 )}

//                 {success ? (
//                     /* Success Banner */
//                     <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg" role="status">
//                         Password updated. Redirecting you to log in...
//                     </div>
//                 ) : (
//                     /* Form Section */
//                     <form onSubmit={handleSubmit(resetPassword)} className="space-y-5">
//                         <div className="space-y-4">
//                             <div>
//                                 <Input
//                                     label="New Password"
//                                     placeholder="Enter your new password"
//                                     type="password"
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         minLength: {
//                                             value: 8,
//                                             message: "Password must be at least 8 characters"
//                                         }
//                                     })}
//                                 />
//                                 {errors.password && (
//                                     <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <Input
//                                     label="Confirm Password"
//                                     placeholder="Re-enter your new password"
//                                     type="password"
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     {...register("confirmPassword", {
//                                         required: "Please confirm your password",
//                                         validate: (value) =>
//                                             value === watch("password") || "Passwords do not match"
//                                     })}
//                                 />
//                                 {errors.confirmPassword && (
//                                     <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirmPassword.message}</p>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="pt-2">
//                             <Button
//                                 type="submit"
//                                 disabled={submitting}
//                                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                             >
//                                 {submitting ? 'Updating...' : 'Update Password'}
//                             </Button>
//                         </div>
//                     </form>
//                 )}

//             </div>
//         </div>
//     )
// }
