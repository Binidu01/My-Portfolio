// src/app/blog/page.tsx
import { Link } from 'react-router-dom'

const posts = [
  {
    id: '1',
    slug: 'hello-world',
    title: 'Hello World',
    excerpt: 'This is my very first blog post!'
  },
  {
    id: '2',
    slug: 'my-first-post',
    title: 'My First Post',
    excerpt: 'I am so excited to start this blog.'
  },
  {
    id: '3',
    slug: 'welcome',
    title: 'Welcome to My Blog',
    excerpt: 'Hello and welcome! Thanks for stopping by.'
  }
]

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <span className="inline-block mt-3 text-blue-600 hover:underline">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}