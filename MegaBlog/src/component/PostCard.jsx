import React from 'react'
import appWriteService from '../appwrite/file'
import {Link} from 'react-router-dom'

// Post Card is the card that contains user's blog, which user can see after login... 
function PostCard({$id, title, featuredimage}) {
    return (
        // when we use 'Link' we need to click to go to that given link...
        <Link
        to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full h-[250px] mb-4'>
                <img
                src={appWriteService.filePreview(featuredimage)} // h-[250px]: gives every image container the same height...
                alt={title}
                className='w-full h-full object-cover rounded-xl'  // object-cover: makes the image fill the container while maintaining aspect ratio...
                />
            </div>

            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </div>

        </Link>
    )
}

export default PostCard
