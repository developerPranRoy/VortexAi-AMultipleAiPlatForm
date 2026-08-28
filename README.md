# VortexAI

A multi-agent AI chat application built with a microservices architecture. VortexAI routes user messages to specialized AI agents — chat, search, coding, PDF, presentation, and vision — using LangGraph for orchestration.

## Architecture

```
Frontend (React + Vite)
        │
        ▼
  Gateway (port 8000)          ← single entry point, auth middleware, proxies requests
        │
   ┌────┼────────────┐
   ▼    ▼            ▼
 Auth  Chat        Agent        ← microservices
(8001)(8002)       (8003)
                     │
          ┌──────────┼──────────────┐
          ▼          ▼              ▼
        Router → chat / search / coding / pdf / ppt / vision
                   (LangGraph state machine)
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Gateway | 8000 | Reverse proxy, JWT auth, CORS |
| Auth | 8001 | Firebase authentication, user management |
| Chat | 8002 | Conversation and message persistence |
| Agent | 8003 | LangGraph multi-agent orchestration |
| Frontend | 5173 | React + Vite UI |
| Redis | 6379 | Session/cache layer |

## Tech Stack

**Frontend**
- React 19, Vite
- Redux Toolkit
- Tailwind CSS, HeroUI
- Firebase (auth client)
- Axios

**Backend**
- Node.js, Express 5
- MongoDB + Mongoose
- Redis (Docker)
- Firebase Admin SDK

**AI / Agent**
- LangChain + LangGraph
- Groq (chat, search, routing)
- Google Gemini (coding agent)

## Agents

| Agent | Handles |
|-------|---------|
| `chat` | General conversation, Q&A, advice |
| `search` | Current events, live data, recent info |
| `coding` | Code generation, debugging, software engineering |
| `pdf` | PDF reading, summarization, extraction |
| `ppt` | PowerPoint / presentation generation |
| `vision` | Image analysis and generation prompts |

The router LLM reads the user prompt and returns the agent name. LangGraph routes the state to the correct agent node.

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for Redis)
- MongoDB Atlas account
- Groq API key — [console.groq.com](https://console.groq.com)
- Google AI API key — [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Firebase project with Admin SDK credentials

### 1. Start Redis

```bash
cd backend
docker-compose up -d
```

### 2. Set up environment variables

Create `.env` files in each service folder. Use the examples below as a template.

**`backend/gateway/.env`**
```
PORT=8000
AUTH_SERVICE_URL=http://localhost:8001
CHAT_SERVICE_URL=http://localhost:8002
AGENT_SERVICE_URL=http://localhost:8003
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```

**`backend/services/auth/.env`**
```
PORT=8001
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
```

**`backend/services/chat/.env`**
```
PORT=8002
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
```

**`backend/services/agent/.env`**
```
PORT=8003
MONGODB_URL=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_ai_api_key
CHAT_SERVICE=http://localhost:8002
REDIS_URL=redis://localhost:6379
```

**`frontend/frontend/.env`**
```
VITE_API_URL=http://localhost:8000
```

### 3. Install dependencies and start each service

```bash
# Gateway
cd backend/gateway && npm install && npm run dev

# Auth service
cd backend/services/auth && npm install && npm run dev

# Chat service
cd backend/services/chat && npm install && npm run dev

# Agent service
cd backend/services/agent && npm install && npm run dev

# Frontend
cd frontend/frontend && npm install && npm run dev
```

## Project Structure

```
VortexAi/
├── backend/
│   ├── docker-compose.yml
│   ├── gateway/                  # API gateway + auth middleware
│   └── services/
│       ├── auth/                 # Firebase auth + user model
│       ├── chat/                 # Conversations + messages
│       └── agent/
│           ├── agents/           # Individual agent implementations
│           ├── graph/            # LangGraph state, router, graph
│           └── config/           # DB + LLM model config
└── frontend/
    └── frontend/
        ├── features/             # API call functions
        └── src/
            ├── components/       # React UI components
            └── redux/            # State slices + store
```

## Notes

- Never commit `.env` files or `serviceaccountKey.json`
- The `coding` agent uses Google Gemini; all other agents use Groq
- To find currently available Groq model IDs, run `node listModels.js` inside `backend/services/agent/`
