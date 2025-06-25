import { useSelector } from "react-redux"
import './ComponentCss/Dashboard.css'

function Dasboard() {

    let status = useSelector((state)=>state.user.status)
    let user = useSelector((state)=> state.user.dataUser)

    return (
        <>
        <div className='w-full h-screen flex pt-16 items-center flex-col bg-slate-800'>
            <p className='text-4xl font-semibold mb-4 text-white'>Welcome</p>
            { status? 
                    <div id="userinfo">
                        <h1 className='text-6xl font-semibold text-white capitalize'><span className="text-yellow-300">Name:</span> <span className="text-green-400">{status? user.name : 'User Name' }</span></h1>
                        <h1 className='text-4xl font-semibold text-white capitalize'><span className="text-yellow-300">Email:</span> <span className="text-green-400">{status? user.email : 'User Eamil' }</span></h1>
                    </div> 
                : null}
        </div>
        </>
    )
}

export default Dasboard
