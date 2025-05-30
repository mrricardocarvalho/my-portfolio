// src/components/BlogPostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function BlogPostCard({ post }) {
  const postUrl = `/blog/${post.slug}`; // Path matches the Route definition

  return (
    <div className="group bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition duration-150 ease-in-out m-4 md:m-6">
      <p className="text-xs text-gray-500 mb-2">{post.date}</p>
      {/* Title - Still not a link */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:underline decoration-blue-600 decoration-2 underline-offset-4 transition">
        {post.title}
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        {post.excerpt}
      </p>
      {/* Read More Link - Changed to React Router Link */}
      <Link
        to={postUrl} // Use 'to' prop for internal navigation
        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline decoration-blue-600 decoration-1 underline-offset-2 transition"
      >
        Read more
      </Link>
    </div>
  );
}

export default BlogPostCard;