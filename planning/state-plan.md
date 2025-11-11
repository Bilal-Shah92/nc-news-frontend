# State Plan

This document explains which components will store and manage data (state) in the app and why.  
State should be kept “as low as possible but as high as necessary,”  
so child components can receive what they need through props.

---

## ArticlesPage (Homepage)
This component will store the list of all articles and the filter options that the user selects such as topic, sort order, and sorting type.  
It will also keep track of whether data is currently being loaded or if something goes wrong during the fetch.  

This page is responsible for fetching the articles and updating the display whenever a filter changes.  
The data is then passed down to **ArticlesList**, which shows multiple **ArticleCard** components.

---

## ArticlePage (Single Article)
This component will store the data for one article.  
It will handle fetching that article’s information from the backend based on the article ID in the URL.  
It also keeps track of whether the data is still loading or if there’s an error.  

Once the article is fetched, it’s passed into **ArticleBody** to be displayed.

---

## CommentsSection (inside ArticlePage)
This component will store all the comments that belong to the current article.  
It will handle fetching, displaying, and updating comments.  
It will also track when comments are loading or when an error happens.  

---

## CommentForm (inside CommentsSection)
This component will store what the user types into the comment box before submitting a comment.  
It will also keep track of whether a comment is currently being submitted.  
This state only belongs to this form and does not need to be shared with other components.

---

## Summary
- **ArticlesPage** manages the main list of articles and the filter options.  
- **ArticlePage** manages one article’s data.  
- **CommentsSection** manages the comments for that article.  
- **CommentForm** manages what the user types before submitting.  
- Components like **ArticleList**, **ArticleCard**, and **ArticleBody** only display data passed down to them and do not store any state themselves.
