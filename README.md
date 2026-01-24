# Assignment 2 – REST API with Authentication, Testing & Documentation

## 📌 Overview
This project is part of **Assignment 2**, in which we developed a fully functional **REST API** using **Node.js**, **Express**, **TypeScript**, **Jest**, and **Swagger**.

The API extends the specifications from **Assignment 1** and adds:
- Full **CRUD operations** for Users
- Authentication using **JWT with refresh tokens**
- Proper relations between **Users, Posts, and Comments**
- **Unit tests** with sufficient coverage
- **Swagger documentation** for all endpoints

The project was developed collaboratively using **Git** and **Pull Requests**.

---

## 🛠 Technologies Used
- **Node.js**
- **Express**
- **TypeScript**
- **JWT (Access & Refresh Tokens)**
- **Jest** – unit testing & coverage
- **Swagger (OpenAPI)** – API documentation
- **Git & GitHub** – version control and collaboration

---

## 📂 API Features

### 👤 Users
- Create, read, update, and delete users
- Each user includes:
  - `username`
  - `email`
  - additional profile-related fields as needed

### 🔐 Authentication
- User registration
- Login with JWT authentication
- Refresh token mechanism for session renewal
- Logout functionality

### 📝 Posts
- Users can create posts
- Each post is associated with a specific user

### 💬 Comments
- Users can add comments to posts
- Each comment is linked to:
  - a user
  - a specific post

The relationships between **Users**, **Posts**, and **Comments** reflect real-world interactions.

---

## 🧪 Testing
- All API endpoints are covered with **unit tests** using **Jest**
- Tests verify:
  - Correct functionality
  - Authentication and authorization
  - Error handling
- Jest coverage is provided as part of the submission

---

## 📖 API Documentation
- The entire API is documented using **Swagger**
- Swagger provides:
  - Clear endpoint descriptions
  - Request/response schemas
  - Authentication requirements

---

## 🤝 Collaboration & Git Workflow
- The project was developed collaboratively
- Each team member worked on their assigned tasks
- All changes were integrated using **Git Pull Requests**
- A Git network graph screenshot is included in the submission

---

## 📎 Submission Includes
- 🔗 **Link to the GitHub repository**
- 🎥 **Link to a short video showing the tests running**
- 📸 **Screenshot of the Git network graph**
- 📊 **Screenshot of Jest coverage report**

---

## ▶️ Running the Project (Optional)
```bash
npm install
npm run build
npm run start
