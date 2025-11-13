export default function CommentCard({ comment }) {
  const { author, body, votes, created_at } = comment;

  const date = new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="comment-card" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <p><strong>{author}</strong> • {date}</p>
      <p>{body}</p>
      <p>👍 {votes}</p>
    </li>
  );
}
