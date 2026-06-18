# HostelCare - Complaint Management System

A full-stack Complaint Management System developed using the MERN stack to manage the complete lifecycle of complaints, from issue reporting and staff assignment to progress tracking and final resolution. The platform serves as a centralized solution for improving communication, accountability, and operational efficiency within a hostel environment.

Built with role-based access control, JWT authentication, RESTful APIs, and MongoDB, the application demonstrates the design and implementation of a secure, scalable, and user-centric complaint management workflow.

---

## Features


### User

* Register and Login
* Submit complaints
* Track complaint status
* View complaint history
* View progress updates from staff

### Admin

* View all complaints
* Filter complaints by status
* Assign complaints to staff members
* Monitor complaint progress

### Staff

* View assigned complaints
* Update complaint status
* Add progress messages
* Resolve complaints

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Vite
* CSS3
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

---

## Screenshots

### Login Page

Secure JWT-based authentication system.

![Login Page](screenshots/Login.png)

### User Dashboard

Users can submit complaints and track their status.

![User Dashboard](screenshots/UserDashboard.png)

### Admin Dashboard

Administrators can assign complaints to staff members.

![Admin Dashboard](screenshots/AdminDashboard.png)

### Staff Dashboard

Staff members can manage and update assigned complaints.

![Staff Dashboard](screenshots/StaffDashboard.png)

### Complaint Tracking

Users can view complaint history and status updates.

![Complaint Tracking](screenshots/UserComplaint.png)

---

## Authentication & Security

* JWT-Based Authentication
* Role-Based Authorization
* Protected Routes
* Password Hashing with bcryptjs
* Environment Variables using .env
* Session Expiration Handling
* Secure MongoDB Connection

---

## Project Structure

Complaint-System/

├── Backend/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   └── server.js

│

├── Frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   └── styles/

│   └── vite.config.js

│

├── screenshots/

├── README.md

└── .gitignore

---

## Complaint Workflow

User

↓

Create Complaint

↓

Admin Reviews Complaint

↓

Assigns Staff Member

↓

Staff Updates Status

↓

Resolved

---

## Environment Variables

### Backend (.env)

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=3001

### Frontend (.env)

VITE_API_URL=http://localhost:3001/api

---

## Installation

### Clone Repository

git clone <repository-url>

cd Complaint-System

### Backend Setup

cd Backend

npm install

npm start

### Frontend Setup

cd Frontend

npm install

npm run dev

---

## Learning Outcomes

This project strengthened my understanding of:

* React Component Architecture
* React Hooks
* State Management
* Props and Component Reusability
* React Router
* REST APIs
* JWT Authentication
* Role-Based Access Control
* MongoDB and Mongoose
* Backend API Design
* Error Handling
* Environment Variables
* Production Readiness Practices

---

## Author

Akanksha Bhanage

B.Tech CSE Student

Full Stack Developer
