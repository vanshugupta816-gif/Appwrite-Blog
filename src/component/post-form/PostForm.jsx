import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import appwriteFileService from '../../Appwrite/File'
import dbService from '../../Appwrite/Config'
import {Select, Button, RTE, Input} from '../Index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updatePost, addPost } from '../../Store/PostSlice'
import { useDispatch } from 'react-redux'
import { sanitizePost } from '../../Utils/SanitizePost'

// We will be sending the label and will be taking control from the 'RTE'...
function PostForm({post}) {
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    // Watch() listens to form field changes...
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {    // These defaultValues acts as an storage to hold the current details of our post...
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })

    const submit = async (data)=>{
        
        if(post){ // if post exists we need to just update the current post... 
            const file = data.image[0] 
            ? await appwriteFileService .uploadFile(data.image[0]) 
            : null;
                        
            const dbPost = await dbService.updatePost(post.$id, {
                ...data, 
                featuredimage: file ? file.$id : undefined
            });
        
            if(file && dbPost){
                await appwriteFileService.deleteFile(post.featuredimage);
            }

            // update the data into store...
            dispatch(
                updatePost(sanitizePost(dbPost))
            );

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else { // else if post doesn't exist we need to create the new post 
            const file = data.image[0] ? await appwriteFileService .uploadFile(data.image[0]) : null;
            
            // if the user has uploads the image in its blog then only store its info...
            if(file){
                data.featuredimage = file.$id;
            }    
            
            const dbPost = await dbService.createPost({
                ...data,
                userId: userData.$id
            });

            // add the data into store...
            dispatch(
                addPost(sanitizePost(dbPost))
            );

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            } 
        }
    }  

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return '';
    }, []);


    useEffect(()=>{
        const subsciption = watch((value, {name}) =>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), 
                    {shouldValidate: true}
                );
            }
        });

        return ()=>{
            subsciption.unsubscribe();
        }

    }, [watch, slugTransform, setValue])
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/*    Left half   */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", 
                        slugTransform(e.currentTarget.value), 
                        { shouldValidate: true }
                    )}}
                />

                <RTE 
                label="Content :" 
                name="content" 
                control={control} 
                defaultValue={getValues("content")} 
                />
            </div>

            {/* Right half */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteFileService.filePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
    )
}

export default PostForm



// Flow of the Entire Code

// User types:

// Title: Learning React Hook Form

//          ⬇

// watch() detects title change

//          ⬇

// slugTransform() converts:

// learning-react-hook-form

//          ⬇

// setValue() updates slug field

//         ⬇

// UI automatically shows:

// Slug: learning-react-hook-form