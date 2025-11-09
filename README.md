# 🌿 EcoNeighbor
*CS 160 – Team 7*

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
```

### 3) Create a .env file in the frontend folder
```bash
BASE_BACKEND_URL="http://localhost:3000"
```
