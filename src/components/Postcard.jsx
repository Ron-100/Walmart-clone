import React from 'react'
import {Link} from 'react-router-dom'
import databaseService from '../appwrite/databaseService'
import './ComponentCss/Postcard.css'

function Postcard({$id, title, postImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div id='mainPc' className='w-full bg-yellow-100 rounded-lg p-4'>
                <div id='imgPc' className='w-full justify-center mb-4'>
                    <img id='postcard' src={databaseService.getFileview(postImage)} alt={title}
                    className='rounded-lg ' />
                </div>
                <h2 id='posttitle' className='text-xl text-center font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard
