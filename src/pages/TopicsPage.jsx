import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);

    fetch("https://be-nc-news-3exq.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load topics");
        return res.json();
      })
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics…</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <main>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
