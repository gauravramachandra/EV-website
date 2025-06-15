# Tesla Clone - Full Stack Implementation

A modern, responsive Tesla-inspired website built with React, Node.js, and MongoDB.

## Features

- Responsive landing page with full-screen hero sections
- Product pages with detailed specifications
- Car customizer with real-time price updates
- User authentication (signup/login)
- Order management system

## Tech Stack

### Frontend
- React (TypeScript)
- Tailwind CSS
- Axios

### Backend
- Node.js + Express (TypeScript)
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing

---

## Getting Started

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd tesla-clone
```

### 2. **Install Dependencies**
#### Frontend:
```bash
cd frontend
npm install
```
#### Backend:
```bash
cd ../backend
npm install
```

### 3. **Environment Variables**
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```
- For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/tesla`
- For MongoDB Atlas, use your connection string.

### 4. **Seed the Database**
Populate the database with Tesla products:
```bash
cd backend
npx ts-node src/seed.ts
```

### 5. **Run the Development Servers**
#### Start Backend:
```bash
cd backend
npm run dev
```
#### Start Frontend (in a new terminal):
```bash
cd frontend
npm start
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## Usage
- Register a new user or log in from the "Login" button in the navbar.
- Browse Tesla models, view details, and customize your car.
- Place an order (requires login).
- Orders and users are saved in MongoDB.

---

## Deployment

### Frontend (Vercel/Netlify)
- Deploy the `frontend` folder using your preferred static hosting.

### Backend (Render/Heroku)
- Deploy the `backend` folder as a Node.js service.
- Set environment variables in your hosting dashboard.

---

## API Endpoints

### Auth
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login

### Products
- `GET /api/products` — All products
- `GET /api/products/:id` — Product details

### Orders
- `POST /api/orders` — Place order (requires JWT)

---

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---
