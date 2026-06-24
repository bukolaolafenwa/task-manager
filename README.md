# TaskDuty – Full Stack MERN Task Management Application

## Overview

TaskDuty is a full-stack MERN (MongoDB, Express, React and Node.js) application designed to help users manage personal and professional tasks efficiently. The application allows users to create, view, update, organize, soft delete and restore tasks while securely managing personal accounts and profile information.

This project was developed as part of a Full Stack Web Development Internship to demonstrate practical implementation of CRUD operations, RESTful API development, JWT Authentication, Authorization, React state management, reusable component architecture, responsive design, MongoDB integration, secure user-specific data management, Git version control workflows and feature branch development.

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
* Soft delete a task
* Restore deleted tasks

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
* Request User Attachment (`req.user`)
* User-Specific Task Access Control
* User-Scoped Query and Filter Operations
* Secure Password Storage using bcrypt

### Profile Management System

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

## Week 3 – Soft Delete, Trash Management & Git Versioning

This project was further extended by implementing a Soft Delete System and Git Feature Branch Workflow to improve task recovery, data safety and version control practices.

### Soft Delete Functionality

Instead of permanently deleting tasks, the application performs soft deletion by marking tasks as deleted and moving them to a dedicated Trash page.

Implemented features include:

* Soft Delete Tasks
* Dedicated Trash Page
* Restore Deleted Tasks
* User-Specific Trash Management
* Protected Trash Routes
* Restore Task Loading States
* Improved Task Recovery Workflow

### Git Versioning Workflow

The feature was developed using a dedicated Git feature branch:

```bash
feature/soft-delete
```

Git workflow implemented:

* Feature Branch Creation
* Independent Feature Development
* Feature Testing
* Live Branch Merge into Main
* GitHub Version Control Best Practices

This implementation improves user experience by preventing accidental permanent deletion of tasks while demonstrating practical Git branching and merging workflows.

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

* Create New Tasks
* View All Personal Tasks
* View Individual Task Details
* Update Existing Tasks
* Soft Delete Tasks
* View Deleted Tasks in Trash
* Restore Deleted Tasks
* Assign Multiple Tags to Tasks
* Filter Tasks by Tags
* Filter Tasks by Completion Status
* Track Task Completion Status
* Set Due Dates
* User-Specific Task Management

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
* Restore Task Loading States
* Delete Confirmation Prompts
* Automatic Redirection after Successful Task Creation and Updates
* Responsive Design across Desktop, Tablet and Mobile Devices
* Reusable React Components
* Improved Trash Page Interface
* Consistent Button States and Feedback

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
* MongoDB Atlas
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
POST /api/auth/login
GET /api/auth/profile
PUT /api/auth/profile
PUT /api/auth/profile-image
```

### Tasks

```http
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/count
GET /api/tasks/trash
PUT /api/tasks/restore/:id
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
* Soft Delete Architecture
* Task Recovery Systems
* Git Feature Branch Workflow
* Branch Merging Strategies
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
* Soft Delete Tasks
* View Deleted Tasks in Trash
* Restore Deleted Tasks
* Task Filtering
* Task Analytics
* Profile Management
* Password Change
* Profile Image Upload
* Logout Functionality
* User Isolation Between Accounts
* Git Feature Branch Workflow
* Live Branch Merge Workflow

---

## Known Issues

No known functional issues at this time.

All core features, including authentication, authorization, profile management, soft delete functionality, task restoration, filtering, image uploads and responsive layouts, are fully functional.

Minor UI refinements may still be made in future iterations.

---

## Future Improvements

* Permanent Delete from Trash
* Bulk Restore Tasks
* Bulk Delete Tasks
* Task Search Functionality
* Due Date Reminders
* Task Sorting Options
* Drag-and-Drop Task Management
* Dark Mode Support
* Toast Notifications
* Dashboard Analytics
* Email Verification
* Password Reset via Email
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
