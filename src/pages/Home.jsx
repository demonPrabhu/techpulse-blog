import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

/** Landing page: shows the active-post feed to logged-in users, or a blurred preview with a welcome modal otherwise. */
function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loginStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-blue-500/20 bg-slate-900/60 px-5 py-3 text-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>
          <span className="font-medium">Loading posts...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-950/30 p-6 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <p className="text-lg font-semibold text-red-300">Something went wrong</p>
          <p className="mt-2 text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!loginStatus) {
    return (
      <div className="relative py-10">
        <Container>
          <div className="relative">
            {posts && posts.length > 0 ? (
              <div className="pointer-events-none select-none blur-[1.5px] opacity-90">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white">Latest Posts</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <div key={post.$id} className="h-full">
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white">No posts yet</h3>
                <p className="mt-3 text-slate-400">Start by creating your first blog post.</p>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-md rounded-[28px] border border-slate-800/80 bg-slate-900/60 p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-6 top-0 h-12 rounded-b-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-indigo-500/20 blur-xl"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex items-center rounded px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-blue-400 border border-blue-500/20 bg-blue-500/5">
                    TechPulse
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white">Welcome to TechPulse</h2>
                  <p className="mt-3 text-slate-400">Login to view and manage posts.</p>
                  <Link
                    to="/login"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition-all duration-200 hover:bg-blue-700"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-lg rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white">No posts yet</h3>
          <p className="mt-3 text-slate-400">Start by creating your first blog post.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Latest Posts</h1>
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