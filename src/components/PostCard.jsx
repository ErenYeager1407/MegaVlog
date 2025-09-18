import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        {/* The main card container */}
        <div className='w-full bg-gray-100 rounded-xl p-4 h-full'> {/* Added h-full */}
            {/* 1. Create a container for the image with a fixed height */}
            <div className='w-full justify-center mb-4 relative h-40 overflow-hidden rounded-xl'>
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    // 2. Make the image cover the container
                    className='w-full h-full object-cover' 
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard