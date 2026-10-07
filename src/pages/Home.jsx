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

  if (!loginStatus) {
    return (
      <div className="relative min-h-[60vh] bg-slate-50 py-10">
        <Container>
          <div className="relative">
            {posts && posts.length > 0 ? (
              <div className="pointer-events-none select-none blur-[1.5px] opacity-90">
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
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">No posts yet</h3>
                <p className="mt-3 text-slate-600">Start by creating your first blog post.</p>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-md rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(14,116,144,0.18)]">
                <div className="absolute inset-x-6 top-0 h-12 rounded-b-3xl bg-gradient-to-r from-sky-200/70 via-white/50 to-indigo-200/70 blur-xl"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-inner shadow-sky-200">
                    TechPulse
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome to TechPulse</h2>
                  <p className="mt-3 text-slate-600">Login to view and manage posts.</p>
                  <Link
                    to="/login"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-900/20"
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