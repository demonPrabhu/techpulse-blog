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
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sky-700 shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"></span>
          <span className="font-medium">Loading post...</span>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
          <p className="mt-3 text-slate-600">
            The post you're looking for doesn't exist or was removed.
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
        <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                      bgColor="bg-white"
                      textColor="text-slate-700"
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
            <span className="mb-3 inline-flex w-fit rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
              Blog Post
            </span>
            <h1 className="text-3xl font-bold leading-tight text-slate-900">{post.title}</h1>
            <p className="mt-1 text-sm text-slate-500">By {post.userName || 'Anonymous'}</p>

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
