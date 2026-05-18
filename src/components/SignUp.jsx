import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  authService  from '../appwrite/auth'
import { login as storeLogin } from '../features/authSlice.js'
import { Logo, Input, Button } from './index';

export default function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [ error, setError ] = useState()

    const createAccount = async (data) => {
        try {
            setError('')  // Always remember to setError to blank/null before any form, else previous errors will be displayed
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
        }
        console.log(data)
    }
  return (
    <div>
        <div>
            <span>
                <Logo />
            </span>
        </div>

        <h2>
            Sign Up to create new Account
        </h2>

        <p>
            Already have an Account
            <Link to='/login'>
                Sign In
            </Link>
        </p>

        {error && <p> {error} </p>}

        <form onSubmit={handleSubmit(createAccount)}>

            <Input
            label='Full Name'
            placeholder= 'Entor your name'
            {...register('name', {
                required: true
            })}
            />

            <Input 
                        label='EMAIL'
                        placeholder='Enter your EMAIL'
                        type='email'
                        {...register("email",
                            {required: true,
                             validate: {  // Review Later, syntax seems to be different is site
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",       
                            }}
                        )}
                        />
            
                        <Input 
                        label='password'
                        placeholder='Enter your password'
                        type='password'
                        {...register("password", {
                            required: true
                        })}
                        />
            
                        <Button
                        type='submit'
                        >
                            Create Account
                        </Button>            
        </form>
    </div>
  )
}
