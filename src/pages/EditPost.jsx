import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, PostForm } from '../components/index'
import appwriteService from '../appwrite/config'

/** Page for editing an existing post; loads it by slug, then hands it to PostForm in edit mode. */
function EditPost() {
  const [post, setPost] = React.useState(null)

  const { slug } = useParams()
  const navigate = useNavigate()

  React.useEffect(()=>{
    if(slug){
    appwriteService.getPost(slug).then((post)=> {
      if(post) {
        setPost(post)
      }
    })
  }
      else{
        navigate('/')
      }
  },[slug, navigate])

  // post is null until the fetch above resolves.
  if(!post){
    return (
      <div>
        Loading...
      </div>
    )
  }

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