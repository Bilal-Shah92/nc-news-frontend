import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../components/CommentsSection";

export default function SingleArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [voteChange, setVoteChange] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);
    setVoteChange(0);
    setVoteError(null);

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

  const handleVote = (change) => {
    if (!article) return;

    setVoteError(null);
    setIsVoting(true);

    setVoteChange((currentChange) => currentChange + change);

    fetch(`https://be-nc-news-3exq.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: change }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update votes");
        return res.json();
      })
      .then(({ article: updatedArticle }) => {
        setArticle(updatedArticle);
        setVoteChange(0); 
        setIsVoting(false);
      })
      .catch(() => {
        setVoteChange((currentChange) => currentChange - change);
        setVoteError("Something went wrong while voting. Please try again.");
        setIsVoting(false);
      });
  };

  if (isLoading) return <p>Loading article…</p>;
  if (err) return <p>Error: {err}</p>;

  const {
    title,
    author,
    topic,
    body,
    votes,
    comment_count,
    article_img_url,
    created_at,
  } = article;

  const displayedVotes = votes + voteChange;

  return (
    <main className="single-article">
      <img src={article_img_url} alt={title} />
      <h2>{title}</h2>
      <p>
        By <strong>{author}</strong> | {topic}
      </p>

      <p>
        👍 {displayedVotes} | 💬 {comment_count}
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "0.5rem",
          marginTop: "0.25rem",
        }}
      >
        <button
          onClick={() => handleVote(1)}
          disabled={isVoting}
          aria-label="Upvote this article"
        >
          +1
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={isVoting}
          aria-label="Downvote this article"
        >
          -1
        </button>
      </div>

      {voteError && (
        <p style={{ color: "red", marginBottom: "0.5rem" }}>{voteError}</p>
      )}

      <p>{body}</p>

      <CommentsSection articleId={article_id} />
    </main>
  );
}
