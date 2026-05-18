import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Input,Button, Container } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {

  const [ post, setPost ] = React.useState(null)
  const [ imageUrl, setImageUrl ] = React.useState("")
  const [ isAuthor, setIsAuthor ] = React.useState(false)
  const userData = useSelector((state)=> state.auth.userData )
  const navigate = useNavigate()
  
  React.useEffect(()=>{
    if(post){
    if( userData.$id == post.userId )
    setIsAuthor(true)
    }
  },[isAuthor,post])
  
  
  React.useEffect(() => {
    // Check if post and featuredImage exist first to avoid errors
    if (post && post.featuredImage) {
        // 1. Change to getFileView
        appwriteService.getFilePreview(post.featuredImage).then((url) => { 
            // 2. Use curly braces {} because we have an if statement
            if (url) {
                // If it returns a URL object, use .href, otherwise use the string
                setImageUrl(url.href || url); 
            }
        });
    }
}, [post]);


  const { slug } = useParams()

  console.log(post)
  console.log(slug)
 //console.log(typeof post.content)
 //const ct= parse(post.content)

 if(post)
  {console.log('Cont:', parse(post.content))}
  
  React.useEffect(()=>{
    appwriteService.getPost(slug).then((postData)=>{
      if(postData)
        setPost(postData)
    })
  },[slug])

  // Handle the loading state
  if (!post) return <div>Loading...</div>;
  
  return (
    <div className='py-8'>
    <Container>
    
    <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2' >

         <img src={imageUrl} alt={post.title} className='rounded-xl' />

          

      { isAuthor?

        (<Button 
        onClick= {()=> navigate(`/edit-post/${post.$id}`)}
         bgColor="bg-green-500" className="mr-3"
        >
          Edit Post
        </Button>) : null

      }

      </div>
    
      <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>


    {/* <div>

    <Input 
    label= ' Post Title : '
    placeholder = 'Title'
    value= {post.title}
    disabled= {true}
    />

   

  <div className="mt-4">
        <label className="font-bold">Post Content:</label>
        <div className="border p-4 rounded bg-gray-50">
          {parse(post.content)}
        </div>
      </div>  

      

    </div> */}
    </Container>
    </div>
  )
}

export default Post



// Dispay one post
// Take slug from url, getpost
// content as parse
// Edit or delete or for user
//title, slug, content, featuredImage, status, userId