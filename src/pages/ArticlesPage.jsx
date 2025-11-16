import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

export default function ArticlesPage() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);

    const params = new URLSearchParams();
    if (topic) params.append("topic", topic);

    params.append("sort_by", sortBy);
    params.append("order", order);

    const url = `https://be-nc-news-3exq.onrender.com/api/articles?${params.toString()}`;

    fetch(url)
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
  }, [topic, sortBy, order]);

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSearchParams({ sort_by: newSortBy, order });
  };

  const handleOrderToggle = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  if (isLoading) return <p>Loading articles…</p>;
  if (err) {
  return (
    <main>
      <h2>Not Found</h2>
      <p>
        Sorry, we couldn’t find what you were looking for.
      </p>
      <a href="/topics">Go back to topics</a>
    </main>
  );
}

  return (
    <main>
      <h2>{topic ? `Articles about ${topic}` : "All Articles"}</h2>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <label htmlFor="sort-by">
          Sort by:{" "}
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </label>

        <button type="button" onClick={handleOrderToggle}>
          {order === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>
      </section>

      <section className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
    </main>
  );
}
