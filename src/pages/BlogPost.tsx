import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { BLOG_POSTS } from './Blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-indigo-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>{post.title} - FreeToolKit Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all posts
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-64 sm:h-96 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-slate-500 mb-6">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{post.category}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none">
              <p className="lead text-xl text-slate-600 mb-8">
                {post.excerpt}
              </p>
              
              <h2>Why You Need This Tool</h2>
              <p>
                In today's fast-paced digital environment, efficiency is key. Whether you are a seasoned developer, a digital marketer, or a student, having access to reliable, fast, and secure tools can drastically improve your workflow. That's why we built this platform—to provide 100% free, client-side utilities that respect your privacy and save you time.
              </p>

              <h2>How It Works</h2>
              <p>
                Unlike traditional online tools that upload your sensitive data to a remote server for processing, our tools leverage the power of modern web browsers. Using advanced JavaScript APIs (like the Crypto API for password generation or the Canvas API for image manipulation), all processing happens directly on your device.
              </p>
              <ul>
                <li><strong>Zero Data Transfer:</strong> Your files and text never leave your computer.</li>
                <li><strong>Lightning Fast:</strong> No waiting for server uploads or downloads.</li>
                <li><strong>Always Free:</strong> No hidden paywalls, subscriptions, or signups required.</li>
              </ul>

              <h2>Best Practices</h2>
              <p>
                To get the most out of our tools, we recommend bookmarking your favorites. For instance, if you frequently work with APIs, keeping the JSON Formatter handy will save you countless hours of debugging. If you manage a blog, our Image Compressor is essential for maintaining fast page load speeds and boosting your SEO rankings.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl my-8">
                <h3 className="text-indigo-900 font-bold mt-0">Pro Tip</h3>
                <p className="text-indigo-800 mb-0">
                  Combine our tools for maximum efficiency! For example, use the Text Case Converter to format your blog titles, then use the Word Counter to ensure your meta descriptions are the perfect length for SEO.
                </p>
              </div>

              <h2>Conclusion</h2>
              <p>
                We are constantly adding new features and tools to FreeToolKit. Our mission is to build the most comprehensive, secure, and user-friendly suite of online utilities available. Try out our tools today and experience the difference of 100% client-side processing!
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
