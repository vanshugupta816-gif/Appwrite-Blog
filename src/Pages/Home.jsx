import React, {useEffect, useState} from 'react'
import appwriteDbService from '../Appwrite/Config'
import { Container, PostCard } from '../Component/Index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../Store/PostSlice';
import { sanitizePost } from '../Utils/SanitizePost';

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts)
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(()=>{     
        
        if(!posts.length && authStatus){
                        
            appwriteDbService.getAllActivePosts()
            .then((existingPosts)=>{
                if(existingPosts){
                    dispatch(
                        setPosts(
                            existingPosts.rows.map(sanitizePost)
                        )
                    );
                }
            });
        }
        
    }, [authStatus, posts.length]);

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard  {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
