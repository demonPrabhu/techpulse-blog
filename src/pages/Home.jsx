import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'

/** Landing page: shows the active-post feed to logged-in users, or a login prompt otherwise. */
function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loginStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    // No point fetching posts for a logged-out visitor; the guest view below handles that case.
    if (!loginStatus) {
      setPosts([])
      setError(null)
      return
    }

    const fetchPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await appwriteService.getPosts()
        setPosts(response?.rows || [])
      } catch (err) {
        setError('Failed to load posts. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [loginStatus])

  if (!loginStatus) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-3 text-slate-600">Login to view and manage posts.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sky-700 shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"></span>
          <span className="font-medium">Loading posts...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-700">Something went wrong</p>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">No posts yet</h3>
          <p className="mt-3 text-slate-600">Start by creating your first blog post.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Latest Posts</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <div key={post.$id} className="h-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home