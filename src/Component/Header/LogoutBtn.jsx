import React from 'react'
import authService from '../../Appwrite/Auth'
import {useDispatch} from 'react-redux'
import { logout } from '../../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { clearAllPosts } from '../../Store/PostSlice'; 

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const loggedOut = await authService.logoutUser(); 
                dispatch(logout());
                dispatch(clearAllPosts());
                navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <button 
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>    
    )
}

export default LogoutBtn
