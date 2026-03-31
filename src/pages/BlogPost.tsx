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
        <link rel="canonical" href={`https://freetoolshub1.vercel.app/blog/${post.slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://freetoolshub1.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} - FreeToolKit Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:site_name" content="FreeToolKit" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://freetoolshub1.vercel.app/blog/${post.slug}`} />
        <meta name="twitter:title" content={`${post.title} - FreeToolKit Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
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
              
              {post.slug === 'how-to-compress-images-online' && (
                <>
                  <h2>Why Image Compression Matters</h2>
                  <p>
                    In today's fast-paced digital environment, website speed is a critical factor for both user experience and search engine optimization (SEO). Large, unoptimized images are the primary culprit behind slow-loading pages. When a visitor has to wait more than a few seconds for a page to load, they are highly likely to bounce, costing you potential customers or readers.
                  </p>
                  <p>
                    Furthermore, search engines like Google use page speed as a ranking signal. A faster website is more likely to appear higher in search results. This is where an efficient image compressor becomes an invaluable tool in your web development arsenal.
                  </p>

                  <h2>How Client-Side Compression Works</h2>
                  <p>
                    Unlike traditional online tools that require you to upload your sensitive photos to a remote server for processing, modern web applications leverage the power of your browser. Using the HTML5 Canvas API, our image compressor processes your JPEGs, PNGs, and WebP files entirely on your device.
                  </p>
                  <ul>
                    <li><strong>Zero Data Transfer:</strong> Your files never leave your computer, ensuring absolute privacy.</li>
                    <li><strong>Lightning Fast:</strong> No waiting for server uploads or downloads. The compression happens instantly using your device's CPU.</li>
                    <li><strong>No File Size Limits:</strong> Because we don't pay for server bandwidth to process your images, we don't need to impose arbitrary file size limits.</li>
                  </ul>

                  <h2>Best Practices for Web Images</h2>
                  <p>
                    To get the most out of your images, follow these best practices:
                  </p>
                  <ol>
                    <li><strong>Choose the Right Format:</strong> Use JPEG for photographs, PNG for images with transparency or text, and WebP for the best overall compression and quality on modern browsers.</li>
                    <li><strong>Resize Before Compressing:</strong> Don't upload a 4000px wide image if it will only be displayed at 800px. Use an <Link to="/image-resizer">Image Resizer</Link> first.</li>
                    <li><strong>Find the Sweet Spot:</strong> Adjust the compression quality slider to find the perfect balance between file size and visual fidelity. Often, a quality setting of 70-80% provides massive file size savings with barely noticeable visual changes.</li>
                  </ol>

                  <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl my-8">
                    <h3 className="text-indigo-900 font-bold mt-0">Pro Tip</h3>
                    <p className="text-indigo-800 mb-0">
                      Always aim to keep your web images under 200KB if possible, and large hero images under 500KB. This ensures your site remains snappy even on mobile networks.
                    </p>
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    Optimizing your images is one of the easiest and most effective ways to improve your website's performance. Try our free, secure <Link to="/image-compressor">Image Compressor</Link> today and experience the difference of 100% client-side processing!
                  </p>
                </>
              )}

              {post.slug === 'json-formatter-online-free-guide' && (
                <>
                  <h2>The Challenge of Raw JSON</h2>
                  <p>
                    JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web. It's lightweight, language-independent, and easy for machines to parse. However, when APIs return minified JSON—a single, massive line of text with no spaces or line breaks—it becomes nearly impossible for humans to read, debug, or understand.
                  </p>
                  <p>
                    Whether you are a frontend developer inspecting an API response, a backend engineer debugging a webhook payload, or a data analyst extracting information, you need a reliable way to format and visualize this data.
                  </p>

                  <h2>Why Use a Client-Side JSON Formatter?</h2>
                  <p>
                    There are countless JSON formatters available online, but many of them pose a significant security risk. When you paste your JSON into a traditional server-side tool, that data is transmitted across the internet and processed on a remote server. If your JSON contains API keys, personal user data (PII), or proprietary business logic, you are exposing sensitive information.
                  </p>
                  <p>
                    Our JSON formatter solves this by running 100% locally in your browser using JavaScript.
                  </p>
                  <ul>
                    <li><strong>Absolute Security:</strong> Your data never leaves your machine. It is parsed and formatted within your browser's memory.</li>
                    <li><strong>Instant Results:</strong> Without the latency of a network request, formatting even large JSON payloads happens in milliseconds.</li>
                    <li><strong>Syntax Validation:</strong> The tool instantly highlights syntax errors, helping you pinpoint missing commas or unmatched brackets.</li>
                  </ul>

                  <h2>Features of a Great JSON Tool</h2>
                  <p>
                    A basic formatter just adds indentation. A great developer tool goes further:
                  </p>
                  <ol>
                    <li><strong>Collapsible Trees:</strong> When dealing with deeply nested objects, the ability to collapse and expand nodes is crucial for navigating the data structure.</li>
                    <li><strong>Syntax Highlighting:</strong> Color-coding keys, strings, numbers, and booleans makes the data instantly scannable.</li>
                    <li><strong>Minification:</strong> Sometimes you need to go the other way—taking formatted JSON and removing all whitespace to reduce payload size before sending it to an API.</li>
                  </ol>

                  <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl my-8">
                    <h3 className="text-indigo-900 font-bold mt-0">Pro Tip</h3>
                    <p className="text-indigo-800 mb-0">
                      If you are working with encoded data within your JSON (like a JWT or an encoded file), you can use our <Link to="/base64-encoder">Base64 Decoder</Link> to inspect those specific values after formatting the main JSON structure.
                    </p>
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    Stop struggling with unreadable API responses and stop risking your sensitive data on server-side tools. Bookmark our secure, fast <Link to="/json-formatter">JSON Formatter</Link> and streamline your development workflow today.
                  </p>
                </>
              )}

              {post.slug === 'best-free-online-tools-2026' && (
                <>
                  <h2>The Evolution of Web Tools</h2>
                  <p>
                    The landscape of web development and digital productivity has shifted dramatically. In the past, developers and creators relied heavily on bulky desktop software or paid subscriptions for simple utilities. Today, the power of modern web browsers allows complex tasks to be performed instantly, securely, and for free, right in your browser tab.
                  </p>
                  <p>
                    As we navigate 2026, the emphasis has moved towards privacy-first, client-side applications. Here is a look at the essential free online tools that are saving professionals hours of time.
                  </p>

                  <h2>Essential Developer Utilities</h2>
                  <p>
                    Every developer needs a reliable toolkit for daily tasks. Instead of writing custom scripts or opening heavy IDEs, these web-based tools provide instant solutions:
                  </p>
                  <ul>
                    <li><strong><Link to="/json-formatter">JSON Formatter & Validator:</Link></strong> Essential for debugging API responses and formatting minified data structures securely.</li>
                    <li><strong><Link to="/base64-encoder">Base64 Encoder/Decoder:</Link></strong> A must-have for handling data URIs, basic authentication headers, and decoding web tokens.</li>
                    <li><strong><Link to="/uuid-generator">UUID Generator:</Link></strong> Quickly generate RFC-compliant Version 4 UUIDs for database keys and session identifiers without writing a line of code.</li>
                    <li><strong><Link to="/url-encoder">URL Encoder:</Link></strong> Safely format query parameters and decode complex, percent-encoded URLs.</li>
                  </ul>

                  <h2>Content & Design Optimization</h2>
                  <p>
                    For marketers, bloggers, and designers, optimizing assets and text is a daily requirement:
                  </p>
                  <ul>
                    <li><strong><Link to="/image-compressor">Image Compressor:</Link></strong> Drastically reduce image file sizes to boost website loading speeds and improve SEO Core Web Vitals.</li>
                    <li><strong><Link to="/image-resizer">Image Resizer:</Link></strong> Quickly adjust photo dimensions for specific social media platforms or blog layouts while maintaining aspect ratios.</li>
                    <li><strong><Link to="/word-counter">Word & Character Counter:</Link></strong> Ensure your meta descriptions, tweets, and essays hit the exact required length.</li>
                    <li><strong><Link to="/text-case-converter">Text Case Converter:</Link></strong> Instantly fix capitalization errors or format titles and programming variables (camelCase, snake_case).</li>
                    <li><strong><Link to="/color-picker">Color Converter:</Link></strong> Seamlessly translate brand colors between HEX, RGB, and HSL formats for CSS stylesheets.</li>
                  </ul>

                  <h2>Security & Privacy First</h2>
                  <p>
                    The most significant trend in 2026 is the demand for privacy. Tools like our <strong><Link to="/password-generator">Strong Password Generator</Link></strong> utilize the browser's native Crypto API to generate secure passwords locally. 
                  </p>
                  <p>
                    Whether you are compressing personal photos or formatting proprietary JSON data, the standard is now 100% client-side processing. Your data should never be uploaded to a remote server just to perform a simple utility task.
                  </p>

                  <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl my-8">
                    <h3 className="text-indigo-900 font-bold mt-0">Pro Tip</h3>
                    <p className="text-indigo-800 mb-0">
                      Bookmark this suite of tools! Having a trusted, secure, and ad-free hub for these utilities will streamline your workflow and keep your data safe.
                    </p>
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    Efficiency is about having the right tools accessible exactly when you need them. Explore our full suite of free, secure, client-side utilities and elevate your productivity today.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
