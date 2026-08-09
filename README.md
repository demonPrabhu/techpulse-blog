# TechPulse — A Blog Platform for Tech Content

TechPulse is a blogging platform focused on technology — new languages, frameworks, tools, and emerging tech trends. Users can sign up, write and publish posts with rich text formatting, and browse articles from other authors — with permission-aware editing (only the post's author can edit or delete it).

**Live:** [techpulse-blogapp.netlify.app](https://techpulse-blogapp.netlify.app/)
**Repo:** [github.com/demonPrabhu/techpulse-blog](https://github.com/demonPrabhu/techpulse-blog)

![TechPulse Screenshot](./TechPulse.png)

## Features

- **Authentication** — Email/password signup and login, session-based auth via Appwrite
- **Post management (CRUD)** — Create, edit, and delete blog posts with a rich text editor (TinyMCE)
- **Author-based permissions** — Only the author of a post can edit or delete it; enforced via Appwrite permission rules and reflected in the UI
- **Global state management** — Redux Toolkit for auth/session state across the app
- **Form validation** — React Hook Form for login, signup, and post creation/editing
- **Responsive UI** — Built with Tailwind CSS v4
- **Client-side routing** — React Router v7, with clean URLs for individual posts

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| State Management | Redux Toolkit |
| Routing | React Router v7 |
| Forms | React Hook Form |
| Rich Text Editor | TinyMCE |
| Styling | Tailwind CSS v4 |
| Backend-as-a-Service | Appwrite (Auth, Database, Storage) |
| Deployment | Netlify |

## What I Built vs. What Appwrite Handles

To be precise about scope: **Appwrite is used as a Backend-as-a-Service** for authentication, database, and file storage — I did not write custom backend/server code. What I built is the full frontend integration layer: the Appwrite SDK calls for auth and CRUD operations, wiring that into Redux Toolkit for state management, permission-aware UI logic, form handling, and the entire React application.

## Getting Started

```bash
git clone https://github.com/demonPrabhu/techpulse-blog.git
cd techpulse-blog
npm install
```

Create a `.env` file with your Appwrite project credentials:
```
VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

Run locally:

```bash
npm run dev
```

## Roadmap

- [ ] Migrate to TypeScript
- [ ] Add unit/integration tests (React Testing Library)
- [ ] Add Zod schema validation to forms
- [ ] Add debounced search for posts

## Author

**Prabhat Bhatia**
[GitHub](https://github.com/demonPrabhu) · [LinkedIn](https://www.linkedin.com/in/prabhat-bhatia-6344141a0)