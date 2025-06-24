import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dasboard from './components/Dasboard'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom' 
import Layout from './Layout'
import SignHook from './components/SignHook'
import LoginHook from './components/LoginHook'
import Post from './components/post'
import Addpost from './components/Addpost'
import Allpost from './components/Allpost'
import EditX from './components/EditX'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Navigate to='/createuser'/>}/>
        <Route path='/createuser' element={<SignHook />}/>
        <Route path='/dashboard' element={<Dasboard />}/>
        <Route path='/login' element={<LoginHook />}/>
        <Route path='/addpost' element={<Addpost/>}/>
        <Route path='/allpost' element={<Allpost/>}/>
        <Route path='/post/:urlId' element={<Post />}/>
        <Route path='/edit/:urlId' element={<EditX />}/>
      </Route>     
    ) 
  )
 
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
