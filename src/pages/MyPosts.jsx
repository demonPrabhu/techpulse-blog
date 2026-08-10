import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { Query } from 'appwrite'

/** Author dashboard: lists only the logged-in user's own posts, active and draft alike. */
function MyPosts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        // userData can briefly be null on first render (before App's session-restore
        // effect finishes), even though the route itself is auth-protected.
        if (!userData) return

        // Filter by userId (not the default active-only query) so a user sees
        // all of their own posts, including drafts — but never another user's.
        const fetchPosts = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await appwriteService.getPosts([Query.equal('userId', userData.$id)])
                setPosts(response?.rows || [])
            } catch (err) {
                setError('Failed to load your posts. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [userData])

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
                <div className="flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sky-700 shadow-sm">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"></span>
                    <span className="font-medium">Loading your posts...</span>
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

  return (
    <div className="bg-slate-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Posts</h1>
        </div>

        {posts.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-600">
            You haven't written any posts yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default MyPosts
