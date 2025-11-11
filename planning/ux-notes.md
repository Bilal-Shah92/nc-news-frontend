# UX Notes

This document explains how the app will feel for the user to use, focusing on loading, error handling, and accessibility.

---

## Loading

- Show clear loading states for the articles list, single article and comments, such as a loading message or a loading spinner. 
- Disable buttons so that double submissions do not happen when a request is occuring.

---

## Errors
- When an error happens, show a clear message and a way to retry, such as "Could not load articles, please try again"
- Use visual feedback, such as red text or alert boxes so the issue is more obvious. 

---

## Keyboard and Screen Reader Access
- Make sure all controls (topics, sort, order) and action buttons (vote, comment and delete) can be done by keyboard.
- Have aria-labels, such as role='alert' and 'Upvote article'