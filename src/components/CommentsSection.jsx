import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

export default function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [commentBody, setCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
  setIsLoading(true);
  setError(null);

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

 const handleSubmitComment = (event) => {
    event.preventDefault();

    if (!commentBody.trim()) {
      setPostError("Comment cannot be empty.");
      return;
    }

    setIsPosting(true);
    setPostError(null);

    fetch(
      `https://be-nc-news-3exq.onrender.com/api/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "grumpy19", 
          body: commentBody,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then(({ comment }) => {
        setComments((current) => [comment, ...current]);
        setCommentBody(""); 
        setIsPosting(false);
      })
      .catch(() => {
        setPostError("Sorry, your comment could not be posted.");
        setIsPosting(false);
      });
  };

  return (
    <section className="comments-section">
      <h3>Comments</h3>

      <form onSubmit={handleSubmitComment}>
        <label htmlFor="new-comment">Add a comment:</label>
        <textarea
          id="new-comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Type your comment..."
          rows={4}
        />

        {postError && <p style={{ color: "red" }}>{postError}</p>}

        <button
          type="submit"
          disabled={isPosting || commentBody.trim() === ""}
        >
          {isPosting ? "Posting..." : "Post comment"}
        </button>
      </form>

      {isLoading && <p>Loading comments…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!isLoading && !error && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <p>
                <strong>{comment.author}</strong>
              </p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}