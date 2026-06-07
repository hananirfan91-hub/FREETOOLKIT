import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ArrowRight, Calendar, User } from 'lucide-react';

export const BLOG_POSTS = [
  {
    slug: 'free-ai-tools-list-seo-research-directory',
    title: 'Free AI Tools List: 20 High-Opportunity Keywords and Semantic Search Insights',
    excerpt: 'An in-depth keyword analysis and structural research study identifying twenty search terms with high organic potential, featuring low-difficulty rankings and direct topical clustering.',
    date: 'June 7, 2026',
    author: 'FreeToolKit SEO Team',
    category: 'SEO Strategy',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'how-to-compress-images-online',
    title: 'How to Compress Images Online Without Losing Quality',
    excerpt: 'Learn the best techniques to compress image online free, boost your website speed, and improve your SEO rankings with our comprehensive guide.',
    date: 'March 29, 2026',
    author: 'FreeToolKit Team',
    category: 'Performance',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'json-formatter-online-free-guide',
    title: 'The Ultimate Guide to Using a JSON Formatter Online Free',
    excerpt: 'Discover why developers rely on our JSON formatter online free to debug, validate, and beautify complex data structures in seconds.',
    date: 'March 25, 2026',
    author: 'FreeToolKit Team',
    category: 'Development',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'best-free-online-tools-2026',
    title: '10 Best Free Online Tools Every Developer Needs in 2026',
    excerpt: 'From Base64 encoding to UUID generation, explore the top free online tools that will save you hours of development time.',
    date: 'March 20, 2026',
    author: 'FreeToolKit Team',
    category: 'Productivity',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Helmet>
        <title>Blog - FreeToolKit | Guides, Tips & Tutorials</title>
        <meta name="description" content="Read the latest guides, tips, and tutorials on web development, image optimization, and productivity from the FreeToolKit team." />
        <link rel="canonical" href="https://freetoolshub1.vercel.app/blog" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freetoolshub1.vercel.app/blog" />
        <meta property="og:title" content="Blog - FreeToolKit | Guides, Tips & Tutorials" />
        <meta property="og:description" content="Read the latest guides, tips, and tutorials on web development, image optimization, and productivity from the FreeToolKit team." />
        <meta property="og:site_name" content="FreeToolKit" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://freetoolshub1.vercel.app/blog" />
        <meta name="twitter:title" content="Blog - FreeToolKit | Guides, Tips & Tutorials" />
        <meta name="twitter:description" content="Read the latest guides, tips, and tutorials on web development, image optimization, and productivity from the FreeToolKit team." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Latest Guides & <span className="text-indigo-600">Tutorials</span>
          </h1>
          <p className="text-xl text-slate-600">
            Discover tips, tricks, and in-depth guides on how to get the most out of our free online tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <User className="w-4 h-4" /> {post.author}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:text-indigo-800 transition-colors">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
