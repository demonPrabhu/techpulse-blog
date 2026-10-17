import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import authService from '../appwrite/auth';
import { login as storeLogin } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Logo, Input, Button } from './index';

/** Login form component designed to stretch cleanly inside dark layout panels. */
export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState();

    const login = async (data) => {
        try {
            setError("");
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin({userData}))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        /* FIXED: Converted from bg-white to solid dark theme match */
        <div className="w-full space-y-8 bg-slate-950 text-slate-100">
            
            {/* Header Section: Centered perfectly to match the Sign Up flow layout */}
            <div className="flex flex-col items-center text-center">
                {/* FIXED: Added centered Logo with homepage navigation Link hook */}
                <Link 
                    to="/" 
                    className="mb-4 mix-blend-screen overflow-hidden flex justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md"
                    aria-label="Navigate to home page"
                >
                    <Logo width="75px" />
                </Link>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                    Sign in to your account
                </h2>
                <p className="mt-1.5 text-sm text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Global Error Banner */}
            {error && (
                <div className="p-4 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg" role="alert">
                    <span className="font-semibold">Error:</span> {error}
                </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit(login)} className="space-y-5">
                <div className="space-y-4">
                    <div>
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            /* FIXED: Adapted border, background color and placeholders to dark values */
                            className="w-full px-4 py-2.5 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-slate-900 text-slate-100 placeholder-slate-500 text-sm"
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

                    <div>
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            /* FIXED: Adapted border, background color and placeholders to dark values */
                            className="w-full px-4 py-2.5 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-slate-900 text-slate-100 placeholder-slate-500 text-sm"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{errors.password.message}</p>
                        )}
                        <div className="mt-2 text-right">
                            {/* FIXED: Balanced Link accents */}
                            <Link to="/forgot-password" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        /* FIXED: Switched to glowing gradient configuration to complete branding uniformity */
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-cyan-400 transition-all cursor-pointer"
                    >
                        Sign In
                    </Button>
                </div>
            </form>

        </div>
    )
}




// import React from 'react'
// import {useForm} from 'react-hook-form'
// import { Link, useNavigate } from 'react-router'
// import authService from '../appwrite/auth';
// import { login as storeLogin } from '../features/authSlice';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { Logo, Input, Button } from './index';

// /** Login form: authenticates via Appwrite, stores the user in Redux, then redirects home. */
// export default function Login() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [ error, setError ] = useState();

//     const login = async (data) => {
//         try {
//             setError("");
//             const session = await authService.login(data);
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if (userData) {
//                     dispatch(storeLogin({userData}))
//                     navigate('/')
//                 }
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 my-4 ">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                
//                 {/* Header Section */}
//                 <div className="flex flex-col items-center text-center">
//                     <div className="mb-2">
//                         <Logo width="100%" />
//                     </div>
//                     <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
//                         Sign in to your account
//                     </h2>
//                     <p className="mt-2 text-sm text-gray-600">
//                         Don't have an account?{' '}
//                         <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                             Sign up
//                         </Link>
//                     </p>
//                 </div>

//                 {/* Global Error Banner */}
//                 {error && (
//                     <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
//                         <span className="font-medium">Error:</span> {error}
//                     </div>
//                 )}

//                 {/* Form Section */}
//                 <form onSubmit={handleSubmit(login)} className="space-y-5">
//                     <div className="space-y-4">
//                         <div>
//                             <Input
//                                 label="Email Address"
//                                 placeholder="Enter your email"
//                                 type="email"
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                 {...register("email", {
//                                     required: "Email is required",
//                                     pattern: {
//                                         value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//                                         message: "Email address must be a valid address"
//                                     }
//                                 })}
//                             />
//                             {errors.email && (
//                                 <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
//                             )}
//                         </div>

//                         <div>
//                             <Input
//                                 label="Password"
//                                 placeholder="Enter your password"
//                                 type="password"
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                 {...register("password", {
//                                     required: "Password is required"
//                                 })}
//                             />
//                             {errors.password && (
//                                 <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
//                             )}
//                             <div className="mt-1 text-right">
//                                 <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                                     Forgot password?
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="pt-2">
//                         <Button
//                             type="submit"
//                             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
//                         >
//                             Sign In
//                         </Button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     )
// }
