import React, { useEffect } from 'react'
import { Container ,PostCard } from '../components/index'
import appwriteService from '../appwrite/config' 

function AllPosts() {

    // Have to use useState a data is coming from Promise
    // posts is empty [] initially when Promise is Pending, but if we don't use useState JSX return will give error
    // When Promise is isFulfilled, it setPosts data to posts which re-render the JSX, and All Posts are displayed
    // When we call setPosts, it tells component: "Hey, data changed! Redraw everything." and render with new data
    const [posts, setPosts] = React.useState([])  // initial value is empty array, so .map don't crash on 1st render
    
    // Have to use useEffect as the data will be fetched once when page loads, if we don't use, data will be fetched everytime Function is called
    // We are not using any dependency, so data will load once when Page(URL) is loaded
    React.useEffect(()=>{
          appwriteService.getPosts([]).then( // [] will get all posts, inactive also
            (posts)=>{
              console.log("API response AllPosts Pages:", posts)
              if(posts)
              setPosts(posts.rows)}
            ) 
    // Alternate, We can also create a Async function, but will have to call it, so we use .then, as it's more direct, readable, best for single API call        
    // async function fetchPosts() {
    //     const allposts = await appwriteService.getPosts(); 
    //     setPosts(...allposts)
    //   }
    //   fetchPosts()
    }, [])
    
  
  return (
    <div>
      
      <Container >
      {
      posts.map((post)=>
       <div key={post.$id}>
        <PostCard 
         {...post}
        />
       </div>            
      )}
      </Container>
      

    </div>
  )
}

export default AllPosts