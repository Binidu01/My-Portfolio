// src/app/blog/[slug]/page.tsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface Post {
  id: string
  slug: string
  title: string
  content: string
}

// Simple hardcoded data
const posts: Post[] = [
  {
    id: '1',
    slug: 'hello-world',
    title: 'Hello World',
    content: 'This is my very first blog post! Welcome to my blog.'
  },
  {
    id: '2',
    slug: 'my-first-post',
    title: 'My First Post',
    content: 'I am so excited to start this blog. This is my first post!'
  },
  {
    id: '3',
    slug: 'welcome',
    title: 'Welcome to My Blog',
    content: 'Hello and welcome! Thanks for stopping by.'
  }
]

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    // Simulate loading delay
    setTimeout(() => {
      const found = posts.find(p => p.slug === slug)
      setPost(found || null)
      setLoading(false)
    }, 500)
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800">Post not found</h1>
        <p className="text-gray-600 mt-4">Sorry, we couldn't find that blog post.</p>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
      </div>
    </article>
  )
}