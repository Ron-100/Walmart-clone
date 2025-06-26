import React,{useState,useEffect} from 'react'
import Postcard from './Postcard'
import databaseService from '../appwrite/databaseService'
import Container from './Container'

function Allpost() {

    const [posts , setPosts] = useState([])

    useEffect(()=>{
        databaseService.getPosts([]).then((posts)=> {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])
    
    return posts.length > 0 ? (
        <>
        <Container>
            <div className='w-full py-8'>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </>
    ) : 
    <Container>
        <div className='w-full h-screen text-4xl flex justify-center items-center font-semibold mb-4 text-white'>
            No Post Available
        </div>
    </Container>
}

export default Allpost
