# BearTracks

## Overview

BearTracks is a full-stack task management application designed to explore modern web development practices, including authentication, secure credential handling, client-server communication, and dynamic UI updates.
The project focuses on building a responsive user experience while maintaining clean architecture, modular code organization, and secure backend design.

## Demo

![BearTracks Demo](/assets/demo.gif)

## Features

- Multi-user accounts with secure registration and login
- JWT-based authentication and session management
- Protected RESTful API routes for each user
- Secure password storage using Bcrypt hashing
- Persistent data storage with MongoDB
- Full CRUD Task Management (Create, Read, Update, Delete)
- Dynamic UI updates without full page reloads
- Form validation with real-time feedback
- Built-in safeguards to prevent invalid operations and maintain UI consistency

## Tech-Stack

- Frontend: JavaScript (ES Modules), HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Testing: Jest
- Security: JWT, Bcrypt

## How to Run Locally

Prerequisites

- Node.js
- npm
- MongoDB Atlas account

1. Clone the repository

```
git clone https://github.com/michellely825/BearTracks-Task-Management-Application.git
cd BearTracks-Task-Management-Application
```

2. Install dependencies

```
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
ID_TOKEN_SECRET=your_jwt_secret
```

3. Run the server

```
npm run devStart
```

4. Open in browser

```
http://127.0.0.1:5500/public/index.html
```

## Summary of Key Learnings

- Client-Server Architecture: Designed structured request/response flows between frontend and backend services
- Authentication & Security: Implemented JWT-based session handling and secure password storage
- State Management & UI Synchronization: Coordinated DOM updates with persisted database state
- Modular Code Organization: Separated logic into helpers and reusable modules for maintainability
- Error Handling & Validation: Built defensive checks and user-friendly validation flows to prevent invalid application states
- Testing: Wrote unit tests to verify utility functions and UI behavior
- Git/Version Control: Practiced Git workflows and incremental feature development
- UI/UX Design: Developed a playful animal-tracks theme with character selection to enhance user experience

## Ideas for Future Improvements

- Add task categories (e.g. Today's Priorities, Tomorrow's Problems) or some sort of tagging system
- Implement due dates and reminders
- Adopt a Test-Driven Development workflow for new features
- Expand unit test coverage
- Replace the checklist interface with a Kanban-style layout
- Add a contribution/visual activity tracker (GitHub-style “green chart”)
- Introduce stronger password requirements (e.g. length, at least one uppercase/lowercase, validation feedback)
- Incorporate task completion reward system (e.g. streaks, badges, confetti)
