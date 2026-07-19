import React, {useEffect, useState} from 'react'
import { Button, Container } from '../Component/Index'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import appwriteDbService from '../Appwrite/Config'
import appwriteFileService from '../Appwrite/File'
import parse from 'html-react-parser'
import { deletePost as deletePostFromStore, addPost } from '../Store/PostSlice'
import DOMPurify from "dompurify"
import { sanitizePost } from '../Utils/SanitizePost'

function Post() {
    
    const {slug} = useParams();
    const post = useSelector((state) => 
        state.post.posts.find(
            (post) => post.$id === slug
        )
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state)=> state.auth.userData)

    useEffect(()=>{
        if(!slug){
            navigate('/');
            return;
        }    

        if (!post){
            appwriteDbService.getPost(slug)
            .then((existingPost) =>{
                if(existingPost) {
                    dispatch(
                        addPost(sanitizePost(existingPost))
                    )
                }else navigate('/');
            })
            .catch(() => navigate('/'));
        }
    }, [slug, navigate, post, dispatch])
    
    const isAuthor = (post && userData) ? post.userId === userData.$id : false;

    const deletePost = ()=>{
        appwriteDbService.deletePost(post.$id)
        .then((status) => {
            if(status) {
                appwriteFileService.deleteFile(post.featuredimage);
                // delete the posts from the store as well now...
                dispatch(deletePostFromStore(post.$id));
                navigate('/')
            }
        });
        
    };
    
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteFileService.filePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(
                        DOMPurify.sanitize(post.content)
                    )}
                </div>
                
            </Container>
        </div>
    ) : <div>Loading...</div>;
}

export default Post