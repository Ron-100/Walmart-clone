import React, { useState } from 'react'
import service from '../appwrite/service'
import { data, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userDataSlice'
import {useForm} from 'react-hook-form'

function SignHook() {

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const send = async (value) => {
        setLoading(true)
        try {
            let userData = await service.signup(value)
            await service.login(value)
            if (userData) {
                const dataUser = await service.getCurrentUser()
                if (dataUser) dispatch(setUserInfo({dataUser}))
                navigate('/dashboard') 
            }
        } catch (error) {
            setError(error.message || 'Sign up failed')
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    return (
        <>
        <div className='w-full h-screen flex justify-center items-center bg-slate-800'>
            <form onSubmit={handleSubmit(send)} className='bg-white p-6 rounded shadow-md h-auto flex flex-col gap-2 w-96'>
                <h1 className='text-2xl font-semibold mb-4'>Create Account</h1>
                {error && <p className='text-red-500 mb-2'>{error}</p>}
                <input className='w-full border px-3 py-2 rounded'
                type="text"
                placeholder='Enter Your Name'
                {...register('name',{
                    required:true
                })}
                />
                <input className='w-full border px-3 py-2 rounded'
                type="email"
                placeholder='Enter Your Email'
                {...register('email',{
                    required:true
                })}
                />
                <input className='w-full border px-3 py-2 rounded'
                type="password"
                placeholder='Enter Your Password'
                {...register('password',{
                    required:true
                })}
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    {loading? 'Creating Account...' :'Sign Up'}
                    {/* type submit id connected with onSubmit */}
                </button>
                <div className='flex justify-center gap-1'>
                    <Link to='/login' className='text-blue-500 text-sm hover:text-blue-500 hover:underline'>Already have an account</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default SignHook
