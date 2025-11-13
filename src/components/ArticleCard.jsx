import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const {
    title,
    author,
    topic,
    votes,
    comment_count,
    created_at,
    article_id,
    article_img_url,
  } = article;

  const date = new Date(created_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <article className="article-card">
      <Link
        to={`/articles/${article_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={article_img_url}
          alt={title}
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
        <h3>{title}</h3>
        <p>
          by <strong>{author}</strong> | Topic: <em>{topic}</em>
        </p>
        <p>
          👍 {votes} | 💬 {comment_count}
        </p>
        <p>{date}</p>
      </Link>
    </article>
  );
}
