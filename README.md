# 🌿 EcoNeighbor

_CS 160 – Team 7_

---

## 🧩 Prerequisites

Make sure you have the following installed before starting:

- **Node.js:** 22.20.0 LTS
- **npm:** 10.9.3
- **PostgreSQL:** 14.19

---

## ⚙️ Setup

### 1) Install dependencies

```bash
cd backend
npm install
cd ..
cd frontend
npm install
```

### 2) Create a .env file in the backend folder

```bash
# Backend port:
PORT=3000

# Database information
PGHOST=localhost
PGPORT=5432
PGDATABASE=EcoNeighbordb
PGUSER=postgres
PGPASSWORD=your_password

# Nodemailer information
EMAILUSER="your_email"
EMAILPASS="your_email_password"
GOVEMAIL="gov_email"

# cookies and jwt
NODE_ENV="development"
JWT_SECRET=your_secret

# Gemini AI Key (required for AI Recommendations)
GEMINI_API_KEY=your_gemini_key_here
```

### 3) Create a .env file in the frontend folder

```bash
BASE_BACKEND_URL="http://localhost:3000"
```

### 4) AI Recommendation Feature Set Up (Gemini API)
EcoNeighbor uses Google Gemini to generate automated recommended actions for community reports.

To use the AI feature, each developer must create their own API key.

1. Create a Gemini API Key

Visit: https://aistudio.google.com/app/apikey

Sign in using a personal Gmail account

School/work accounts may restrict model access

Click “Create API Key”

Copy the key and paste into your /backend/.env:
```bash
GEMINI_API_KEY=your_key_here
```

2. Model Requirements

Your API key MUST support the following Gemini 2.x model:
- models/gemini-2.5-flash

3. No SDK Needed

We use a direct REST API integration, so no extra NPM package is required.
