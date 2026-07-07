import React, { useEffect, useState } from 'react'
import { Container, PostForm} from '../component/index'
import appWriteDbService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/postSlice';
import { sanitizePost } from '../utils/sanitizePost';

function EditPost() {
    const navigate = useNavigate();
    const {slug} = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post.posts)
                    .find(currPost => currPost.$id === slug);

    useEffect(() => {
        
        if (!slug) {
            navigate('/');
            return;
        }

        if (!post) {
            appWriteDbService.getPost(slug)
                .then((existingPost) => {
                    if (existingPost) {
                        dispatch(addPost(sanitizePost(existingPost)));
                    } else {
                        navigate('/');
                    }
                })
                .catch(() => navigate('/'));
        }

    }, [slug, post, dispatch, navigate]);
    
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null; 
}

export default EditPost
