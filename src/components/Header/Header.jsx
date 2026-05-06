import React from 'react'
import {Link, useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import {Logo, Button, Container, LogoutBtn} from './index' 

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
    <header>
        <Container>
            <nav>
                <div>
                    <Link to='/'>
                    <Logo />
                    </Link>
                </div>
                <ul>
                {items.map((item)=>
                item.active && (
                <li
                key={item.name}
                value={item.name}    
                >
                  <Button
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
