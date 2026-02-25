# 🚀 Smart Bench Resource Manager

A full-stack application that helps Project Managers identify suitable bench employees for projects and calculate the cost of idle resources.

---

## 📌 Overview

This system allows:

- Viewing available projects
- Matching bench employees based on skills
- Calculating daily idle cost (PM only)
- AI-based Skill Gap Suggestion
- Skill distribution visualization
- Role-based access control using JWT

---

## 🏗 Architecture

Backend follows layered architecture:

Controller → Service → DTO → Model

Frontend uses:

Lazy-loaded Angular modules + Bootstrap UI + ApexCharts

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Hashing)

### Frontend
- Angular
- Bootstrap 5
- ApexCharts
- HTTP Interceptor for JWT

---

## 🔐 Authentication

Role-based access:

- **PM** → Can see Daily Loss
- **EMPLOYEE** → Cannot see Daily Loss

---

# 🚀 HOW TO RUN PROJECT

download project

Angular  - npm i , ng serve
nodejs - npm i , npm run start

---

# 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-bench-resource-manager.git
cd smart-bench-resource-manager
