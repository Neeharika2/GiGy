# GiGy Task Marketplace

GiGy is a task marketplace platform with a Node.js/Express backend and MongoDB database.

Live link - http://4.240.88.99/


## 📌 Table of Contents
- [Features](#features)
- [Problem Statement](#-problem-statement)
- [Tech Stack](#-tech-stack)
- [My Contributions](#-my-contributions)
- [Challenges Faced](#-challenges-faced)
- [What I Learned](#-what-i-learned)
- [Folder Structure](#-folder-structure)
- [How to Run Locally](#-how-to-run-locally)
- [Notes](#Notes)

---
## Features

- User registration and authentication (JWT)
- Gig posting, assignment, and completion
- Applications and reviews
- Real-time chat with Socket.IO
- Profile management and image uploads (Cloudinary)
- REST API endpoints
  
---

## ❓ Problem Statement

Most existing freelance platforms are either too complex or lack real-time communication features. GiGy was built to solve the following:
- A **simplified flow** for gig posting and application
- **Instant communication** between users
- **Minimalist and responsive** UI/UX

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Real-Time Chat
- Socket.IO

### Authentication
- JWT with protected routes and token-based auth

### File Uploads
- Cloudinary

### Deployment
- Azure VM
- NGINX reverse proxy
- PM2 process manager

---

## 👨‍💻 My Contributions

As the **primary backend contributor**, I:

- Designed and implemented the full RESTful backend architecture
- Built models and controllers for users, gigs, and applications
- Developed real-time chat functionality using Socket.IO
- Integrated Cloudinary for image uploads with secure API calls
- Set up production deployment using NGINX, PM2, and SSL on Azure
- Debugged MongoDB queries and optimized API performance

---

---

## 🧠 Challenges Faced

- Integrating real-time chat with room-based logic
- Handling token expiration securely during API requests
- Syncing Cloudinary uploads with MongoDB document updates
- Configuring NGINX reverse proxy + SSL certs on Azure VM
- Managing socket disconnections and reconnect logic

---

## 🧠 What I Learned

- Advanced Node.js API structuring and error handling
- Practical NGINX & PM2 setup for scalable deployment
- Real-time WebSocket implementation for chat apps
- Handling production-level debugging and log tracing
- Front-to-back coordination in a full-stack architecture

---

## How to run locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Neeharika2/GiGy.git
   cd GiGy
   ```

2. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values, or edit `.env` directly.

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The server runs on `http://localhost:5000`.


## Project Structure

```
backend/
  controllers/
  middleware/
  models/
  routes/
  utils/
  server.js
  .env
forntend/
   public/
   src/
   .env
...
```  


## Notes 

- Uploaded files are stored in `/uploads` (excluded from git).
- For Cloudinary integration, set your credentials in `.env`.
- For any issues, check logs or open an issue.

