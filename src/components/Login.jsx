import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import authService from '../appwrite/auth';
import { login as storeLogin } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Logo, Input, Button } from './index';

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
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 my-4 ">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                
                {/* Header Section */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <Logo width="100%" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Global Error Banner */}
                {error && (
                    <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
                        <span className="font-medium">Error:</span> {error}
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )



//   return (
//     <div>
//         <div>
//             <span>
//                 <Logo />
//             </span>
//         </div>

//         <h2>
//             Sign in to your Account
//         </h2>

//         <p>
//             Don't have an Account
//             <Link to='/signup'>
//                 Sign Up
//             </Link>
//         </p>
//         {error && <p> {error} </p>}

//         <form onSubmit={handleSubmit(login)}>
//             <Input 
//             label='EMAIL'
//             placeholder='Enter your EMAIL'
//             type='email'
//             {...register("email",
//                 {required: true,
//                  validate: {  // Review Later, syntax seems to be different is site
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",       
//                 }}
//             )}
//             />

//             <Input 
//             label='password'
//             placeholder='Enter your password'
//             type='password'
//             {...register("password", {
//                 required: true
//             })}
//             />

//             <Button
//             type='submit'
//             >
//                 Sign in
//             </Button>
//         </form>

//     </div>
//   )
}
