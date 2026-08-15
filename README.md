# Smart Complaint Management System (SCMS)

A web-based platform for citizens to report civic issues and for municipal authorities to efficiently manage, assign, and resolve them.

## Tech Stack
- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router

## Folder Structure Overview
- `/src/components` - Reusable UI components (DataTable, Modal, StatusBadge, etc.)
- `/src/context` - Global state management (AuthContext, ToastContext)
- `/src/data` - Mock data mimicking a backend database
- `/src/layouts` - Layout wrappers for different user roles
- `/src/pages` - Page-level components organized by role (`/admin`, `/staff`, `/user`, `/auth`, `/shared`)
- `/src/routes` - Application routing logic
- `/src/utils` - Reusable utility functions (validation, date formatting, status styling)

## How to Run Locally
1. Ensure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Current Status
**Frontend complete with mock data — backend/database integration in progress.**

## User Roles
The system currently supports three distinct roles. You can test each role using the demo credentials provided on the login page.
1. **Citizen (User):** Can submit new complaints, track the status of their submitted complaints, and manage their profile.
2. **Staff (Resolver):** Can view complaints assigned to them and update their status (e.g., from 'In Progress' to 'Resolved').
3. **Admin:** Has a comprehensive overview of all complaints. Can manage staff members, manage categories, and assign complaints to specific staff.
