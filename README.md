# TaskDuty

## Overview

TaskDuty is a full-stack MERN (MongoDB, Express, React and Node.js) application designed to help users manage personal and professional tasks efficiently. The application allows users to create, view, update and delete tasks while organising them with tags, tracking deadlines, monitoring completion status and securely managing personal accounts.

This project was developed as part of a Full Stack Web Development Internship to demonstrate practical implementation of CRUD operations, RESTful API development, JWT Authentication, Authorization, React state management, reusable component architecture, responsive design, MongoDB integration and secure user-specific data management.

---

## Assignment Requirements Implemented

### Full-Stack MERN Application

This project was built using:

* MongoDB
* Express.js
* React
* Node.js
* TypeScript

### Task Properties

Each task contains:

* Title

* Description

* Due Date

* Multiple Tags

  * Work
  * Personal
  * Important
  * Urgent

* Completion Status

  * Pending
  * Completed

### CRUD Operations

The application supports:

* Create a new task
* Read/List all tasks
* View a single task
* Update task details
* Delete a task

---

## Week 2 – Authentication, Authorization & User Profiles

This project extends the Week 1 Personal Task Manager by implementing secure JWT Authentication, Authorization and User Profile Management.

### JWT Authentication

Implemented features include:

* User Registration (name, email and password)
* User Login
* Secure Password Hashing using bcrypt
* JWT Token Generation
* JWT Token Verification
* Persistent JWT Storage using localStorage
* Secure Logout Functionality

### Authorization & Protected Routes

Implemented features include:

* Protected API Routes
* Protected React Routes
* Route Redirection for Unauthenticated Users
* Middleware to Verify JWT Tokens
* Middleware to Attach Authenticated User Information to Requests
* User-Specific Task Management
* Task Ownership Validation
* User Isolation Between Accounts

### Frontend Requirements Implemented

* Login Page with Form Validation
* Registration Page with Form Validation
* JWT Persistence using localStorage
* Protected Routes in React
* Display Logged-in User Information in the Navbar
* Logout Functionality
* Dynamic Profile Image Display

### Backend Requirements Implemented

* User Model built with Mongoose
* Unique Email Validation
* JWT Verification Middleware
* Request User Attachment (req.user)
* User-Specific Task Access Control
* User-Scoped Query and Filter Operations
* Secure Password Storage using bcrypt

### Extra Feature Implemented

Profile Management System

Users can:

* View Profile Information
* Update Full Name
* Update Bio
* Change Password
* Upload Profile Images using Cloudinary
* Track Personal Task Statistics
* View Task Completion Rate
* View Account Creation Date (Member Since)

### Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* User-Specific Data Access
* Task Ownership Validation
* Secure Token Handling
* Proper User–Task Association

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* JWT Token Persistence
* Secure Logout
* Protected Routes

### Authorization

* User-Specific Task Access
* User-Specific Task Updates
* User-Specific Task Deletion
* Task Ownership Validation
* User Isolation Between Accounts

### Task Management

* Create new tasks
* View all personal tasks
* View individual task details
* Update existing tasks
* Delete tasks
* Assign multiple tags to tasks
* Filter tasks by tags
* Filter tasks by completion status
* Track task completion status
* Set due dates

### User Profiles

* View Profile Information
* Edit Profile Details
* Update Full Name
* Update Bio
* Change Password
* Upload Profile Images using Cloudinary
* Dynamic Navbar Profile Image
* Profile Analytics

### Task Analytics

* Total Tasks Count
* Completed Tasks Count
* Pending Tasks Count
* Task Completion Rate
* Member Since Information

### User Experience

* Loading States
* Delete Confirmation Prompts
* Automatic Redirection after Successful Task Creation and Updates
* Responsive Design across Desktop, Tablet and Mobile Devices
* Reusable React Components

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cloudinary

### Development Tools

* VS Code
* Git & GitHub
* MongoDB Compass
* Postman

---

## Project Structure

```text
task-manager
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── types
│   └── ...
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── ...
│   └── ...
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=3600

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3600
```

---

## REST API Endpoints

### Authentication

```http
POST /api/auth/register
```

```http
POST /api/auth/login
```

```http
GET /api/auth/me
```

### Profile

```http
PUT /api/auth/update-profile
```

```http
PUT /api/auth/change-password
```

```http
PUT /api/auth/update-profile-image
```

### Tasks

```http
GET /api/tasks
```

```http
GET /api/tasks/:id
```

```http
POST /api/tasks
```

```http
PUT /api/tasks/:id
```

```http
DELETE /api/tasks/:id
```

---

## Validation Implemented

### Backend Validation

* Required Field Validation
* JWT Verification
* MongoDB ObjectId Validation
* User Authentication Checks
* Task Ownership Checks
* Task Existence Checks
* Error Handling for Invalid Requests
* Mongoose Schema Validation

### Frontend Validation

* Required Field Validation
* Login Form Validation
* Registration Form Validation
* Title Validation
* Description Validation
* Due Date Validation
* Tag Selection Validation
* Password Validation
* Password Confirmation Validation
* Profile Update Validation
* Controlled Form Inputs
* Form Submission Handling
* Error Handling for Failed Requests

---

## Learning Outcomes

This project strengthened my understanding of:

* React State Management with useState
* Side Effects using useEffect
* React Router Navigation
* Dynamic Route Parameters
* TypeScript Interfaces and Type Safety
* Axios API Integration
* CRUD Operations
* RESTful API Design
* Express.js Backend Development
* MongoDB and Mongoose
* JWT Authentication and Authorization
* Secure Token Handling
* Password Hashing using bcrypt
* Protected API Routes
* Protected Frontend Routes
* User-Specific Data Access
* Middleware Implementation
* Request Authentication using req.user
* User Profile Management
* Cloudinary Image Upload Integration
* Secure User–Task Association
* Error Handling and Debugging
* Reusable Component Architecture
* Responsive Design using Tailwind CSS
* Full-Stack Application Architecture

---

## Demo Coverage

The application demonstrates:

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User-Specific Task Management
* Create Task
* Read/View Tasks
* Update Task
* Delete Task
* Task Filtering
* Profile Management
* Password Change
* Profile Image Upload
* Logout Functionality
* User Isolation Between Accounts

---

## Known Issues

No known functional issues at this time.

All core features, including authentication, authorization, CRUD operations, task filtering, profile management, image uploads and responsive layouts, are fully functional.

Minor UI refinements may still be made in future iterations.

---

## Future Improvements

* Email Verification During Registration
* Password Reset via Email
* Search Functionality
* Due Date Reminders
* Task Sorting Options
* Drag-and-Drop Task Management
* Dark Mode Support
* Toast Notifications
* Dashboard Analytics
* Email Notifications
* Pagination

---

## Author

**Bukola Olafenwa**

Full Stack Web Development Intern

Tech Studio Academy

GitHub: https://github.com/bukolaolafenwa

---

## License

This project is intended for educational, learning and portfolio purposes.
