import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/databaseService'
import Container from './Container'
import Addpost from './Addpost'
function EditX() {

    const [post, setPost] = useState(null)
    const {urlId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if (urlId) {
            databaseService.getPost(urlId).then((post)=>{
                if (post) {
                    setPost(post)
                }
            })
        }else{
            navigate('/dashboard')
        }

    },[urlId,navigate])

    return post ? (
        <div>
            <Container>
                <Addpost post={post} />
            </Container>
        </div>
    )  : null 
}

export default EditX
