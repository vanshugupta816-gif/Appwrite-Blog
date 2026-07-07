import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(null);
    const authStatus = useSelector(state => state.auth.status);

    //TODO: make it more easy to understand
    
    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    useEffect(()=>{
        // if the 'authStatus' is false redirect user to the login page...
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        // if the 'authStatus' is true redirect user to the home page... 
        else if (!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate]) // web have also include navigate here because, we wan't this to run the func whenever user is navigated (like: moved to other page)...

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
