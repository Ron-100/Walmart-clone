import React, { useState } from 'react'
import service from '../appwrite/service'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userDataSlice'


function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const send = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let data = await service.signup({name,email,password})
            if (data) {
                await service.login({email,password})
                const userdata = await service.getCurrentUser()
                if (userdata) dispatch(setUserInfo(userdata))
                navigate('/dashboard') 
            }
           
        } catch (error) {
            setError(error.message || 'Sign up failed')
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    // const send = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         // 1. Sign up
    //         let data = await service.signup({ name, email, password });

    //         // 2. Log in
    //         await service.login({ email, password });

    //         // 3. Get user details
    //         const userData = await service.getCurrentUser();

    //         // 4. (Optional) Generate JWT
    //         const jwt = await service.createJWT();
    //         console.log("JWT:", jwt);

    //         // 5. Store user info in Redux
    //         dispatch(setUserInfo(userData));

    //         // (Optional) store JWT in localStorage or pass to backend
    //         // localStorage.setItem('jwt', jwt);

    //         navigate('/dashboard');
    //     } catch (error) {
    //         setError(error.message || 'Sign up failed');
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
        <div className='w-full h-screen flex justify-center items-center bg-slate-800'>
            <form onSubmit={send} className='bg-white p-6 rounded shadow-md h-auto flex flex-col gap-2 w-96'>
                <h1 className='text-2xl font-semibold mb-4'>Create Account</h1>
                {error && <p className='text-red-500 mb-2'>{error}</p>}
                <input className='w-full border px-3 py-2 rounded'
                type="text"
                value={name}
                placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
                />
                <input className='w-full border px-3 py-2 rounded'
                type="email"
                value={email}
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input className='w-full border px-3 py-2 rounded'
                type="password"
                value={password}
                placeholder='Enter Your Password'
                onChange={(e) => setPassword(e.target.value)}
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

export default CreateUser
