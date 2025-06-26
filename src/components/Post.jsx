import React, { use, useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseService'
import { useParams , Link, useNavigate } from 'react-router-dom';
import Container from './Container';
import './ComponentCss/Post.css'
import service from '../appwrite/service';

function Post() {
    const [post, setPost] = useState(null);
    const [exixtUser, setExixtUser] = useState('')
    const {urlId} = useParams();
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (urlId) {
            databaseService.getPost(urlId).then((post)=> {if (post) setPost(post)})            
        }
    },[urlId])

    //Edit and Delete Ownership
    useEffect(()=>{
        const currentuser = service.getCurrentUser().then((user)=>{
            if (user) {
                setExixtUser(user)
            }
        })
    },[])


    const deletPost = async () => {
        const imageFile = post.postImage
        const crrPost = await databaseService.deletePost(post.$id)
        if (crrPost) {
            await databaseService.deleteFile(imageFile)
            alert('Post Deleted')
            navigate('/allpost')
        }
        
    }

    return post ? (
        <Container className='py-8'>
            <div id='post'>
                <div className='w-full h-16 flex justify-center items-center'>
                    {exixtUser?.$id === post?.userId && (
                        <div className='flex justify-center items-center gap-28'>
                            <Link to={`/edit/${post.$id}`} className='text-white w-20 h-10 rounded-lg text-xl flex justify-center items-center bg-green-500'>
                                Edit
                            </Link>
                            <button onClick={deletPost} className='text-white w-20 h-10 rounded-lg text-xl flex justify-center items-center bg-red-500'>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className=" flex justify-center items-center flex-col">
                    <div>
                        <p className='text-white text-xl my-2'>Posted by {post.userName}</p>
                    </div>
                    <div className="bg-white flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={databaseService.getFileview(post.postImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-6">
                        <h1 className="text-white text-2xl font-bold">{post.title}</h1>
                    </div>
                    <Link to={'/allpost'}>
                        <button className='pt-1 pb-1 pr-4 pl-4 rounded-lg bg-green-600 text-white hover:text-green-500 hover:bg-white transition-colors cursor-pointer'> 
                            OK 
                        </button>
                    </Link>
                </div>
            </div>
        </Container>
    ) : null
}

export default Post
