# Vitalize: AI Health Coach Web App

Vitalize is a modern, mobile-friendly web application that helps users track their daily places, receive personalized AI health coaching, and privately store their health memories. The app is built with Next.js, Tailwind CSS, Framer Motion, Clerk for authentication, and Convex for backend data storage.

---

## Features

- **Landing Page:**
  - Bold, glassy, gradient-based design.
  - Always visible, regardless of authentication state.
  - Dynamic hero heading based on sign-in status.

- **Authentication:**
  - Clerk-powered sign-in and sign-up at `/auth`.
  - Users are redirected to `/dashboard` after login.
  - Secure, protected routes for dashboard features.

- **Dashboard:**
  - **Two-column layout:**
    - **Left:** "Places You Went Today" with Google Maps Places Autocomplete. Users can add/remove places they visited.
    - **Right:** "AI Health Coach" chatbot. Provides tailored, evidence-based feedback based on user goals and places.
  - **API Key Management:** Users enter their own Google Maps and OpenAI API keys in the navbar. Features are enabled only when both keys are valid.
  - **My Memories:**
    - Button at the top right of the dashboard card.
    - Modal to view, edit, delete, and restore past daily memories (places + chat).
    - Progress summary: total memories, streak, most visited place.
  - **Fully responsive, glassy, and modern UI.**

- **Backend (Convex):**
  - Stores daily memories (places and chat) per user and date.
  - Provides queries and mutations for saving, editing, deleting, and restoring memories.

---

## Project Structure

```
/ (root)
├── apps/
│   └── web/                # Next.js frontend app
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx           # Landing page
│       │   │   ├── dashboard/         # Dashboard route
│       │   │   ├── auth/              # Auth route (Clerk)
│       │   │   ├── structure/         # Layout, global styles, etc.
│       │   │   ├── system/            # Error, not-found, error boundary
│       │   ├── components/            # UI components (Header, Hero, Features, etc.)
│       │   ├── lib/                   # Utility functions
│       ├── public/                    # Static assets
│       ├── ...
├── packages/
│   └── backend/
│       └── convex/                    # Convex backend functions
│           ├── memories.ts            # Memory CRUD logic
│           ├── schema.ts              # Convex DB schema
│           ├── ...
├── README.md
└── ...
```

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Clerk API keys (for authentication)
   - Convex project setup (see Convex docs)

3. **Run the Convex backend:**
   ```sh
   cd packages/backend
   npx convex dev
   ```

4. **Run the Next.js frontend:**
   ```sh
   cd apps/web
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Sign up or log in to access the dashboard.
   - Enter your Google Maps and OpenAI API keys in the navbar to enable all features.

---

## Key Technologies
- **Next.js (App Router)**: Modern React framework for SSR and routing.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **Framer Motion**: Animations and transitions.
- **Clerk**: Authentication and user management.
- **Convex**: Serverless backend/database for storing user memories.

---

## Contributing
- PRs and issues are welcome!
- Please keep code clean, modular, and well-documented.

---

## License
MIT
