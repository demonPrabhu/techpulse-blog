import React, { useEffect, useState} from 'react'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'

function Home() {

  const [ posts, setPosts] = useState([])
  
  const loginStatus = useSelector((state)=>state.auth.status)

  useEffect(()=>{
    if(loginStatus){
    appwriteService.getPosts().then((posts)=>{
      if(posts){
        setPosts(posts.rows)
        }
      })
    console.log('HomePages')
    }
  },[loginStatus])

  if(!loginStatus){
    return (
    <div>Login to view Posts</div>
  )  
  }

  if(!posts || posts.length ==0){
    return (
    <div>Add a post</div>
    )
  }

  return (
    <div>
      
      <Container>

        {posts.map((post)=>(
          <div key={post.$id} >
            <PostCard 
              {...post}
            />
          </div>
        ))}

      </Container>

    </div>
  )
}

export default Home