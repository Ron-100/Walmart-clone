import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseService'
import { useParams , Link, useNavigate } from 'react-router-dom';
import Container from './Container';


function Post() {
    const [post, setPost] = useState(null);
    const {urlId} = useParams();
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (urlId) {
            databaseService.getPost(urlId).then((post)=> {if (post) setPost(post)})            
        }
    },[urlId])

    const deletPost = async () => {
        const imageFile = post.postImage
        const crrPost = await databaseService.deletePost(post.$id)
        if (crrPost) {
            await databaseService.deleteFile(imageFile)
            alert('Post Deleted')
            navigate('/addpost')
        }
        
    }

    return post ? (
        <Container className='py-8'>
            <div className='w-full h-16 flex justify-center items-center'>
                <div className='flex justify-center items-center gap-28'>
                    <Link to={`/edit/${post.$id}`} className='text-white w-20 h-10 rounded-lg text-xl flex justify-center items-center bg-green-500'>
                        Edit
                    </Link>
                    <button onClick={deletPost} className='text-white w-20 h-10 rounded-lg text-xl flex justify-center items-center bg-red-500'>
                        Delete
                    </button>
                </div>
            </div>
            <div className=" flex justify-center items-center flex-col">
                <div className="bg-white flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseService.getFileview(post.postImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <div className="w-full flex justify-center mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <Link to={'/allpost'}>
                    <button> 
                        OK 
                    </button>
                </Link>
            </div>
        </Container>
    ) : null
}

export default Post
