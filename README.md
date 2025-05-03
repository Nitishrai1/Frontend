🧠 Tasky Frontend

Tasky is a collaborative frontend interface built using Vite, React, and TailwindCSS, for managing user tasks, notifications, and project submissions.

🔧 Tech Stack

Layer        Technology

Frontend       React, Vite

Styling        TailwindCSS

State Mgmt       Context API / LocalStorage

Deployment        Docker, Vercel

---
📁 Project Structure

```bash
TASKY-FRONTEND/
│
├── public/                   # Static assets
├── src/                      # Source code
│   ├── components/           # Reusable components
│   ├── pages/                # Routes & views
│   ├── services/             # API calls
│   └── main.jsx              # App entry point
│
├── .env                      # Environment variables
├── index.html                # Main HTML
├── JenkinsFile               # CI/CD pipeline
├── dockerfile                # Docker build config
├── docker-compose.yml        # Docker compose
├── vite.config.js            # Vite config
├── tailwind.config.js        # Tailwind CSS setup
├── postcss.config.js         # PostCSS plugins
├── package.json              # Dependencies
└── README.md
```
---
🚀 Getting Started

🔧 Installation

```bash
git clone https://github.com/yourusername/tasky-frontend.git
cd tasky-frontend
npm install
```
---

🔐 Environment Setup

Create a .env file:

```bash
VITE_API_BASE_URL=http://localhost:5000
```
---

🧪 Run Development Server

```bash
npm run dev
```