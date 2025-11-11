# Data Flow

This describes how the frontend will communicate with the backend API and how the data will move between the components.

---

## ArticlesPage (/)
When the page loads or when topic/sort/order are filtered, the app builds a query and fetches the list of articles. It does this by GET /api/articles?topic=&sort_by=&order=. 
The results fill the articles and gets passed to **Articles List**. They are then rendered and displayed as **Article Card** components. 
**Articles List** and **Article Card** do not fetch themselves, they only display the data given to them by **Articles Page**. 

---

## Article Page (/articles/:article_id)
This reads the 'article_id' from the URL and does two things. 
Fetches the article from GET /api/articles/:article_id.
Fetches the comments from GET /api/articles/:article_id/comments. 
The article data is then passed to **Article Body** and the comments are passed into the **Comments Section**. 

### Voting
The articles votes can be increased or decreased using the upvote or downvote button inside the **article body**.
This will make a PATCH /api/articles/:article_id request with { inc_votes: ±1 }.
The UI will upodate this through optimistic rendering and can revert if the request fails. 

---

## Comment Form (Inside Comments Section):
When the user submits a comment, the form will send a POST /api/articles/:article_id/comments with { username, body }.
If successful, the new comment will be inserted into the comments list, ideally at the top to meet users expectation, and if the reqquest fails, the optimistic insert is removed and an error is shown. 

---

## Comments Card (Inside Comments Section)
If the user is logged in and writes a comment, a **Delete** button will appear. Clicking it sends a DELETE /api/comments/:comment_id. 
The comment is removed optimistically and restored if the request fails.

---

### Summary
- **Articles Page** handles fetching lists of articles and managing filters.
- **Article Page** handles fetching a single article and its comments.
- **Article Body**, **CommentForm**, and **CommentCard** handle user interactions (vote, post, delete) that trigger updates to the API.
- All interactions use optimistic rendering for a more responsive user experience and to meet user expectations. 