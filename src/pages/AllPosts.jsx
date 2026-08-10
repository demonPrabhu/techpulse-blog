import React, { useEffect } from 'react'
import { Container ,PostCard } from '../components/index'
import appwriteService from '../appwrite/config' 

/** Lists every post regardless of status (active or inactive) — an admin/author view, unlike Home's active-only feed. */
function AllPosts() {

    const [posts, setPosts] = React.useState([])

    // Empty query array overrides the service's default active-only filter, so drafts show up too.
    React.useEffect(()=>{
          appwriteService.getPosts([]).then(
            (posts)=>{
              if(posts)
              setPosts(posts.rows)}
            )
    }, [])


  return (
    <div className="bg-slate-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">All Posts</h1>
        </div>

        {posts.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-600">
            No posts available yet.
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

export default AllPosts