import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, PostForm } from '../components/index'
import appwriteService from '../appwrite/config'

/** Page for editing an existing post; loads it by slug, verifies the logged-in user owns it, then hands it to PostForm in edit mode. */
function EditPost() {
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)

  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  React.useEffect(() => {
    if (!slug) {
      navigate('/')
      return
    }

    let isCancelled = false
    setLoading(true)
    setNotFound(false)
    setPost(null)

    appwriteService.getPost(slug).then((postData) => {
      if (isCancelled) return
      if (postData) {
        setPost(postData)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    })

    return () => {
      isCancelled = true
    }
  }, [slug, navigate])

  // The edit form is only ever shown to the post's author — anyone else who
  // opens this URL directly (e.g. by guessing/pasting a slug) is treated the
  // same as a missing post, so no post content or ownership is leaked to them.
  const isAuthor = Boolean(post && userData && post.userId === userData.$id)

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sky-700 shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"></span>
          <span className="font-medium">Loading post...</span>
        </div>
      </div>
    )
  }

  if (notFound || !post || !isAuthor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
          <p className="mt-3 text-slate-600">
            The post you're looking for doesn't exist or you don't have permission to edit it.
          </p>
          <Link
            to="/my-posts"
            className="mt-5 inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-sky-700"
          >
            ← Back to my posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 py-10">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost
