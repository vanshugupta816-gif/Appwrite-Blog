import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../Component/Index'
import appwriteDbService from '../Appwrite/Config'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Store/PostSlice';
import { sanitizePost } from '../Utils/SanitizePost';

function AllPosts() {
    
    // whenever this page is loaded, just fetch all the existing posts in the redux store...
    const posts = useSelector((state) => state.post.posts);
    const fetchedAll = useSelector((state) => state.post.fetchedAll);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!fetchedAll){
            appwriteDbService.getAllActivePosts()
            .then((existingPosts) => {
                if(existingPosts){
                    dispatch(
                        setPosts(existingPosts.rows.map(sanitizePost))
                    )
                }
            });
        }

    }, [fetchedAll, dispatch]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map( post => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
