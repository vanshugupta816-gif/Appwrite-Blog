import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = {
    posts: [],
    loading: false
};

const PostSlice = createSlice({
    name: "posts",
    initialState,
    // reducers are mainly used to set the data, not to fetch the data...
    reducers: { 
        
        // it will be used when we fetch posts from the appwrite...
        setPosts: (state, action)=>{
            state.posts = action.payload;
            console.log("Posts are set successfully...");
            console.log("Total posts: " , action.payload.length);
        },
    
        // whenever user adds new post we add post here also...
        addPost: (state, action)=>{
            const exists = state.posts.some(
                post => post.$id === action.payload.$id
            );

            // avoid adding duplicate data...
            if(!exists) state.posts.unshift(action.payload); // unshift() -> adds data at the beginning & returns length of new array...
            
            console.log("Post is added successfully...");
        },

        // whenever user updates post we update post here also...        
        updatePost: (state, action)=>{
            state.posts = state.posts.map(post =>(post.$id === action.payload.$id
                    ? action.payload
                    : post
                )
            );
            console.log("Post is updated successfully...");
        },

        // whenever user deletes post we deletes that post here also...
        deletePost: (state, action)=>{
            state.posts = state.posts.filter((post) => (post.$id !== action.payload)
            );
            console.log("Post is deleted successfully...");
        },

        clearAllPosts: (state, action)=>{
            state.posts = [];
            state.loading = false;
            console.log("Posts are cleared successfully...");
        }
    }
})

export const {addPost, setPosts, deletePost, updatePost, clearAllPosts} = PostSlice.actions;

export default PostSlice.reducer;
