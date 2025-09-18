import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux' // 1. Import useSelector
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    // 2. Get the current user's data from the Redux store
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts && userData) {
                // 3. Filter posts to only include those matching the user's ID
                const userPosts = posts.documents.filter(
                    (post) => post.userid === userData.$id
                );
                setPosts(userPosts);
            }
            setLoading(false)
        })
    }, [userData]) // Re-run this effect if the user logs in or out

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <h1 className="text-2xl font-bold text-center">Loading...</h1>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Available
                        </h1>
                        <p className="mt-2">Login to create or view your posts.</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap -mx-2'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home