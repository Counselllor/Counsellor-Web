import { database } from "../firebase/auth";
import { ref, get } from "firebase/database";

/**
 * Check if a user has admin privileges
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} - True if user is an admin, false otherwise
 */
export const isUserAdmin = async (userId) => {
  if (!userId) return false;
  
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData.isAdmin === true;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

/**
 * Create a route guard for admin routes
 * @param {Function} navigate - React Router's navigate function
 * @returns {Promise<boolean>} - True if user is authenticated as admin, false otherwise
 */
export const adminRouteGuard = async (navigate) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userId = localStorage.getItem("userUid");
  
  if (!isAdmin || !userId) {
    navigate("/admin/login");
    return false;
  }
  
  // Double-check with the database
  const adminStatus = await isUserAdmin(userId);
  
  if (!adminStatus) {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
    return false;
  }
  
  return true;
};

/**
 * Make a user an admin
 * @param {string} userId - The user ID to make admin
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const makeUserAdmin = async (userId) => {
  // Implementation will be in the AdminDashboard component
};

/**
 * Remove admin privileges from a user
 * @param {string} userId - The user ID to remove admin privileges from
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const removeAdminPrivileges = async (userId) => {
  // Implementation will be in the AdminDashboard component
};
