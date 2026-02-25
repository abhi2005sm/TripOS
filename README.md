# TripOS — The Premium AI Travel Operating System

TripOS is a state-of-the-art, production-grade travel planning platform. Designed for modern explorers, it combines a **luxury aesthetic** with a robust, **hardened backend** to provide scientific precision in itinerary generation and budget management.

![TripOS Hero](https://github.com/user-attachments/assets/7e7e6e5a-4e4c-4e4f-b1e1-1a2b3c4d5e6f) *Note: Replace with actual asset link if available*

## 💎 Design Philosophy: "The Premium Standard"
TripOS isn't just a travel app; it's a visual experience.
- **Glassmorphism**: Sophisticated background blurs and frosted-glass cards.
- **Micro-Animations**: Purposeful, smooth transitions and hover states.
- **Scientific Typography**: Utilizing the `Outfit` typeface for maximum legibility and premium feel.
- **Dynamic Loading**: Custom-crafted skeleton loaders for a zero-jank perceived performance.

## 🛡️ Security Architecture (Production-Ready)
Engineered for safety and scale from day one:
- **Hardened Headers**: Full protection via `helmet` (CSP, HSTS, etc.).
- **Brute Force Protection**: Aggressive rate limiting on authentication routes.
- **Input Integrity**: Structured validation using `express-validator`.
- **Session Safety**: JWT with industry-standard secure storage practices.
- **Error Boundaries**: Graceful fallback UI for unexpected runtime crashes.

## 🚀 Infrastructure & Stack
- **Frontend**: React (Vite) + Tailwind CSS v3 + Lucide Icons
- **Backend**: Node.js + Express 5.0 (ESM) + MongoDB Atlas
- **Planning Engine**: AI-driven itinerary generation and smart budget categorization.
- **SEO**: Dynamic title management and descriptive metadata for all routes.

## 🛠️ Quick Start

### 1. Project Anatomy
- **/backend**: Node.js/Express security-hardened API.
- **/ (Root)**: React (Vite) premium frontend with Tailwind CSS v3.

### 2. Environment Configuration

#### Backend (`/backend/.env`)
Copy `backend/.env.example` to `backend/.env` and fill in your values. Required keys:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_secure_refresh_secret_min_32_chars
JWT_EXPIRE=30m
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`/.env`)
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Execution (Two Terminals Required)

#### Terminal A: Start the Hardened Backend
```bash
cd backend
npm install
npm run dev
```

#### Terminal B: Launch the Premium UI
```bash
# From the root directory
npm install
npm run dev
```

### 4. Access the Experience
Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Deployment
1. Build the frontend: `npm run build`
2. Set `NODE_ENV=production`, `FRONTEND_URL` to your domain, and use a production MongoDB URI
3. Run the backend: `cd backend && npm start`
4. The Express server serves the built React app from `dist/` and handles API routes

## 📈 Roadmap & Features
- [x] **AI Generation**: Detailed 5-day itineraries with rich activity data.
- [x] **Budget Matrix**: Real-time spending analysis and category breakdown.
- [x] **Interactive Maps**: Dynamic pin mapping for planned destinations.
- [x] **Profile Control**: Real-time profile updates and avatar generation.
- [ ] **Cloud Sync**: Global synchronization across mobile and desktop (Coming Soon).

---
*Built with precision for the modern traveler.*
