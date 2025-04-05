/**
 * This script is for setting up the first admin user in the system.
 * Run this script manually in the browser console when logged in as the user you want to make an admin.
 *
 * Instructions:
 * 1. Log in to the application with the user you want to make an admin
 * 2. Open the browser console (F12 or right-click > Inspect > Console)
 * 3. Copy and paste this entire script into the console
 * 4. Press Enter to run the script
 * 5. You should see a success message if the operation was successful
 */

// Function to make the current user an admin
// This version uses the Firebase SDK that's already loaded in the browser
async function makeCurrentUserAdmin() {
  try {
    // Get the current user ID from localStorage
    const userId = localStorage.getItem("userUid");

    if (!userId) {
      console.error("No user is currently logged in. Please log in first.");
      return;
    }

    // Access the Firebase database that's already initialized in the app
    const database = firebase.database();

    // Get a reference to the user's data
    const userRef = database.ref(`users/${userId}`);

    // Check if the user exists
    const snapshot = await userRef.get();

    if (!snapshot.exists()) {
      console.error("User not found in the database.");
      return;
    }

    // Update the user's isAdmin field to true
    await userRef.update({ isAdmin: true });

    console.log("Success! The current user is now an admin.");
    console.log("You can now log out and log back in to access admin features.");

  } catch (error) {
    console.error("Error making user an admin:", error);
  }
}

// Run the function
makeCurrentUserAdmin();
