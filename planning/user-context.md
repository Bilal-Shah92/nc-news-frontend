# User Context Plan

The backend does not support authentication, so the frontend will simulate a logged-in user.

---

## Hardcoded User
The app will assume a single user is always logged in and all new articles/comments are posted by that user.

---

## Purpose
This username will be used for:
- Posting all new articles/comments (sent as part of the request body)
- Checking which comments belong to this user, so that the “Delete” button only appears on their own comments

---

## Implementation
The user will be hardcoded directly in the components that need it.  
This means no login system or React Context is required.
