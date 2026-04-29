import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchBlogs } from "../lib/contentful";
import type { BlogEntry } from "../types";

function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);

  useEffect(() => {
    document.title = "Butterfly Health Blog";

    void (async () => {
      const entries = await fetchBlogs();
      setBlogs(entries);
    })();
  }, []);

  return (
    <main id="journal">
      <div className="spacer">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
              <div className="page-intro mar-top-lg">
                <h1 className="page-title">Blog</h1>
                <p>Making research studies more accessible.</p>
              </div>
            </div>
          </div>
          <div className="articles-list mar-top-lg">
            <div className="grids">
              {blogs.map((blog) => (
                <BlogCard key={blog.sys.id} blog={blog} />
              ))}
            </div>
            <p>
              This blog is for informational purposes only and should not be
              considered professional medical advice. Butterfly Health assume no
              responsibility for errors or omissions in the content or for any
              actions taken based on the information provided.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BlogListPage;
