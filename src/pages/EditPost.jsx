import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, PostForm } from '../components/index'
import appwriteService from '../appwrite/config'

function EditPost() {
  const [post, setPost] = React.useState(null)

// We need ID(slug) to get post, which is from URL, so hook gets dynamic URL which is object, so to extract value from object {slug}
  const { slug } = useParams()
  const navigate = useNavigate()

  React.useEffect(()=>{    
    if(slug){
    appwriteService.getPost(slug).then((post)=> {
      if(post) {
        setPost(post)
      } 
    }) 
  console.log("EditPostPages Slug:", slug)
  console.log("EditPostPages Post:", post)
  
  }
      else{
        navigate('/')
      }
  },[slug, navigate])
  // Dependency -> slug -> needed because it changes, navigate -> added for correctness, ESLint (as used inside effect), 
  // we have to use all things used inside useEffect in dependency to avoid error in ESLint


  //This is professional & scalable

  // In first render, When post is null -> UI show loading
  if(!post){
    return (
      <div>
        Loading...
      </div>
    )
  }

  // When post is available, useState setPost will again render and When post is available -> it will show PostForm
  return (
    <div>
      
      <Container>
      <PostForm 
      post= {post}
      />
      </Container>

    </div>
  )
}

export default EditPost