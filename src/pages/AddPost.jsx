import React from 'react'
import { Container, PostForm} from '../components/index'

/** Page for creating a new post; delegates the actual form to PostForm. */
function AddPost() {

  return (
    <div>
      
      <Container>

          <PostForm />

      </Container>

    </div>
  )
}

export default AddPost