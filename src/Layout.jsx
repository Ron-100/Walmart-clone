import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { useDispatch } from 'react-redux'
import service from './appwrite/service'
import { clearInfo, setUserInfo } from './store/userDataSlice'

function Layout() {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        service.getCurrentUser()
        .then((dataUser)=>{
            if (dataUser) {
                dispatch(setUserInfo({dataUser}))
            }else{
                dispatch(clearInfo())
            }
        }).finally(()=>setLoading(false))
    },[])

    return loading ? (
        <div className='bg-black w-full h-screen flex justify-center items-center text-white text-4xl'>Loading...</div>
    ) : <>
            <Header />
            <Outlet />
            <Footer />
        </>

    //it works like, at the beginning it ture means 'fetching user data' when fetch done it false means show the UI.  
}

export default Layout
