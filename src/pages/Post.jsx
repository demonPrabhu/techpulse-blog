import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

/** Single post view: fetches by slug, renders the parsed HTML content, and (for the author) offers edit/delete. */
function Post() {

  const [post, setPost] = React.useState(null)
  const [imageUrl, setImageUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)
  const [confirmingDelete, setConfirmingDelete] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = Boolean(post && userData && post.userId === userData.$id)

  const navigate = useNavigate()
  const { slug } = useParams()

  React.useEffect(() => {
    if (!slug) {
      navigate('/')
      return
    }

    let isCancelled = false
    setLoading(true)
    setNotFound(false)
    setPost(null)
    setImageUrl("")
    setConfirmingDelete(false)

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

  React.useEffect(() => {
    if (!post?.featuredImage) return

    let isCancelled = false
    appwriteService.getFilePreview(post.featuredImage).then((url) => {
      if (isCancelled || !url) return
      setImageUrl(url.href || url)
    })

    return () => {
      isCancelled = true
    }
  }, [post])

  const deletePost = () => {
    setDeleting(true)
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredImage) {
          appwriteService.deleteFile(post.featuredImage)
        }
        navigate('/my-posts')
      } else {
        setDeleting(false)
      }
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-blue-500/20 bg-slate-900/60 px-5 py-3 text-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>
          <span className="font-medium">Loading post...</span>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-lg rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white">Post not found</h1>
          <p className="mt-3 text-slate-400">
            The post you're looking for doesn't exist or was removed.
          </p>
          <Link
            to="/my-posts"
            className="mt-5 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700"
          >
            ← Back to my posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <Container>
        <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                className="h-64 w-full object-cover sm:h-80 md:h-96"
              />
            ) : (
              <div className="h-64 w-full animate-pulse bg-slate-200 sm:h-80 md:h-96" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/50 to-transparent" />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                {confirmingDelete ? (
                  <>
                    <Button
                      onClick={deletePost}
                      bgColor="bg-red-600"
                      className="shadow-md disabled:opacity-60"
                      disabled={deleting}
                    >
                      {deleting ? 'Deleting...' : 'Confirm delete'}
                    </Button>
                    <Button
                      onClick={() => setConfirmingDelete(false)}
                      bgColor="bg-slate-800"
                      textColor="text-slate-200"
                      className="shadow-md disabled:opacity-60"
                      disabled={deleting}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate(`/edit-post/${post.$id}`)}
                      bgColor="bg-emerald-600"
                      className="shadow-md hover:bg-emerald-700"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => setConfirmingDelete(true)}
                      bgColor="bg-red-600"
                      className="shadow-md hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <span className="mb-3 inline-flex w-fit rounded px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20 bg-blue-500/5">
              Blog Post
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white">{post.title}</h1>
            <p className="mt-1 text-sm text-slate-400">By {post.userName || 'Anonymous'}</p>

            <div className="post-content mt-6">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </div>
  )
}

export default Post
