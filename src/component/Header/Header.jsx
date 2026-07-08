import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import {Container, Logo, LogoutBtn} from '../Index'

function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return ( 
        <header className='py-3 shadow bg-gray-500'>
            <Container> 
                <nav className='flex'>
                    {/* Logo */}
                    <div className='mr-4'>
                        {/* when we use 'Link' we need to click to go to that given link... */}
                        <Link to = '/'>
                        <Logo width="70px"/> 
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map( item =>  (item.active) ?  (
                            <li key={item.name}>
                                {/* We can also attach the link like we did in Logo button using 'Link' */}
                                <button
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    onClick={ () => navigate(item.slug)} // it will navige us to the given link, withut clicking or anything...
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null)}

                        {/* If authStatus is valid then display the logout button */}
                        {authStatus && (
                            <li>
                            <Link to='/'>
                                <LogoutBtn/>
                            </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>    
    )
}

export default Header
