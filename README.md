# React + Vite

# chatapp - Language Learning Chat Application

# Overview

Streamify is a full-stack language learning application that connects users with language exchange partners worldwide. The platform enables users to practice conversations, make friends, and improve their language skills through real-time chat and video calls.

# Features
* User Authentication: Secure signup, login and logout functionality
* User Onboarding: Personalized profile creation with language preferences
* Friend System: Send, accept, and manage friend requests
* Real-time Chat: Message your language partners
* Video Calls: Practice speaking with face-to-face conversations
* Recommendations: Find language partners based on your learning goals
* Notifications: Get notified about friend requests and messages

# Tech Stack
## Backend
* Node.js & Express.js: Server framework
* MongoDB & Mongoose: Database and ODM
* JWT: Authentication
* Stream Chat SDK: Real-time messaging
* bcrypt: Password hashing
* Cookie-parser: Cookie handling
  
## Frontend

* React: UI library
* React Router: Navigation
* TanStack Query: Data fetching and caching
* Tailwind CSS: Styling
* DaisyUI: UI components
* React Hot Toast: Notifications
* Lucide React: Icon library
* Zustand: State management

# Installation
## Prerequisites
* Node.js (v16+)
* MongoDB
* npm or yarn

## Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
# JWT_SECRET_KEY=your_jwt_secret
# MONGODB_URI=your_mongodb_connection_string
# STREAM_API_KEY=your_getstream_api_key
# STREAM_API_SECRET=your_getstream_api_secret
# CLIENT_URL=http://localhost:5173

# Start development server
npm run dev
```

## Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with the following variables
# VITE_API_URL=http://localhost:3000/api
# VITE_STREAM_API_KEY=your_getstream_api_key

# Start development server
npm run dev
```

## Project Structure
### Backend
```bash
backend/
  ├── src/
  │   ├── controllers/        # Request handlers
  │   ├── middleware/         # Express middleware
  │   ├── models/             # Mongoose schemas
  │   ├── routes/             # API routes
  │   ├── lib/                # Database and Stream.io setup
  │   └── server.js           # Entry point
  └── package.json
```
### Frontend
```bash
frontend/
  ├── src/
  │   ├── api/                # API communication
  │   ├── assets/             # Static assets
  │   ├── components/         # Reusable UI components
  │   ├── constant/           # App constants
  │   ├── hooks/              # Custom React hooks
  │   ├── pages/              # Application pages
  │   ├── store/              # State management
  │   ├── utils/              # Helper functions
  │   ├── App.jsx             # Main component
  │   └── main.jsx            # Entry point
  ├── public/                 # Static files
  └── package.json
```
# Features Overview
## Authentication
* Register new accounts with email/password
* Login to existing accounts
* Secured routes with JWT

## User Profiles
* Personalized onboarding process
* Profile details including native and learning languages
* Profile pictures (random generation available)

## Social Features
* Send friend requests to language partners
* Accept or decline incoming requests
* View notifications for accepted requests

## Chat System
* Real-time messaging with language partners
* Message history and persistence
* Future Enhancements
* Group chat rooms based on language interests
* Audio messages for pronunciation practice
* Language learning resources and exercises
* Gamification elements to track progress
# License
This project is licensed under the MIT License.
