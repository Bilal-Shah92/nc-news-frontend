# Routes

## `/` Articles List (topic, sort by, order)
This is the homepage where users will land. 
The / signifies that it is the root route. 
### It will show:
- A list of all the articles from the API (GET /api/articles)
- Three dropdowns where users can filter the list
  - Topic will show a particular type of article such as coding (?topic=coding)
  - Sort By will sort the articles by votes or dates (?sort_by=votes)
  - Order will organise it by ascending or descending order (?order=desc)

Changing these options will make the front end fetch and re render the list of articles with the filters added.

**Example**
GET api/articles?topic=coding&sort_by=votes&order=desc

## `/articles/:article_id` ##

This refers to a **single article page** which will show the full article. 
Can be accessed when clicking on an article from the homepage.

It is a dynamic route because article_id can change depending on which article was clicked. 
e.g 
- `/article/5` will be article with ID 5.
- `/article/2` will be article with ID 2.

### It will show:
 - The full article body - title, text, author, votes.
 - Upvote or downvote button
 - A comment section where you can:
   - See all comments
   - Add a new comment
   - Delete your own comments

**Example**

This data can be accessed by fetching:

 GET /api/articles/article_id
 
 GET /api/articles/article_id/comments