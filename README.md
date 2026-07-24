# 🌿 Rooted — Client

**Rooted** is a modern, premium real-estate platform where users can buy, rent, and discover properties — with the help of **Sage**, an AI-powered assistant that understands natural language and helps users find exactly what they're looking for. This repository contains the **frontend (client-side)** application.

🔗 **Live Website:** [https://rooted-client.vercel.app/](https://rooted-client.vercel.app/)
📦 **Frontend Repo:** [github.com/MahbubaSultanaEty/rooted-client](https://github.com/MahbubaSultanaEty/rooted-client)
📦 **Backend Repo:** [github.com/MahbubaSultanaEty/rooted-server](https://github.com/MahbubaSultanaEty/rooted-server)

---

## ✨ Overview

Rooted lets users search, filter, save, and inquire about real-estate listings through a fast, elegant interface — while **Sage**, the built-in AI chatbot, gives them a more conversational way to explore the platform. Instead of manually applying filters, users can simply describe what they want (e.g. *"Show me a 3-bedroom apartment in Dhaka under 50 lakh"*) and Sage interprets the request, suggests matching properties, and can answer general questions about listings, neighborhoods, pricing, or how the platform works.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | Tailwind CSS + CSS Variables |
| Icons | [lucide-react](https://lucide.dev/) |
| Data Fetching & Caching | [@tanstack/react-query](https://tanstack.com/query) |
| Authentication | `better-auth` client integration |
| Notifications | `react-hot-toast` |
| Deployment | Vercel |

---

## 🔑 Key Pages & Modules

### 🏠 Landing Page (`/`)
- **Hero Section** — instant property search with quick shortcuts.
- **How It Works** — a 3-step guide to using the platform.
- **Sage Preview** — a live preview of the AI assistant right on the homepage, inviting users to start a conversation.
- **Explore by City** — browse properties from major cities (Dhaka, Chattogram, Sylhet, Rajshahi, etc.).

### 🔍 Explore Page (`/explore`)
- URL query-based, server-side filtering — search query, city, property type, bedrooms, and price range are synced directly with URL search params (shareable, bookmarkable searches).
- Server-side pagination for browsing large result sets efficiently.

### 🏡 Property Details Page (`/property/[id]`)
- Dynamic data fetching using the property's ID or slug.
- Full property gallery, key features (size, beds, baths, etc.), amenities list, and the current user's saved/bookmarked status.
- Listing agent's name and email, with a direct contact button.

### 🤖 Sage — AI Guide (`/sage`)
Sage is Rooted's built-in AI assistant, offering a chat-style interface for natural-language property discovery and support:
- **Conversational property search** — describe what you're looking for in plain language and get relevant suggestions back.
- **Guidance & information** — ask general questions about the platform, listings, pricing, locations, or the buying/renting process.
- **Context-aware responses** — Sage tailors suggestions based on the details provided during the conversation.
- **Seamless handoff** — matching properties surfaced by Sage link directly to their full details page.

### 👤 Profile & Admin (`/profile`)
Role-aware profile page with two distinct views:
- **Regular Users / Agents**
  - View the status of their own listings (total & active count).
  - Quick action to add a new property.
  - Saved-properties grid, bookmarked locally via `localStorage` and updated in real time across the app.
- **Admin Users**
  - A privileges widget summarizing admin capabilities (user management, listing moderation, platform settings).
  - A direct "Go to Admin Dashboard" action instead of listing-management shortcuts.

### 🔐 Auth
- Login / signup flows powered by `better-auth`.
- Session-aware route protection (e.g. `/profile` redirects unauthenticated users to `/login`).

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/MahbubaSultanaEty/rooted-client.git
cd rooted-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

**Environment variables (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure (high level)

```
rooted-client/
├── app/
│   ├── page.js                # Landing page
│   ├── explore/                # Explore & filtering
│   ├── property/[id]/          # Property details
│   ├── sage/                    # Sage AI assistant
│   ├── profile/                  # User / Admin profile
│   ├── login/                     # Auth pages
│   └── admin/                      # Admin dashboard
├── components/
│   ├── PropertyCard.jsx
│   └── ...
├── lib/
│   └── auth-client.js
└── public/
```

---

##  Deployment

The client is deployed on **Vercel**: [https://rooted-client.vercel.app/](https://rooted-client.vercel.app/)

To deploy your own instance, connect the repository to Vercel and set the `NEXT_PUBLIC_API_URL` environment variable to your deployed backend URL.

---

## 🔗 Related

- Backend / API: [`rooted-server`](https://github.com/MahbubaSultanaEty/rooted-server) (Node.js, Express, MongoDB)

---

## 👩‍💻 Author

**Mahbuba Sultana**
GitHub: [@MahbubaSultanaEty](https://github.com/MahbubaSultanaEty)