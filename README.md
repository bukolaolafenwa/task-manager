# TaskDuty

## Overview

TaskDuty is a full-stack MERN (MongoDB, Express, React and Node.js) application designed to help users manage personal and professional tasks efficiently. The application allows users to create, view, update and delete tasks while organising them with tags, tracking deadlines and monitoring completion status.

This project was developed as part of a Full Stack Web Development internship to demonstrate practical implementation of CRUD operations, RESTful API development, React state management, reusable component architecture, responsive design and MongoDB integration.

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
  * School
  * Meeting

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

### Frontend Requirements Implemented

* React Functional Components
* React Hooks (useState, useEffect)
* React Router DOM
* Axios for API communication
* Form handling
* Dynamic rendering of tasks
* Loading states
* Responsive design
* Reusable components
* Multi-tag selection
* Navigation after task creation and update
* Delete confirmation prompts
* Conditional rendering
* Filtering by tags
* Filtering by completion status

### Backend Requirements Implemented

* Express REST API
* MongoDB integration
* Mongoose schema validation
* Error handling using try/catch
* Proper HTTP status codes
* Route parameter handling
* Single task retrieval using ID
* CRUD controller architecture

---

## Features

* Create new tasks
* View all tasks
* View individual task details
* Update existing tasks
* Delete tasks
* Assign multiple tags to tasks
* Filter tasks by tags
* Filter tasks by completion status
* Track task completion status
* Set due dates
* Loading states for improved user experience
* Delete confirmation prompts
* Automatic redirection after successful task creation and updates
* Responsive design across desktop, tablet and mobile devices
* MongoDB database integration
* RESTful API architecture
* Reusable React components

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
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3600
```

Replace the values with your own configuration.

---

## REST API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

### Get Single Task

```http
GET /api/tasks/:id
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Validation Implemented

### Backend Validation

* Required field validation
* MongoDB ObjectId validation
* Task existence checks
* Error handling for invalid requests
* Mongoose schema validation

### Frontend Validation

* Required field validation
* Title validation
* Description validation
* Due date validation
* Tag selection validation
* Controlled form inputs
* Form submission handling
* Error handling for failed requests

---

## Learning Outcomes

This project strengthened my understanding of:

* React state management with useState
* Side effects using useEffect
* React Router navigation
* Dynamic route parameters
* TypeScript interfaces and type safety
* Axios API integration
* CRUD operations
* RESTful API design
* Express.js backend development
* MongoDB and Mongoose
* Error handling and debugging
* Reusable component architecture
* Responsive design using Tailwind CSS
* Task filtering and state management
* Full-stack application architecture

---

## Demo

The application demonstrates:

* Create Task
* Read/View Tasks
* Update Task
* Delete Task
* Multi-tag Selection
* Task Status Management
* Tag Filtering
* Status Filtering
* Responsive User Interface

---

## Known Issues

No known functional issues at this time.

All core features, including CRUD operations, task filtering, status management and responsive layouts, are fully functional.

Minor UI refinements may still be made in future iterations, particularly around more responsive spacing, padding consistency and closer alignment with the original Figma design.


---

## Future Improvements

* User authentication and authorization
* Search functionality
* Due date reminders
* Task sorting options
* Drag-and-drop task management
* Dark mode support
* Toast notifications
* Pagination

---

## Screenshots

Screenshots and application demo will be added after deployment.

---

## Author

**Bukola Olafenwa**

Full Stack Web Development Intern

Tech Studio Academy

GitHub: https://github.com/bukolaolafenwa

---

## License

This project is intended for educational, learning and portfolio purposes.
