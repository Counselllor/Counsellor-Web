# Counsellor Panel for Counsellor Web

This directory contains components and utilities for the counsellor functionality of the Counsellor Web application.

## Features

- **Counsellor Dashboard**: Central hub for counsellors to manage their activities
- **Student Management**: View and interact with students
- **Appointment Scheduling**: Manage counselling sessions and appointments
- **Resources**: Access counselling resources and tools

## User Flow

1. When a user signs up as a "counsellor" in the registration form, they are automatically directed to the counsellor dashboard after login.
2. The counsellor dashboard provides a specialized interface for counsellors to manage their activities.
3. Regular users (students) cannot access the counsellor dashboard.

## Components

- `CounsellorDashboard.jsx` - Main dashboard component for counsellors
- `CounsellorSidebar.jsx` - Sidebar navigation for the counsellor panel
- `CounsellorDashboard.css` - Styles for the counsellor dashboard
- `CounsellorSidebar.css` - Styles for the counsellor sidebar

## Future Enhancements

- **Messaging System**: Direct communication with students
- **Document Management**: Upload and share resources with students
- **Calendar Integration**: Sync appointments with external calendars
- **Analytics Dashboard**: Track student progress and outcomes
- **Notification System**: Get alerts for new appointments and messages

## Usage

The counsellor panel is automatically accessible to users who register as counsellors. No additional setup is required.

## Security

- Only users with the user_type "counsellor" can access the counsellor dashboard
- Authentication is required to access any counsellor features
- Redirects unauthorized users to the main dashboard
