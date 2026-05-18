import React from 'react'
import {Link, useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import {Logo, Button, Container, LogoutBtn} from '../index' 

export default function Header() {

    const authStatus = useSelector((state)=> state.auth.status )
    const navigate = useNavigate()
    const items = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name:'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name:'Sign Up',
            slug: '/signup',
            active: !authStatus
        },
        {
            name:'Add Post',
            slug: '/add-post',
            active: authStatus
        },
        {
            name:'Edit Post',
            slug: '/edit-post',
            active: authStatus
        },
        {
            name:'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
]
    
 return (
    <header 
    className='py-3 shadow bg-gray-500'
    > 
        <Container>
            <nav
            className='flex'
            >
                <div>
                    <Link to='/'>
                    <Logo width="100px" />
                    </Link>
                </div>
                <ul 
                className='flex ml-auto'
                >
                {items.map((item)=>
                item.active && (
                <li
                key={item.name}
                value={item.name}    
                >
                  <Button
                  className='inline-bock px-6 py-2 m-1 duration-200 hover:bg-blue-100 rounded-full'
                  onClick= {()=>navigate(item.slug)}
                  >
                    {item.name}
                  </Button>
                </li>
                ))}

                {authStatus && (
                    <li>
                    <LogoutBtn />
                    </li>
                )} 

            </ul>
            </nav>
        </Container>
    </header>
  )
}
