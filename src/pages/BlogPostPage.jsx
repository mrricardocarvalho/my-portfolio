import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogMetaData from '../data/blogMeta';
import ReactMarkdown from 'react-markdown';

const markdownModules = import.meta.glob('/src/blog-posts/*.md', { as: 'raw', eager: true });

// --- (Keep CustomLink component as defined before) ---
const CustomLink = ({ href, children, ...props }) => {
    const isInternal = href && href.startsWith('/');
    const isAnchor = href && href.startsWith('#');
    if (isInternal && !isAnchor) { return <Link to={href} {...props}>{children}</Link>; }
    if (isAnchor) { return <a href={href} {...props}>{children}</a>; }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
};


function BlogPostPage() {
  const { slug } = useParams();
  const postMeta = blogMetaData.find(p => p.slug === slug);
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- (Keep existing useEffect logic) ---
    setIsLoading(true); setError(null); setPostContent('');
    const modulePath = `/src/blog-posts/${slug}.md`;
    const content = markdownModules[modulePath];
    if (content !== undefined) { setPostContent(content); }
    else { setError('Post content could not be loaded.'); }
    setIsLoading(false);
  }, [slug]);


  if (!postMeta) {
     // --- (Keep existing 'Post Not Found' JSX, maybe add a default title/meta here too) ---
     return (
        <>
             <title>Post Not Found | Ricardo Carvalho</title> {/* Default title */}
             <div className="mt-8 bg-white p-6 md:p-8 rounded-lg shadow">
                  <Link to="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
                     ← Back to Blogs
                  </Link>
                  <h1 className="text-2xl font-bold text-center text-red-600">Post Not Found</h1>
                  <p className="text-center text-gray-600 mt-2">The requested blog post could not be found.</p>
             </div>
        </>
       );
   }

  // Generate meta description (keep this logic)
  const metaDescription = postMeta.excerpt || (postContent ? postContent.substring(0, 155) + '...' : `Read the blog post: ${postMeta.title}`);

  return (
    // Render head tags directly within the fragment
    <>
      {/* --- NATIVE REACT 19 HEAD TAGS --- */}
      <title>{`${postMeta.title} | Ricardo Carvalho`}</title>
      <meta name="description" content={metaDescription} />
      {/* Add other meta tags directly here if needed */}
      {/* <link rel="canonical" href={`https://YOUR_DOMAIN.com/blog/${slug}`} /> */}
      {/* <meta property="og:title" content={postMeta.title} /> ... etc */}

      {/* --- PAGE CONTENT --- */}
      <article className="bg-white rounded-lg shadow overflow-hidden">
         {postMeta.imageUrl && (
             <img
               src={postMeta.imageUrl}
               alt={postMeta.title}
               className="w-full h-auto object-cover"
             />
         )}
         <div className="p-6 md:p-8">
            <Link to="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
               ← Back to Blogs
            </Link>
            <p className="text-xs text-gray-500 mb-2">{postMeta.date}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{postMeta.title}</h1>

            <div className="prose prose-lg max-w-none prose-blue prose-a:text-blue-600 hover:prose-a:text-blue-800">
               {isLoading ? ( <p>Loading content...</p> )
                : error ? ( <p className="text-red-600">{error}</p> )
                : postContent ? ( <ReactMarkdown components={{ a: CustomLink }}>{postContent}</ReactMarkdown> )
                : ( <p>No content available for this post.</p> )
               }
            </div>
         </div>
      </article>
    </>
  );
}

export default BlogPostPage;