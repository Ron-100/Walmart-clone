import React from 'react'
import {Link} from 'react-router-dom'
import databaseService from '../appwrite/databaseService'
import './ComponentCss/Postcard.css'

function Postcard({$id, title, postImage, userName}) {
    return (
        <Link to={`/post/${$id}`}>
            <div id='mainPc' className='w-full flex flex-col justify-between rounded-md overflow-hidden'>
                <div id='post_view' className='w-full flex flex-col '>
                    <div id='imgPc' className='w-full h-64 justify-center overflow-hidden mb-2'>
                        <img id='postcard' src={databaseService.getFileview(postImage)} alt={title}
                        className='w-full h-full object-cover object-center' />
                    </div>
                    <h2 id='posttitle' className='text-center capitalize text-gray-700'>{title}</h2>
                    <p className='text-sm  text-justify m-2 text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis sapiente neque mollitia aut deleniti perferendis</p>
                </div>
                <div id='name' className='flex justify-end w-full h-auto'>
                    <p id='posted' className='mb-2 text-center rounded-lg mx-2 font-medium'>Posted By - <span className='capitalize '>{userName}</span></p>
                </div>
            </div>
        </Link>
    ) 
}

export default Postcard
