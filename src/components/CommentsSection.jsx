import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

export default function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  setIsLoading(true);

  fetch(`https://be-nc-news-3exq.onrender.com/api/articles/${articleId}/comments`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load comments");
      return res.json();
    })
    .then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
}, [articleId]);

  return (
    <section>
      <h2>Comments</h2>
      {isLoading && <p>Loading comments…</p>}
      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <ul>
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
