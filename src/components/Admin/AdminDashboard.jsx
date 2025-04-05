import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/auth";
import { ref, get, update, remove } from "firebase/database";
import "../../styles/AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUsers, FaBlog, FaUniversity } from "react-icons/fa";
import collegesData from "../Dashboard/colleges.json";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in as admin
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
      return;
    }

    // Load all data on initial render
    const loadAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUsers(),
          fetchBlogs(),
          fetchColleges()
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load some data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [navigate]);

  // Fetch additional data when tab changes
  useEffect(() => {
    // Only fetch data for the active tab if it's not the initial load
    if (!loading) {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "users") {
        await fetchUsers();
      } else if (activeTab === "blogs") {
        await fetchBlogs();
      } else if (activeTab === "colleges") {
        await fetchColleges();
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      toast.error(`Failed to load ${activeTab}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const usersArray = Object.keys(usersData).map((key) => ({
        id: key,
        ...usersData[key],
      }));
      setUsers(usersArray);
    } else {
      setUsers([]);
    }
  };

  const fetchBlogs = async () => {
    try {
      // Try to fetch from 'articles' first
      const articlesRef = ref(database, "articles");
      const articlesSnapshot = await get(articlesRef);

      if (articlesSnapshot.exists()) {
        const articlesData = articlesSnapshot.val();
        const articlesArray = Object.keys(articlesData).map((key) => ({
          id: key,
          ...articlesData[key],
        }));
        setBlogs(articlesArray);
        console.log("Fetched blogs from 'articles':", articlesArray);
        return;
      }

      // If no articles found, try 'blogs'
      const blogsRef = ref(database, "blogs");
      const blogsSnapshot = await get(blogsRef);

      if (blogsSnapshot.exists()) {
        const blogsData = blogsSnapshot.val();
        const blogsArray = Object.keys(blogsData).map((key) => ({
          id: key,
          ...blogsData[key],
        }));
        setBlogs(blogsArray);
        console.log("Fetched blogs from 'blogs':", blogsArray);
        return;
      }

      // If no blogs found in either location
      console.log("No blogs found in database");
      setBlogs([]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs. Please try again.");
      setBlogs([]);
    }
  };

  const fetchColleges = async () => {
    try {
      // First try to get colleges from Firebase
      const collegesRef = ref(database, "colleges");
      const snapshot = await get(collegesRef);

      if (snapshot.exists()) {
        const collegesData = snapshot.val();
        const collegesArray = Object.keys(collegesData).map((key) => ({
          id: key,
          ...collegesData[key],
        }));
        setColleges(collegesArray);
      } else {
        // If no colleges in Firebase, use the JSON data
        setColleges(collegesData);
      }
    } catch (error) {
      console.error("Error fetching colleges:", error);
      // Fallback to JSON data if Firebase fetch fails
      setColleges(collegesData);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      await update(userRef, { isAdmin: true });
      toast.success("User has been granted admin privileges");
      fetchUsers();
    } catch (error) {
      console.error("Error making user admin:", error);
      toast.error("Failed to update user privileges");
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      await update(userRef, { isAdmin: false });
      toast.success("Admin privileges have been revoked");
      fetchUsers();
    } catch (error) {
      console.error("Error removing admin privileges:", error);
      toast.error("Failed to update user privileges");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userRef = ref(database, `users/${userId}`);
        await remove(userRef);
        toast.success("User has been deleted");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        // Try to delete from 'articles' first
        const articlesRef = ref(database, `articles/${blogId}`);
        const articlesSnapshot = await get(articlesRef);

        if (articlesSnapshot.exists()) {
          await remove(articlesRef);
          toast.success("Blog has been deleted");
          fetchBlogs();
          return;
        }

        // If not found in 'articles', try 'blogs'
        const blogsRef = ref(database, `blogs/${blogId}`);
        const blogsSnapshot = await get(blogsRef);

        if (blogsSnapshot.exists()) {
          await remove(blogsRef);
          toast.success("Blog has been deleted");
          fetchBlogs();
          return;
        }

        // If blog not found in either location
        toast.error("Blog not found in database");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog: " + error.message);
      }
    }
  };

  const handleEditBlog = (blogId) => {
    // Get the blog data to pass to the edit page
    const blog = blogs.find(blog => blog.id === blogId);
    if (blog) {
      navigate(`/blogs/edit/${blogId}`, {
        state: {
          title: blog.title,
          content: blog.content,
          tags: Array.isArray(blog.tags) ? blog.tags.join(',') : blog.tags || '',
          id: blogId
        }
      });
    } else {
      toast.error("Blog data not found");
    }
  };

  const handleViewBlog = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleViewCollege = (collegeId) => {
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      navigate(`/college/${collegeId}`);
    } else {
      toast.error("College not found");
    }
  };

  const handleEditCollege = (collegeId) => {
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      toast.info("College editing functionality is coming soon");
      // In the future, you could navigate to a college edit page
      // navigate(`/admin/colleges/edit/${collegeId}`, { state: { college } });
    } else {
      toast.error("College not found");
    }
  };

  const handleDeleteCollege = (collegeId) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        // If using Firebase for colleges
        const collegeRef = ref(database, `colleges/${collegeId}`);
        get(collegeRef).then(snapshot => {
          if (snapshot.exists()) {
            // College exists in Firebase, delete it
            remove(collegeRef).then(() => {
              toast.success("College has been deleted");
              fetchColleges();
            }).catch(error => {
              console.error("Error deleting college:", error);
              toast.error("Failed to delete college");
            });
          } else {
            // College doesn't exist in Firebase (might be from JSON)
            toast.info("This college is from the default data and cannot be deleted");
          }
        }).catch(error => {
          console.error("Error checking college:", error);
          toast.error("Failed to check college data");
        });
      } catch (error) {
        console.error("Error in delete college process:", error);
        toast.error("An error occurred while trying to delete the college");
      }
    }
  };

  const handleAddCollege = () => {
    toast.info("College creation functionality is coming soon");
    // In the future, you could navigate to a college creation page
    // navigate('/admin/colleges/new');
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.tags && blog.tags.some(tag =>
        typeof tag === 'string' && tag.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  });

  const filteredColleges = colleges.filter((college) => {
    return (
      college.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin-dashboard">
      <ToastContainer />
      <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-search">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="admin-data-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="dashboard-overview">
                  <h2>Dashboard Overview</h2>
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-icon users-icon">
                        <FaUsers />
                      </div>
                      <div className="stat-info">
                        <h3>Total Users</h3>
                        <p className="stat-number">{users.length}</p>
                        <p className="stat-detail">{users.filter(user => user.isAdmin).length} Admins</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon blogs-icon">
                        <FaBlog />
                      </div>
                      <div className="stat-info">
                        <h3>Total Blogs</h3>
                        <p className="stat-number">{blogs.length}</p>
                        <p className="stat-detail">Published Articles</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon colleges-icon">
                        <FaUniversity />
                      </div>
                      <div className="stat-info">
                        <h3>Total Colleges</h3>
                        <p className="stat-number">{colleges.length || 'N/A'}</p>
                        <p className="stat-detail">In Database</p>
                      </div>
                    </div>
                  </div>
                  <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      {blogs.slice(0, 5).map(blog => (
                        <div key={blog.id} className="activity-item">
                          <div className="activity-icon blog-activity">
                            <FaBlog />
                          </div>
                          <div className="activity-details">
                            <p className="activity-title">New Blog: {blog.title}</p>
                            <p className="activity-meta">By {blog.author} on {new Date(blog.createdAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "users" && (
                <div className="users-table">
                  <h2>Users Management</h2>
                  {filteredUsers.length === 0 ? (
                    <p>No users found</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>User Type</th>
                          <th>Admin Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              {user.firstname} {user.surname}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.user_type || "Regular User"}</td>
                            <td>
                              {user.isAdmin ? (
                                <span className="admin-badge">Admin</span>
                              ) : (
                                <span className="user-badge">User</span>
                              )}
                            </td>
                            <td className="action-buttons">
                              {!user.isAdmin ? (
                                <button
                                  className="make-admin-btn"
                                  onClick={() => handleMakeAdmin(user.id)}
                                >
                                  Make Admin
                                </button>
                              ) : (
                                <button
                                  className="remove-admin-btn"
                                  onClick={() => handleRemoveAdmin(user.id)}
                                >
                                  Remove Admin
                                </button>
                              )}
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === "blogs" && (
                <div className="blogs-table">
                  <div className="table-header">
                    <h2>Blogs Management</h2>
                    <button
                      className="add-new-btn"
                      onClick={() => navigate('/blogwrite')}
                    >
                      Add New Blog
                    </button>
                  </div>
                  {filteredBlogs.length === 0 ? (
                    <div>
                      <p>No blogs found</p>
                      <p className="debug-info">Check the console for debugging information.</p>
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Date</th>
                          <th>Tags</th>
                          <th>Likes</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBlogs.map((blog) => (
                          <tr key={blog.id}>
                            <td>{blog.title}</td>
                            <td>{blog.author}</td>
                            <td>
                              {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                            </td>
                            <td>
                              {Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || 'None')}
                            </td>
                            <td>
                              {blog.likeCount || 0}
                            </td>
                            <td className="action-buttons">
                              <div className="button-container">
                                <button
                                  className="view-btn"
                                  onClick={() => handleViewBlog(blog.id)}
                                >
                                  View
                                </button>
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEditBlog(blog.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDeleteBlog(blog.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === "colleges" && (
                <div className="colleges-table">
                  <div className="table-header">
                    <h2>Colleges Management</h2>
                    <button
                      className="add-new-btn"
                      onClick={() => handleAddCollege()}
                    >
                      Add New College
                    </button>
                  </div>
                  {filteredColleges.length === 0 ? (
                    <p>No colleges found</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Location</th>
                          <th>CTC</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredColleges.map((college) => (
                          <tr key={college.id}>
                            <td>{college.name}</td>
                            <td>{college.location}</td>
                            <td>{college.ctc}</td>
                            <td className="action-buttons">
                              <div className="button-container">
                                <button
                                  className="view-btn"
                                  onClick={() => handleViewCollege(college.id)}
                                >
                                  View
                                </button>
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEditCollege(college.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDeleteCollege(college.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
