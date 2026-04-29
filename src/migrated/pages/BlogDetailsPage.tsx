import { createElement, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { fetchBlogBySlug, fetchBlogs } from "../lib/contentful";
import type { BlogContentItem, BlogEntry } from "../types";

function renderTextWithLinks(text: string): ReactNode[] {
  const linkPattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\[(https?:\/\/[^\]]+)\]|(https?:\/\/[^\s]+)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = linkPattern.exec(text);

  while (match) {
    const [fullMatch, markdownLabel, markdownUrl, bracketUrl, plainUrl] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const href = markdownUrl || bracketUrl || plainUrl;
    const label = markdownLabel || bracketUrl || plainUrl;

    if (href && label) {
      nodes.push(
        <a
          key={`${href}-${start}`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {label}
        </a>,
      );
    }

    lastIndex = start + fullMatch.length;
    match = linkPattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderContentItem(item: BlogContentItem, key: string) {
  if (typeof item === "string") {
    return <p key={key}>{renderTextWithLinks(item)}</p>;
  }

  if (item.type === "heading") {
    const headingTag = `h${item.level ?? 3}` as
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6";

    return createElement(headingTag, { key }, renderTextWithLinks(item.text));
  }

  if (item.type === "subheader") {
    return <h3 key={key}>{renderTextWithLinks(item.text)}</h3>;
  }

  return <p key={key}>{renderTextWithLinks(item.text)}</p>;
}

function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogEntry | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      if (!slug) {
        navigate("/404", { replace: true });
        return;
      }

      const entry = await fetchBlogBySlug(slug);
      if (!entry) {
        navigate("/404", { replace: true });
        return;
      }

      const entries = await fetchBlogs();
      setAllBlogs(entries);
      setBlog(entry);
      document.title = entry.fields.title;
      setLoading(false);
    })();
  }, [slug, navigate]);

  if (loading || !blog) {
    return <Skeleton />;
  }

  const { title, date, content, nextSlug } = blog.fields;
  const nextBlog = allBlogs.find((entry) => entry.fields.slug === nextSlug);

  return (
    <main id="journal">
      <div className="spacer">
        <article className="single">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div className="mar-top-lg">
                  <span className="time">{date}</span>
                  <h2 className="article-title">{title}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                {content.map((item, index) =>
                  renderContentItem(item, `${blog.sys.id}-content-${index}`),
                )}
              </div>
            </div>
          </div>
          <div className="next-article">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-12">
                <p>Next Article</p>
                <h2>
                  {nextBlog ? (
                    <Link to={`/blog/${nextBlog.fields.slug}`}>
                      {nextBlog.fields.title}
                    </Link>
                  ) : (
                    <Link to="/blog">Back to blog</Link>
                  )}
                </h2>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

export default BlogDetailsPage;
