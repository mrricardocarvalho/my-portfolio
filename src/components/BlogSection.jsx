import React, { useRef } from 'react'; // Import useRef
// import BlogPostCard from './BlogPostCard';
import blogMetaData from '../data/blogMeta';

const sectionCardClasses = "bg-white rounded-lg shadow";

function BlogSection() {
  const posts = blogMetaData;
  const blogListRef = useRef(null); // Ref to the list container

  // Function to save scroll position when clicking a link inside the list
  const handleListClick = (event) => {
    // Check if the clicked element is, or is inside, a blog post link
    if (event.target.closest('a[href^="/blog/"]')) {
      sessionStorage.setItem('blogScrollPos', window.scrollY);
      // console.log('Saved scroll pos:', window.scrollY); // For debugging
    }
  };

  return (
    <section className="mt-8" aria-label="Blog posts">
      <div className={sectionCardClasses}>
        <h2 className="text-2xl font-semibold text-blue-600 mb-0 flex items-center p-6 border-b border-gray-200">
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
          Blog
        </h2>
        <div ref={blogListRef} onClick={handleListClick}>
          {posts && posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id} aria-labelledby={`blog-title-${post.id}`}>
                  {/* <BlogPostCard post={post} /> */}
                  {post.title} {/* Fallback to just displaying the post title */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-gray-500">No blog posts available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;