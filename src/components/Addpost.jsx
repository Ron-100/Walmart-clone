import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Input from './input'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import databaseService from '../appwrite/databaseService'
import Container from './Container'
import './ComponentCss/Addpost.css'
import {ImageCompres} from './ImageCompres/ImageCompres'

function Addpost({post}) {
    let [loading, setLoading] = useState(false) 
    const {register , handleSubmit} = useForm({
        defaultValues:{
            title:post?.title || ''
        }
    });

    const navigate = useNavigate()
    let user = useSelector((state)=> state.user.dataUser)
    
    const submit = async (data) =>{
        setLoading(true)

        if (post) {

            let Idfile = post.postImage // store the image id to delete the previousimage

            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

                if (file) {
                    Idfile = file.$id
                    await databaseService.deleteFile(post.postImage)
                }

            // const dbpost = await databaseService.updatePost(post.$id,{...data, postImage : file ? file.$id : undefined})
            const dbpost = await databaseService.updatePost(post.$id,{...data, postImage : Idfile})
            
            if (dbpost) {
                navigate(`/post/${dbpost.$id}`)
            }
            
        } else {
            try {

                const compressedFile = await ImageCompres(data.image[0]); // here add image size reducer
                const file = await databaseService.uploadFile(compressedFile)

                if (file) {
                    let fileId = file.$id
                    data.postImage = fileId
                    const dbpost = await databaseService.createPost({...data, userId : user.$id, userName: user.name })
                    
                    if (dbpost) {
                        navigate(`/post/${dbpost.$id}`);
                    }
                } 

            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
    }

    return (
        <Container className='pt-7 px-36'>
            <form id='form' onSubmit={handleSubmit(submit)} className="flex flex-wrap justify-center">
            <div id='titlebox' className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
            </div>
            <div id='selectbox' className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
            </div>
            <button type='submit' className='w-3/4 bg-green-500 h-7 rounded-md'>
                { loading ? 'Posting...' : 'Submit'}
            </button>
            </form>
            {post && 
                <div className=' flex justify-center items-center flex-col bg-transparent rounded-xl p-4 my-4'>
                    <div className=' w-72 justify-center mb-4'>
                        <img src={databaseService.getFileview(post.postImage)} alt={post.title}
                        className='rounded-xl' />
                    </div>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                </div> }
        </Container>
    )
}

export default Addpost
