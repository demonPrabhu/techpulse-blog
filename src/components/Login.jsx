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
    const { register, handleSubmit } = useForm();
    const { error, setError } = useState();

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
    <div>
        <div>
            <span>
                <Logo />
            </span>
        </div>

        <h2>
            Sign in to your Account
        </h2>

        <p>
            Don't have an Account
            <Link to='/signup'>
                Sign Up
            </Link>
        </p>
        {error && <p> {error} </p>}

        <form onSubmit={handleSubmit(login)}>
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
                Sign in
            </Button>
        </form>

    </div>
  )
}
