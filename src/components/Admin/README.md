# Admin Functionality for Counsellor Web

This directory contains components and utilities for the admin functionality of the Counsellor Web application.

## Features

- **Admin Login**: Secure login for administrators
- **Admin Dashboard**: Central hub for managing the application
- **User Management**: View, edit, and delete users; grant or revoke admin privileges
- **Blog Management**: View, edit, and delete blog posts
- **College Management**: View, edit, and delete college information

## Setting Up the First Admin

There are two ways to set up an admin user:

### Method 1: Using the Profile Page (Recommended)

1. Register a regular user account through the application
2. Log in with that account
3. Go to your profile page by clicking the "Profile" button in the navbar
4. In your profile card (right side), scroll down to find the "Activate Admin Access" button
5. Click the button and confirm the action
6. Log out and log back in
7. You should now see an "Admin Panel" button in the navbar

### Method 2: Using the Console Script

If Method 1 doesn't work for any reason, you can try this alternative method:

1. Register a regular user account through the application
2. Log in with that account
3. Open the browser console (F12 or right-click > Inspect > Console)
4. Copy and paste the following code into the console:

```javascript
// Get the current user ID from localStorage
const userId = localStorage.getItem("userUid");

if (!userId) {
  console.error("No user is currently logged in. Please log in first.");
} else {
  // Get a reference to the Firebase database
  const dbRef = firebase.database().ref();

  // Update the user's isAdmin field to true
  dbRef.child('users').child(userId).update({ isAdmin: true })
    .then(() => {
      console.log("Success! The current user is now an admin.");
      console.log("You can now log out and log back in to access admin features.");
      localStorage.setItem("isAdmin", "true");
    })
    .catch((error) => {
      console.error("Error making user an admin:", error);
    });
}
```

5. Press Enter to run the script
6. You should see a success message if the operation was successful
7. Log out and log back in
8. You should now see an "Admin Panel" button in the navbar

## Admin Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard

## Security

The admin functionality is secured through:

1. **Firebase Authentication**: Only authenticated users can access admin features
2. **Role-based Authorization**: Only users with the `isAdmin` flag set to `true` can access admin features
3. **Firebase Database Rules**: Rules are set up to restrict access to admin-only operations

## File Structure

- `AdminLogin.jsx` - Admin login component
- `AdminDashboard.jsx` - Main admin dashboard component
- `AdminSidebar.jsx` - Sidebar navigation for admin pages
- `../../styles/AdminLogin.css` - Styles for admin login
- `../../styles/AdminDashboard.css` - Styles for admin dashboard
- `../../styles/AdminSidebar.css` - Styles for admin sidebar
- `../../utils/adminUtils.js` - Utility functions for admin functionality
- `../../scripts/setupAdmin.js` - Script to set up the first admin user
