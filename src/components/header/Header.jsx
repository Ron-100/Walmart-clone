import React from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import service from '../../appwrite/service'
import { useDispatch, useSelector } from 'react-redux'
import { clearInfo } from '../../store/userDataSlice'
import Logo from '../../assets/icon.png'

function Header() {
    
    let txt = 'Logout'
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let status = useSelector((state)=>state.user.status)


    const deleteAcc = async () => {
        try {
            await service.logout()
            dispatch(clearInfo())
        } catch (error) {
            console.log(error);
        } finally{
            navigate('/login')
        }
    }

    const navItems = [
        {
            name:'Home',
            ref:'/dashboard'
        },
        {
            name:'Allpost',
            ref:'/allpost',
        },
        {
            name:'Addpost',
            ref:'/addpost',
        },
    ]

    return (
        <>
        <div className='w-full h-auto flex p-2 px-6 bg-slate-800'>
            <div className='w-3/6 flex items-center'>
                <div className=' w-auto h-10 overflow-hidden'>
                    <img src={Logo} alt="" className='w-full h-full  object-cover object-center' />
                </div>
            </div>
            <div className='w-3/6 flex items-center justify-end gap-4'>

                {status && navItems.map((item)=>(
                    <p key={item.name} >
                        <NavLink to={item.ref} className={({isActive})=>`${isActive ? 'text-green-400' : 'text-white' } text-white cursor-pointer hover:text-green-200`}>
                            {item.name}
                        </NavLink>
                    </p>
                ))}

                <div className='bg-amber-600 w-10 h-10 rounded-full overflow-hidden'>
                    <img src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg" alt="" className='w-full h-full  object-cover object-center' />
                </div>
                { status &&
                    <div className=''>
                        <p onClick={deleteAcc} className=' pt-2 pb-2 pr-5 pl-5 rounded-lg bg-red-600 text-white hover:text-red-500 hover:bg-white transition-colors cursor-pointer'>{txt}</p>
                    </div> 
                }

            </div>
        </div>
        </>
    )
}

export default Header
