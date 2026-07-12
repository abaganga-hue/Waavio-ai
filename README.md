# Waavio – WhatsApp Marketing Platform

> Conversations That Drive Growth

---

## Deploy in 15 Minutes (No Developer Needed)

### Step 1 — Install Node.js
Go to https://nodejs.org → Download the LTS version → Install it.

### Step 2 — Install Git
Go to https://git-scm.com → Download → Install it.

### Step 3 — Create a GitHub Account
Go to https://github.com → Sign up (free).

### Step 4 — Upload this project to GitHub
1. Open **GitHub.com** → Click **"New repository"**
2. Name it `waavio` → Click **"Create repository"**
3. Open Terminal (Mac) or Command Prompt (Windows)
4. Run these commands one by one:

```bash
cd waavio
git init
git add .
git commit -m "Initial Waavio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/waavio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 5 — Deploy to Vercel (Free)
1. Go to https://vercel.com → Sign up with your GitHub account
2. Click **"New Project"**
3. Find **waavio** in the list → Click **"Import"**
4. Click **"Deploy"** — done!

Your app will be live at: `https://waavio.vercel.app`

You can also connect a custom domain like `app.waavio.in` from the Vercel dashboard.

---

## Run Locally (For Testing)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

---

## Project Structure

```
waavio/
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # App shell (sidebar + outlet)
│   │   ├── Sidebar.jsx       # Left navigation
│   │   ├── AIAssistant.jsx   # Floating AI chat
│   │   └── UI.jsx            # Shared components (Button, Card, Tag...)
│   ├── pages/
│   │   ├── Dashboard.jsx     # Main overview + stats
│   │   ├── Inbox.jsx         # Team chat inbox
│   │   ├── ChatBuilder.jsx   # Keyword flow trainer
│   │   ├── Campaign.jsx      # Campaign + Gemini poster builder
│   │   ├── Pipeline.jsx      # CRM kanban board
│   │   └── Settings.jsx      # Integrations + preferences
│   ├── App.jsx               # Routes
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + tokens
├── index.html
├── package.json
├── vite.config.js
└── vercel.json               # Routing config for Vercel
```

---

## Next Steps (Backend & Live Data)

To make the app fully live with real WhatsApp messaging:

### 1. WhatsApp Cloud API
- Create a Meta Developer account at https://developers.facebook.com
- Create an App → Add "WhatsApp" product
- Get your Phone Number ID and Access Token
- Add to Settings → Integrations in the app

### 2. Backend (Node.js)
A backend server handles:
- Sending messages via WhatsApp API
- Receiving incoming messages (webhook)
- Storing contacts and campaigns in a database
- User authentication

Recommended hosting: Railway.app (free tier available)

### 3. Database
- Supabase (https://supabase.com) — free PostgreSQL database
- Stores: users, contacts, campaigns, messages, pipeline leads

### 4. AI Features
- Google Gemini API key from https://makersuite.google.com
- Add key in Settings → Integrations → Google Gemini AI

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React 18 + Vite     |
| Routing    | React Router v6     |
| Icons      | Lucide React        |
| Charts     | Recharts            |
| Hosting    | Vercel (free)       |
| Fonts      | Inter (Google)      |

---

## Support
Built with Waavio branding. Product by Sathish.
