# 🛍️ ShopApp Backend API

A production-ready RESTful Backend API built with **Node.js**, **Express.js**, and **MongoDB** featuring JWT Authentication, Refresh Token Authentication, User Management, Product Management, Global Error Handling, and MongoDB Atlas integration.

## 🚀 Live API

**Base URL**

https://shopapp-backend-imrk.onrender.com

## 🔗 GitHub Repository

https://github.com/reactxnative/ShopApp-Backend

---

# ✨ Features

- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Logout
- User Profile
- Update Profile
- Product CRUD
- Product Search
- MongoDB Atlas Integration
- Mongoose ODM
- Password Hashing using bcrypt
- Global Error Handling Middleware
- Async Error Handling
- Environment Variable Configuration
- RESTful API Design

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- express-async-handler

---

# 📂 Project Structure

```
src
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
└── server.js
```

---

# 📌 Authentication APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/signup |
| POST | /api/auth/login |
| POST | /api/auth/refresh-token |
| POST | /api/auth/logout |

---

# 👤 User APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/user/profile |
| PUT | /api/user/update-profile |

---

# 📦 Product APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/products/add |
| GET | /api/products/:id |
| PATCH | /api/products/:id |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |
| GET | /api/products/search?name=keyword |

---

# 🔐 Authentication

Protected APIs require a Bearer Token.

```
Authorization: Bearer <access_token>
```

---

# ⚙️ Installation

```bash
git clone https://github.com/reactxnative/ShopApp-Backend.git

cd ShopApp-Backend

npm install
```

Create a `.env` file

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret
```

Start the server

```bash
npm run dev
```

---

# 🧪 API Testing

A complete Postman Collection is included in this repository for testing all APIs. :contentReference[oaicite:0]{index=0}

---

# 📈 Highlights

- Production-ready REST API
- JWT + Refresh Token Authentication
- Secure Password Hashing
- MongoDB Atlas Cloud Database
- Global Error Handling
- RESTful Architecture
- Clean Folder Structure
- Ready for Deployment

---

# 📬 Connect With Me

**Rahul Singh**

Senior React Native & React Developer
- Gmail: reactxnative@gmail.com
- LinkedIn: https://www.linkedin.com/in/rahul-singh-react-native/
- Portfolio: https://rahul-singh-profile.vercel.app/
- YouTube: https://youtube.com/@ReactXNativeCode
