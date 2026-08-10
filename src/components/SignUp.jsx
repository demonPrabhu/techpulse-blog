import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  authService  from '../appwrite/auth'
import { login as storeLogin } from '../features/authSlice.js'
import { Logo, Input, Button } from './index';

/** Sign-up form: creates an Appwrite account, logs in, stores the user in Redux, then redirects home. */
export default function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [ error, setError ] = useState()
    const [ submitting, setSubmitting ] = useState(false)

    const createAccount = async (data) => {
        try {
            setError('')  // Always remember to setError to blank/null before any form, else previous errors will be displayed
            setSubmitting(true)
            const session = await authService.createAccount(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if (userData){
                    dispatch(storeLogin({userData}))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 my-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <Logo width="100%" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Sign up to create new account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to='/login' className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Sign in
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
                <form onSubmit={handleSubmit(createAccount)} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <Input
                            label='Full Name'
                            placeholder='Enter your name'
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            {...register('name', {
                                required: 'Full name is required'
                            })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                            label='Email Address'
                            placeholder='Enter your email'
                            type='email'
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            {...register("email",
                                {required: "Email is required",
                                 validate: {  // Review Later, syntax seems to be different is site
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }}
                            )}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                            label='Password'
                            placeholder='Enter your password'
                            type='password'
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                        type='submit'
                        disabled={submitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
  )
}
