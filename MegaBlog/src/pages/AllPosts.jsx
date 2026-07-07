import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../component/index'
import appwriteDbService from '../appwrite/config'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/postSlice';
import { sanitizePost } from '../utils/sanitizePost';

function AllPosts() {
    
    // whenever this page is loaded, just fetch all the existing posts in the redux store...
    const posts = useSelector((state) => state.post.posts);   
    const dispatch = useDispatch();

    useEffect(() => {
        if(!posts.length){
            appwriteDbService.getAllActivePosts()
            .then((existingPosts) => {
                if(existingPosts){
                    dispatch(
                        setPosts(existingPosts.rows.map(sanitizePost))
                    )
                }
            });
        }

    }, [posts.length, dispatch]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map( post => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
