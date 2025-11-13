import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch("https://be-nc-news-3exq.onrender.com/api/articles")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles…</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <main>
      <h2>All Articles</h2>
      <section className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
    </main>
  );
}
