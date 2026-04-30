
# ✈️ AeroBook - Flight Booking Web Application

![AeroBook Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)

AeroBook is a modern, full-stack flight booking web application built using the MERN stack. It allows users to search for global flights with an intelligent autocomplete engine, book tickets, and manage their reservations through a premium, responsive user interface.

## ✨ Features

* **Advanced Flight Search:** Search for flights between thousands of global airports using a highly optimized, dynamic autocomplete input.
* **Secure Authentication:** User registration and login protected by JWT (JSON Web Tokens) and bcrypt password hashing.
* **User Dashboard:** Dedicated portal for users to view booking history, manage active reservations, and cancel tickets.
* **Admin Dashboard:** Role-based access control allowing administrators to manage flights, monitor bookings, and oversee user accounts.
* **Premium UI/UX:** A stunning, modern interface built with Tailwind CSS, featuring glassmorphism elements, custom animations, and "boarding pass" style result cards.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

**Frontend:**
* React.js (via Vite)
* Tailwind CSS (Styling & UI)
* Axios (API calls)
* React Router (Navigation)

**Backend:**
* Node.js & Express.js (Server framework)
* MongoDB & Mongoose (Database & ODM)
* JSON Web Token (JWT) (Authentication)
* Bcrypt.js (Password encryption)

## 🚀 Installation and Setup

Follow these steps to run the project locally on your machine.

### Prerequisites
* Node.js installed on your machine
* MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone [https://github.com/AP24110010176/FLIGHT-BOOKING-WEB-APPLICATION.git](https://github.com/AP24110010176/FLIGHT-BOOKING-WEB-APPLICATION.git)
cd FLIGHT-BOOKING-WEB-APPLICATION
2. Backend Setup
Bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file
touch .env
Add the following variables to your backend/.env file:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
Run the backend server:

Bash
npm run dev
3. Frontend Setup
Open a new terminal window/tab:

Bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Create a .env file
touch .env
Add the following variable to your frontend/.env file:

Code snippet
VITE_API_URL=http://localhost:5000/api
Run the frontend development server:

Bash
npm run dev
The application will now be running at http://localhost:5173.

📁 Folder Structure
Plaintext
FLIGHT-BOOKING-WEB-APPLICATION/
├── backend/
│   ├── controllers/      # API logic (auth, flights, bookings)
│   ├── middleware/       # JWT verification & role checks
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API routes
│   └── server.js         # Entry point for backend
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components (Navbar, Cards)
    │   ├── pages/        # Main views (Home, Dashboard, Search Results)
    │   ├── App.jsx       # Main React component
    │   └── main.jsx      # React DOM rendering
    ├── tailwind.config.js# Tailwind theme and custom styling
    └── vite.config.js    # Vite configuration

🤝 Contributors
Yeshwanth Nuvvula - AP24110010176
Sai Vardhan Kalva- AP24110010213
Sathwik - AP24110010218
Naresh C - AP24110010223

