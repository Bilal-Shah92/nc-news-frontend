import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`https://be-nc-news-3exq.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article…</p>;
  if (err) return <p>Error: {err}</p>;

  const { title, author, topic, body, votes, comment_count, article_img_url, created_at, } =
    article;

  return (
    <main className="single-article">
      <img src={article_img_url} alt={title} />
      <h2>{title}</h2>
      <p>
        By <strong>{author}</strong> | {topic}
      </p>
      <p>
        👍 {votes} | 💬 {comment_count}
      </p>
      <p>{body}</p>
    </main>
  );
}
