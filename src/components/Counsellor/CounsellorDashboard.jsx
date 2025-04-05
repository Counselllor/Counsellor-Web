import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../../firebase/auth";
import { ref, get, set, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CounsellorDashboard.css";
import CounsellorSidebar from "./CounsellorSidebar";
import { FaCalendarAlt, FaChartLine, FaUserGraduate, FaCheckCircle, FaPlus, FaArrowRight, FaSearch, FaPhone, FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiMessageLine } from "react-icons/ri";

const CounsellorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const [students, setStudents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: "",
    startTime: "09:00",
    endTime: "17:00",
    recurring: true
  });

  // Profile state
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstname: "",
    surname: "",
    email: "",
    bio: "",
    specialization: "",
    experience: ""
  });
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is a counsellor
    const userUid = localStorage.getItem("userUid");
    if (!userUid) {
      navigate("/");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, `users/${userUid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          // Check if user is a counsellor
          console.log("User data in counsellor dashboard:", userData);

          // Handle case where user_type might be missing or invalid
          if (!userData.user_type) {
            console.error("User type is missing");
            toast.error("User type information is missing");
            navigate("/dashboard");
            return;
          }

          console.log("User type in counsellor dashboard:", userData.user_type);

          if (userData.user_type !== "counsellor") {
            console.error("User is not a counsellor, type:", userData.user_type);
            toast.error("You don't have access to this page");
            navigate("/dashboard");
            return;
          }

          setUserData(userData);

          // Initialize profile data with user data
          setProfileData({
            firstname: userData.firstname || "",
            surname: userData.surname || "",
            email: userData.email || "",
            bio: userData.bio || "",
            specialization: userData.specialization || "",
            experience: userData.experience || ""
          });

          fetchData();
        } else {
          toast.error("User data not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "students" || activeTab === "dashboard") {
        await fetchStudents();
      }
      if (activeTab === "appointments" || activeTab === "dashboard") {
        await fetchAppointments();
      }
    } catch (error) {
      console.error(`Error fetching data:`, error);
      toast.error(`Failed to load data. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const studentsArray = Object.keys(usersData)
          .map(key => ({
            id: key,
            ...usersData[key]
          }))
          .filter(user => user.user_type === "student");

        setStudents(studentsArray);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
      setStudents([]);
    }
  };

  const fetchAppointments = async () => {
    // In a real application, you would fetch appointments from the database
    // For now, we'll use dummy data
    const dummyAppointments = [
      {
        id: 1,
        studentName: "John Doe",
        date: "2023-06-15",
        time: "10:00 AM",
        status: "completed"
      },
      {
        id: 2,
        studentName: "Jane Smith",
        date: "2023-06-20",
        time: "2:30 PM",
        status: "upcoming"
      },
      {
        id: 3,
        studentName: "Alex Johnson",
        date: "2023-06-25",
        time: "11:15 AM",
        status: "upcoming"
      }
    ];

    setAppointments(dummyAppointments);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userUid");
      localStorage.removeItem("login");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // We still need filtered students for the dashboard overview
  const recentStudents = students.slice(0, 5);

  // Calendar helper functions
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay();

    // Calculate days from previous month to show
    const prevMonthDays = [];
    if (firstDayIndex > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthLastDay = prevMonth.getDate();

      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const day = new Date(year, month - 1, prevMonthLastDay - i);
        prevMonthDays.push({
          date: day,
          inMonth: false,
          hasAvailability: checkAvailabilityForDate(day)
        });
      }
    }

    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      currentMonthDays.push({
        date: day,
        inMonth: true,
        hasAvailability: checkAvailabilityForDate(day)
      });
    }

    // Calculate days from next month to show (to fill a 6-row calendar)
    const nextMonthDays = [];
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
    const remainingDays = 42 - totalDaysShown; // 6 rows x 7 days = 42

    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      nextMonthDays.push({
        date: day,
        inMonth: false,
        hasAvailability: checkAvailabilityForDate(day)
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const checkAvailabilityForDate = (date) => {
    // Check if there's any availability for this date
    return getAvailabilityForDate(date).length > 0;
  };

  const getAvailabilityForDate = (date) => {
    if (!date) return [];

    // Get day of week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek];

    // Format date as YYYY-MM-DD
    const dateString = date.toISOString().split('T')[0];

    // Filter slots for this specific date or recurring weekly slots for this day
    return availabilitySlots.filter(slot => {
      // Check for specific date slots
      if (slot.day === dateString) return true;

      // Check for recurring weekly slots
      if (slot.recurring && slot.day === dayName) return true;

      return false;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEditSlot = (slot) => {
    setNewSlot(slot);
    setShowAddSlotModal(true);
  };

  const handleDeleteSlot = (slotId) => {
    // Filter out the slot with the given ID
    const updatedSlots = availabilitySlots.filter(slot => slot.id !== slotId);
    setAvailabilitySlots(updatedSlots);

    // Save to database
    if (userData) {
      const userRef = ref(database, `users/${userData.id}/availability`);
      set(userRef, updatedSlots)
        .then(() => {
          toast.success("Availability slot deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting availability slot:", error);
          toast.error("Failed to delete availability slot");
        });
    }
  };

  const handleSaveSlot = () => {
    // Validate inputs
    if ((!selectedDate && !newSlot.day) || !newSlot.startTime || !newSlot.endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    // Create a new slot with a unique ID
    const slotId = Date.now().toString();
    const slot = {
      ...newSlot,
      id: slotId
    };

    // If we're editing an existing slot, remove the old one
    let updatedSlots = [...availabilitySlots];
    if (slot.id) {
      updatedSlots = updatedSlots.filter(s => s.id !== slot.id);
    }

    // Add the new/updated slot
    updatedSlots.push(slot);
    setAvailabilitySlots(updatedSlots);

    // Save to database
    if (userData) {
      const userRef = ref(database, `users/${userData.id}/availability`);
      set(userRef, updatedSlots)
        .then(() => {
          toast.success("Availability saved successfully");
          setShowAddSlotModal(false);
        })
        .catch((error) => {
          console.error("Error saving availability:", error);
          toast.error("Failed to save availability");
        });
    }
  };

  // Load availability slots from database
  useEffect(() => {
    if (userData) {
      const availabilityRef = ref(database, `users/${userData.id}/availability`);
      get(availabilityRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAvailabilitySlots(snapshot.val());
          }
        })
        .catch((error) => {
          console.error("Error loading availability:", error);
        });
    }
  }, [userData]);

  // Profile management functions
  const handleSaveProfile = () => {
    if (!userData) return;

    // Validate inputs
    if (!profileData.firstname || !profileData.surname) {
      toast.error("First name and last name are required");
      return;
    }

    // Update user data in Firebase
    const userRef = ref(database, `users/${userData.id}`);
    const updatedUserData = {
      ...userData,
      firstname: profileData.firstname,
      surname: profileData.surname,
      bio: profileData.bio,
      specialization: profileData.specialization,
      experience: profileData.experience
    };

    set(userRef, updatedUserData)
      .then(() => {
        setUserData(updatedUserData);
        setEditMode(false);
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      });
  };

  const handleDeleteAccount = () => {
    if (!userData || deleteConfirmText !== "DELETE") return;

    // Remove user data from Firebase
    const userRef = ref(database, `users/${userData.id}`);
    remove(userRef)
      .then(() => {
        // Remove email reference
        if (userData.email) {
          const encodedEmail = userData.email.replace(/[^a-zA-Z0-9]/g, '_');
          const emailRef = ref(database, `email/${encodedEmail}`);
          remove(emailRef);
        }

        // Sign out the user
        signOut(auth)
          .then(() => {
            localStorage.removeItem("userUid");
            localStorage.removeItem("login");
            toast.success("Account deleted successfully");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account");
      });
  };

  const filteredAppointments = appointments.filter(appointment => {
    return (
      appointment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="counsellor-dashboard">
      <ToastContainer />
      <CounsellorSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSignOut={handleSignOut}
        userData={userData}
      />

      <div className="counsellor-content">
        <div className="counsellor-welcome-header">
          <div className="welcome-text">
            <h1>Hi, {userData ? `${userData.firstname}` : 'Counsellor'}</h1>
            <div className="counsellor-badge">Expert Counsellor</div>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="user-profile">
              <div className="user-avatar">
                {userData?.firstname?.charAt(0) || 'C'}
              </div>
              <BsThreeDotsVertical className="menu-dots" />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <>
                  <div className="progress-card">
                    <div className="card-header">
                      <h2>Make your profile complete!</h2>
                      <p>Unlock the potential of your counselling profile</p>
                    </div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '60%' }}></div>
                    </div>
                    <div className="task-list">
                      <div className="task-item completed">
                        <div className="task-status">
                          <FaCheckCircle />
                        </div>
                        <div className="task-content">
                          <h3>Profile setup</h3>
                          <p>Your basic profile is complete</p>
                        </div>
                        <div className="task-action">
                          <button className="action-button">View</button>
                        </div>
                      </div>

                      <div className="task-item">
                        <div className="task-status pending">
                          <div className="status-circle"></div>
                        </div>
                        <div className="task-content">
                          <h3>Add availability</h3>
                          <p>Set your counselling hours</p>
                        </div>
                        <div className="task-action">
                          <button className="action-button">Complete</button>
                        </div>
                      </div>

                      <div className="task-item">
                        <div className="task-status pending">
                          <div className="status-circle"></div>
                        </div>
                        <div className="task-content">
                          <h3>Create a service</h3>
                          <p>Add counselling services you offer</p>
                        </div>
                        <div className="task-action">
                          <button className="action-button">Add</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stats-container">
                    <div className="stat-card">
                      <div className="stat-icon students-icon">
                        <FaUserGraduate />
                      </div>
                      <div className="stat-info">
                        <h3>Total Students</h3>
                        <p className="stat-number">{students.length}</p>
                        <p className="stat-detail">Registered Students</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon appointments-icon">
                        <FaCalendarAlt />
                      </div>
                      <div className="stat-info">
                        <h3>Appointments</h3>
                        <p className="stat-number">{appointments.length}</p>
                        <p className="stat-detail">Scheduled Sessions</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon analytics-icon">
                        <FaChartLine />
                      </div>
                      <div className="stat-info">
                        <h3>Analytics</h3>
                        <p className="stat-number">85%</p>
                        <p className="stat-detail">Success Rate</p>
                      </div>
                    </div>
                  </div>

                  <div className="upcoming-appointments-card">
                    <div className="card-header-with-action">
                      <h2>Upcoming Appointments</h2>
                      <button className="view-all-button">View All <FaArrowRight /></button>
                    </div>
                    {appointments.filter(app => app.status === "upcoming").length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">
                          <FaCalendarAlt />
                        </div>
                        <p>No upcoming appointments</p>
                        <button className="add-button"><FaPlus /> Schedule Session</button>
                      </div>
                    ) : (
                      <div className="appointment-list">
                        {appointments
                          .filter(app => app.status === "upcoming")
                          .map(appointment => (
                            <div key={appointment.id} className="appointment-item">
                              <div className="appointment-avatar">
                                {appointment.studentName.charAt(0)}
                              </div>
                              <div className="appointment-details">
                                <h3>{appointment.studentName}</h3>
                                <p>{appointment.date} • {appointment.time}</p>
                              </div>
                              <div className="appointment-status">
                                <span className="status-badge upcoming">
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="recent-students-card">
                    <div className="card-header-with-action">
                      <h2>Recent Students</h2>
                      <button className="view-all-button">View All <FaArrowRight /></button>
                    </div>
                    {students.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">
                          <FaUserGraduate />
                        </div>
                        <p>No students yet</p>
                      </div>
                    ) : (
                      <div className="student-list">
                        {recentStudents.map(student => (
                          <div key={student.id} className="student-item">
                            <div className="student-avatar">
                              {student.firstname?.charAt(0) || 'S'}
                            </div>
                            <div className="student-details">
                              <h3>{student.firstname} {student.surname}</h3>
                              <p>{student.email}</p>
                            </div>
                            <button className="contact-button">Contact</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}



              {activeTab === "appointments" && (
                <div className="appointments-table">
                  <h2>Appointments Management</h2>
                  <div className="table-header">
                    <div></div>
                    <button
                      className="add-new-btn"
                      onClick={() => toast.info("Appointment creation functionality coming soon!")}
                    >
                      New Appointment
                    </button>
                  </div>
                  {filteredAppointments.length === 0 ? (
                    <p>No appointments found</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.map(appointment => (
                          <tr key={appointment.id}>
                            <td>{appointment.studentName}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                              <span className={`status-badge ${appointment.status}`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => toast.info("Edit functionality coming soon!")}
                              >
                                Edit
                              </button>
                              <button
                                className="cancel-btn"
                                onClick={() => toast.info("Cancel functionality coming soon!")}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="resources-section">
                  <h2>Counselling Resources</h2>
                  <div className="resources-grid">
                    <div className="resource-card">
                      <h3>Career Assessment Tools</h3>
                      <p>Access standardized tests and assessment tools to help students identify their strengths and career paths.</p>
                      <button
                        className="resource-btn"
                        onClick={() => toast.info("Resource access coming soon!")}
                      >
                        Access Tools
                      </button>
                    </div>
                    <div className="resource-card">
                      <h3>University Application Guides</h3>
                      <p>Comprehensive guides for helping students with university applications and admissions processes.</p>
                      <button
                        className="resource-btn"
                        onClick={() => toast.info("Resource access coming soon!")}
                      >
                        View Guides
                      </button>
                    </div>
                    <div className="resource-card">
                      <h3>Scholarship Information</h3>
                      <p>Database of scholarships, grants, and financial aid opportunities for students.</p>
                      <button
                        className="resource-btn"
                        onClick={() => toast.info("Resource access coming soon!")}
                      >
                        Browse Database
                      </button>
                    </div>
                    <div className="resource-card">
                      <h3>Counselling Templates</h3>
                      <p>Templates for session notes, student progress tracking, and action plans.</p>
                      <button
                        className="resource-btn"
                        onClick={() => toast.info("Resource access coming soon!")}
                      >
                        Download Templates
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="bookings-section">
                  <h2>Booking Calls</h2>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FaPhone />
                    </div>
                    <p>No booking calls scheduled yet</p>
                    <button className="add-button">
                      <FaPlus /> Set Up Booking System
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "calendar" && (
                <div className="calendar-section">
                  <h2>Calendar</h2>
                  <div className="calendar-header">
                    <div className="calendar-controls">
                      <button
                        className="calendar-nav-btn"
                        onClick={() => {
                          const prevMonth = new Date(currentDate);
                          prevMonth.setMonth(prevMonth.getMonth() - 1);
                          setCurrentDate(prevMonth);
                        }}
                      >
                        Previous
                      </button>
                      <h3>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                      <button
                        className="calendar-nav-btn"
                        onClick={() => {
                          const nextMonth = new Date(currentDate);
                          nextMonth.setMonth(nextMonth.getMonth() + 1);
                          setCurrentDate(nextMonth);
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <button
                      className="add-button"
                      onClick={() => setShowAddSlotModal(true)}
                    >
                      <FaPlus /> Add Availability
                    </button>
                  </div>

                  <div className="calendar-grid">
                    <div className="calendar-days">
                      <div className="calendar-day-header">Sun</div>
                      <div className="calendar-day-header">Mon</div>
                      <div className="calendar-day-header">Tue</div>
                      <div className="calendar-day-header">Wed</div>
                      <div className="calendar-day-header">Thu</div>
                      <div className="calendar-day-header">Fri</div>
                      <div className="calendar-day-header">Sat</div>
                    </div>

                    <div className="calendar-dates">
                      {generateCalendarDays(currentDate).map((day, index) => (
                        <div
                          key={index}
                          className={`calendar-date ${!day.inMonth ? 'other-month' : ''} ${day.hasAvailability ? 'has-availability' : ''} ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                          onClick={() => handleDateClick(day.date)}
                        >
                          <span className="date-number">{day.date.getDate()}</span>
                          {day.hasAvailability && <div className="availability-indicator"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="selected-date-details">
                      <h3>Availability for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h3>

                      {getAvailabilityForDate(selectedDate).length > 0 ? (
                        <div className="availability-slots">
                          {getAvailabilityForDate(selectedDate).map((slot, index) => (
                            <div key={index} className="availability-slot">
                              <div className="slot-time">
                                <span>{slot.startTime}</span> - <span>{slot.endTime}</span>
                              </div>
                              <div className="slot-actions">
                                <button
                                  className="edit-slot-btn"
                                  onClick={() => handleEditSlot(slot)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="delete-slot-btn"
                                  onClick={() => handleDeleteSlot(slot.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            className="add-slot-btn"
                            onClick={() => {
                              setNewSlot({
                                day: selectedDate.toISOString().split('T')[0],
                                startTime: "09:00",
                                endTime: "17:00",
                                recurring: false
                              });
                              setShowAddSlotModal(true);
                            }}
                          >
                            <FaPlus /> Add Another Time Slot
                          </button>
                        </div>
                      ) : (
                        <div className="no-availability">
                          <p>No availability set for this date</p>
                          <button
                            className="add-slot-btn"
                            onClick={() => {
                              setNewSlot({
                                day: selectedDate.toISOString().split('T')[0],
                                startTime: "09:00",
                                endTime: "17:00",
                                recurring: false
                              });
                              setShowAddSlotModal(true);
                            }}
                          >
                            <FaPlus /> Add Availability
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {showAddSlotModal && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3>Add Availability</h3>
                          <button
                            className="close-modal-btn"
                            onClick={() => setShowAddSlotModal(false)}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="form-group">
                            <label>Day</label>
                            {!selectedDate ? (
                              <select
                                value={newSlot.day}
                                onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
                              >
                                <option value="">Select a day</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                readOnly
                              />
                            )}
                          </div>
                          <div className="form-group">
                            <label>Start Time</label>
                            <input
                              type="time"
                              value={newSlot.startTime}
                              onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>End Time</label>
                            <input
                              type="time"
                              value={newSlot.endTime}
                              onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                            />
                          </div>
                          {!selectedDate && (
                            <div className="form-group checkbox-group">
                              <input
                                type="checkbox"
                                id="recurring"
                                checked={newSlot.recurring}
                                onChange={(e) => setNewSlot({...newSlot, recurring: e.target.checked})}
                              />
                              <label htmlFor="recurring">Recurring weekly</label>
                            </div>
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            className="cancel-btn"
                            onClick={() => setShowAddSlotModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="save-btn"
                            onClick={handleSaveSlot}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "priority-dm" && (
                <div className="priority-dm-section">
                  <h2>Priority Direct Messages</h2>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <RiMessageLine />
                    </div>
                    <p>No priority messages yet</p>
                    <button className="add-button">
                      <FaPlus /> Enable Priority Messaging
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "testimonials" && (
                <div className="testimonials-section">
                  <h2>Testimonials</h2>
                  <div className="testimonials-header">
                    <p>Collect and showcase testimonials from your students</p>
                    <button className="add-button">
                      <FaPlus /> Request Testimonial
                    </button>
                  </div>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FaStar />
                    </div>
                    <p>No testimonials yet</p>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="profile-section">
                  <h2>Profile Settings</h2>
                  <div className="profile-cards">
                    <div className="profile-card">
                      <div className="profile-header">
                        <h3>Personal Information</h3>
                        {!editMode && (
                          <button
                            className="edit-profile-btn"
                            onClick={() => setEditMode(true)}
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                      <div className="profile-form">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={editMode ? profileData.firstname : (userData?.firstname || "")}
                            onChange={(e) => setProfileData({...profileData, firstname: e.target.value})}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={editMode ? profileData.surname : (userData?.surname || "")}
                            onChange={(e) => setProfileData({...profileData, surname: e.target.value})}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={editMode ? profileData.email : (userData?.email || "")}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            readOnly={true}
                          />
                          {editMode && <p className="field-note">Email cannot be changed</p>}
                        </div>

                        {editMode && (
                          <>
                            <div className="form-group">
                              <label>Bio</label>
                              <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                placeholder="Tell students about yourself"
                                rows={4}
                              />
                            </div>
                            <div className="form-group">
                              <label>Specialization</label>
                              <input
                                type="text"
                                value={profileData.specialization}
                                onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                                placeholder="E.g., Career Guidance, Academic Counselling"
                              />
                            </div>
                            <div className="form-group">
                              <label>Years of Experience</label>
                              <input
                                type="text"
                                value={profileData.experience}
                                onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                                placeholder="E.g., 5+ years"
                              />
                            </div>
                            <div className="profile-actions">
                              <button
                                className="cancel-profile-btn"
                                onClick={() => {
                                  setEditMode(false);
                                  // Reset form data to original values
                                  if (userData) {
                                    setProfileData({
                                      firstname: userData.firstname || "",
                                      surname: userData.surname || "",
                                      email: userData.email || "",
                                      bio: userData.bio || "",
                                      specialization: userData.specialization || "",
                                      experience: userData.experience || ""
                                    });
                                  }
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="save-profile-btn"
                                onClick={handleSaveProfile}
                              >
                                Save Changes
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="danger-zone-card">
                      <h3>Danger Zone</h3>
                      <p>Permanently delete your account and all associated data</p>
                      <button
                        className="delete-account-btn"
                        onClick={() => setShowDeleteConfirmModal(true)}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>

                  {showDeleteConfirmModal && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3>Delete Account</h3>
                          <button
                            className="close-modal-btn"
                            onClick={() => setShowDeleteConfirmModal(false)}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="modal-body">
                          <p className="delete-warning">This action cannot be undone. All your data will be permanently deleted.</p>
                          <p>To confirm, please type <strong>DELETE</strong> below:</p>
                          <div className="form-group">
                            <input
                              type="text"
                              value={deleteConfirmText}
                              onChange={(e) => setDeleteConfirmText(e.target.value)}
                              placeholder="Type DELETE to confirm"
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="cancel-btn"
                            onClick={() => {
                              setShowDeleteConfirmModal(false);
                              setDeleteConfirmText("");
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="delete-btn"
                            disabled={deleteConfirmText !== "DELETE"}
                            onClick={handleDeleteAccount}
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
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

export default CounsellorDashboard;
