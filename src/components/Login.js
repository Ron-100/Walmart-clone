import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from '../appwrite/service'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userDataSlice'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const loginGo = async (e) => {
        e.preventDefault();
        try {
            let data = await service.login({email,password})

            
            if (data) {
                let userData = await service.getCurrentUser()
                if (userData)  navigate('/dashboard',{state: userData})
                dispatch(setUserInfo(userData))
            }
            
            // const jwtRespo = await service.createJWT(); 
            // const jwt = jwtRespo.jwt ;
            // console.log("JWT token", jwt);
        } catch (error) {
            setError(error.message || 'Invalid Requirement')
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center bg-slate-800'>
                <form onSubmit={loginGo} className='bg-white p-6 rounded shadow-md h-auto flex flex-col gap-2 w-96'>
                    <h1 className='text-2xl font-semibold mb-1'>Login</h1>
                    {error && <p className='text-red-500 mb-2'>{error}</p>}
                    <input className='w-full border px-3 py-2 rounded'
                    type="email" 
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    />
                    <input className='w-full border px-3 py-2 rounded'
                    type="password" 
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Log in
                        {/* type submit id connected with onSubmit */}
                    </button>

                    <div className='flex justify-center gap-1'>
                        <Link to='/createuser' className='text-blue-500 text-sm hover:text-blue-500 hover:underline'>Create a new account</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
