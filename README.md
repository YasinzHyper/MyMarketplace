# Simplified Marketplace Application

A basic marketplace built with the ERN stack (Express.js, React, Node.js) using Vite and Airtable.

## Setup

### Backend
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Create `.env` from `.env.example` and add your Airtable API key and base ID.
4. Set up Airtable base with `Products` and `Orders` tables (see server.js for fields).
5. Run: `node server.js`.

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run: `npm run dev`.
4. Access at `http://localhost:5173`.

## Features
- Browse and search products.
- Add, edit, delete own product listings.
- Place orders and view placed/received orders.
- Responsive UI with Tailwind CSS.
