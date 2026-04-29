import { Link } from "react-router-dom";
import type { BlogEntry } from "../types";

interface BlogCardProps {
  blog: BlogEntry;
}

function BlogCard({ blog }: BlogCardProps) {
  const { thumbnailUrl, title, desc, date, slug } = blog.fields;

  return (
    <article>
      <Link to={`/blog/${slug}`}>
        <div className="article-image">
          <div className="icon-arrow"></div>
          <img src={thumbnailUrl} alt={title} />
        </div>
        <div className="article-text">
          <h4 className="title">{title}</h4>
          <p>{desc}</p>
          <span className="time">{date}</span>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard;
