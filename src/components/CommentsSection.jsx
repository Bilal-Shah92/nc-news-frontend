import { useState, useEffect } from "react";

export default function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [commentBody, setCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const loggedInUser = "grumpy19";

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setDeleteError(null);

    fetch(
      `https://be-nc-news-3exq.onrender.com/api/articles/${articleId}/comments`
    )
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
          username: loggedInUser,
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

  const handleDeleteComment = (commentId) => {
    setDeleteError(null);
    setDeletingId(commentId);

    fetch(
      `https://be-nc-news-3exq.onrender.com/api/comments/${commentId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete comment");
        setComments((current) =>
          current.filter((comment) => comment.comment_id !== commentId)
        );
        setDeletingId(null);
      })
      .catch(() => {
        setDeleteError("Sorry, your comment could not be deleted.");
        setDeletingId(null);
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

      {deleteError && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{deleteError}</p>
      )}

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

              {comment.author === loggedInUser && (
                <button
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={deletingId === comment.comment_id}
                >
                  {deletingId === comment.comment_id ? "Deleting..." : "Delete"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
