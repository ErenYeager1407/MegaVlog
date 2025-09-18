import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    // 1. Add a loading state, initially true
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            // 2. Set loading to false after the fetch is complete
            setLoading(false);
        });
    }, []);

    // 3. Add a check for the loading state first
    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <h1 className='text-2xl font-bold text-center'>Loading...</h1>
                </Container>
            </div>
        );
    }

    // After loading, check if there are posts
    // In src/pages/AllPosts.jsx

return (
    <div className='w-full py-8'>
        <Container>
            {/* This div MUST have 'flex flex-wrap' */}
            <div className='flex flex-wrap'> 
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
);
}

export default AllPosts;