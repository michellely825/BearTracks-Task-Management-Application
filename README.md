# BearTracks

## Overview

BearTracks is a full-stack task management application designed to explore modern web development practices, including authentication, secure credential handling, client-server communication, and dynamic UI updates.
The project focuses on building a responsive user experience while maintaining clean architecture, modular code organization, and secure backend design.

## Demo

![BearTracks Demo](/assets/demo.gif)

## Features

- User registration and login workflow
- JWT-based authentication and session management
- RESTful API routes protected by authentication tokens
- Secure password storage using Bcrypt hashing
- Persistent data storage with MongoDB
- Full CRUD Task Management (Create, Read, Update, Delete)
- Dynamic UI updates without full page reloads
- Form validation with real-time feedback
- Defensive checks to prevent invalid operations and inconsistent UI state

## Tech-Stack

- Frontend: JavaScript (ES Modules), HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Testing: Jest
- Security: JWT, Bcrypt

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
