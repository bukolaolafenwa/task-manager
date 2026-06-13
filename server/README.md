# Task Manager API

A RESTful Task Management API built with Node.js, Express, TypeScript, MongoDB, and Mongoose. The application allows users to create, retrieve, update, delete, and filter tasks based on category and completion status.

This project was developed as part of a MERN Stack internship assessment and demonstrates backend development concepts including RESTful API design, MongoDB integration, server-side validation, filtering, and error handling.

===========================

## Features

### Task Management

- Create a new task
- Retrieve all tasks
- Retrieve a single task by ID
- Update task details
- Update task completion status
- Delete a task

### Filtering

- Filter tasks by category
- Filter tasks by completion status
- Combine multiple filters

### Validation

- All required fields must be provided
- Due date cannot be in the past
- Invalid MongoDB IDs are handled gracefully

### Error Handling

- Try/catch blocks used throughout controllers
- Appropriate HTTP status codes returned
- Consistent API response structure


===========================


## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB Atlas
- Mongoose

### Development Tools

- ts-node-dev
- dotenv
- cors
- morgan


===========================


## Project Structure

server
│
├── src
│   │
│   ├── config
│   │   └── db.ts
│   │
│   ├── controllers
│   │   └── taskController.ts
│   │
│   ├── models
│   │   └── Task.ts
│   │
│   ├── routes
│   │   └── taskRoutes.ts
│   │
│   └── index.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json


===========================


## Task Model

Each task contains the following fields:

| Field       | Type    | Required |
| ----------- | ------- | -------- |
| title       | String  | Yes      |
| description | String  | Yes      |
| dueDate     | Date    | Yes      |
| category    | String  | Yes      |
| completed   | Boolean | No       |

### Categories

- Work
- Personal
- Urgent

### Completion Status

- true
- false


===========================


## Installation

### Clone Repository

bash
git clone <repository-url>


### Navigate to Server

bash
cd server


### Install Dependencies

bash
npm install


### Create Environment Variables

Create a .env file in the root directory:

env
PORT=3600

MONGODB_URI=your_mongodb_connection_string

NODE_ENV=development

CLIENT_URL=http://localhost:5173


### Start Development Server

bash
npm run dev


Expected output:

bash
MongoDB Connected
Server running on port 3600


===========================


## API Endpoints

### Health Check

#### GET

`http
/api/health
`

Response:

`json
{
  "success": true,
  "message": "Task Manager API Running"
}
`

===========================


## Create Task

#### POST

`http
/api/tasks
`

Request Body:

`json
{
  "title": "Complete Internship Project",
  "description": "Finish backend and frontend",
  "dueDate": "2026-06-30",
  "category": "Work"
}
`

Response:

`json
{
  "success": true,
  "message": "Task created successfully",
  "data": {}
}
`

Status Code:

`http
201 Created
`

===========================


## Get All Tasks

#### GET

`http
/api/tasks
`

Response:

`json
{
  "success": true,
  "count": 2,
  "data": []
}
`

Status Code:

`http
200 OK
`

===========================


## Get Single Task

#### GET

`http
/api/tasks/:id
`

Example:

`http
/api/tasks/6846f9e4c1f7a1b2c3d4e5f6
`

Status Code:

`http
200 OK
`

===========================


## Update Task

#### PUT

`http
/api/tasks/:id
`

Example:

`json
{
  "completed": true
}
`

Response:

`json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {}
}
`

Status Code:

`http
200 OK
`

===========================

## Delete Task

#### DELETE

`http
/api/tasks/:id
`

Response:

`json
{
  "success": true,
  "message": "Task deleted successfully"
}
`

Status Code:

`http
200 OK
`

===========================


## Filtering

### Filter By Category

`http
GET /api/tasks?category=Work
`

### Filter By Completion Status

`http
GET /api/tasks?completed=true
`

### Filter By Pending Tasks

`http
GET /api/tasks?completed=false
`

### Filter By Category and Completion Status

`http
GET /api/tasks?category=Work&completed=true
`

===========================


## Validation Rules

### Required Fields

The following fields are mandatory:

- title
- description
- dueDate
- category

### Due Date Validation

The due date cannot be in the past.

Example response:

`json
{
  "success": false,
  "message": "Due date cannot be in the past"
}
`

===========================


## Error Handling
The API implements:

### 400 Bad Request

Returned when:

- Required fields are missing
- Invalid task ID is provided
- Due date is in the past

### 404 Not Found
Returned when:

- Task does not exist

### 500 Internal Server Error

Returned when:

- Unexpected server-side errors occur

Example:

`json
{
  "success": false,
  "message": "Failed to create task"
}
`

===========================


## Testing
API endpoints were tested using Postman.

CRUD operations tested:

- Create Task
- Read All Tasks
- Read Single Task
- Update Task
- Delete Task

Filtering tested:

- Category filtering
- Completion status filtering

===========================


## Author

Bukola Olafenwa
Full Stack Web Development Intern
Tech Studio Academy

