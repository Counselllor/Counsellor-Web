import React, { useEffect, useState } from "react";
import JobsData from "./jobs.json";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaSlack,
  FaDiscord,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set, update, get } from "firebase/database";

import { FaTimes } from "react-icons/fa";
import BlogsSkeleton from "../blogs/BlogsSkeleton";
const Jobs = () => {
  let [isModal, setIsModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  let [isJobModal, setIsJobModal] = useState(false);
  const userId = localStorage.getItem("userUid");
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [user, setUser] = useState(null);
  let [jobsData1, setJobsData] = useState([]);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    jobSalary: "",
    jobType: "full-time",
    experienceLevel: "entry",
    applicationDeadline: "",
  });
  const [applicationFormData, setApplicationFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
    useruid: localStorage.getItem("userUid") || "",
  });

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const userUid = localStorage.getItem("userUid");
      if (!userUid) return;

      const db = getDatabase();
      const userRef = ref(db, `users/${userUid}`);
      const userSnap = await get(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.val();
        const appliedJobs = userData.appliedJobs
          ? userData.appliedJobs.split(",")
          : [];
        setAppliedJobs(appliedJobs);
      }
    };

    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getDatabase();

        if (userId) {
          const userRef = ref(db, `users/${userId}`);
          const userSnap = await get(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.val();
            setUser(userData);

            if (userData.jobsCreated) {
              const idArray = userData.jobsCreated
                .split(",")
                .map((id) => id.trim());
              const idObject = idArray.reduce(
                (acc, id) => ({ ...acc, [id]: true }),
                {}
              );
              setJobs(idObject);
            }
          } else {
            console.log("No user data available");
          }
        }

        const jobRef = ref(db, "jobs");
        const snapshot = await get(jobRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const jobsArray = Object.values(data)
            .filter((job) => job.createdAt && job.companyName !== "Soft")
            .map((job) => ({
              id: job.id,
              jobTitle: job.jobTitle,
              jobDescription: job.jobDescription,
              companyName: job.companyName,
              location: job.location,
              jobSalary: job.jobSalary,
              jobType: job.jobType,
              experienceLevel: job.experienceLevel,
              applicationDeadline: job.applicationDeadline,
              createdAt: new Date(job.createdAt),
            }));

          jobsArray.sort((a, b) => b.createdAt - a.createdAt);
          setJobsData(jobsArray);
        } else {
          console.log("No jobs data available");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  const generateUUID = () => {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  };

  const handleSubmitJob = async (event) => {
    event.preventDefault();
    if (!user) {
      return;
    }
    const jobId = generateUUID();
    const newJob = {
      id: jobId,
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      companyName: formData.companyName,
      location: formData.location,
      jobSalary: formData.jobSalary,
      jobType: formData.jobType,
      experienceLevel: formData.experienceLevel,
      applicationDeadline: formData.applicationDeadline,
      createdAt: new Date().toISOString(),
    };

    try {
      const db = getDatabase();
      await set(ref(db, `jobs/${jobId}`), newJob);
      await update(ref(db, `users/${userId}`), {
        jobsCreated: (user.jobsCreated ? user.jobsCreated + "," : "") + jobId,
      });

      setJobsData((prev) => [newJob, ...prev]);
      setIsJobModal(false);
      toast.success("Job Listed Successfully 🚀", {
        className: "toast-message",
      });

      setFormData({
        jobTitle: "",
        jobDescription: "",
        companyName: "",
        location: "",
        jobSalary: "",
        jobType: "full-time",
        experienceLevel: "entry",
        applicationDeadline: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplicationChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "resume" && files[0]) {
      if (files[0].type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      setApplicationFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setApplicationFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleJobClose = () => {
    setIsJobModal(false);
  };

  const [loading, setLoading] = useState(true);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handlePostJob = () => {
    setIsJobModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    try {
      const userUid = applicationFormData.useruid;
      const jobId = selectedJob.id;
      const db = getDatabase();
      const storage = getStorage();

      // Upload resume to Firebase Storage
      const resumeRef = storageRef(
        storage,
        `resumes/${userUid}/${applicationFormData.resume.name}`
      );
      await uploadBytes(resumeRef, applicationFormData.resume);
      const resumeUrl = await getDownloadURL(resumeRef);

      // Store application details
      const applicationRef = ref(db, `applications/${jobId}/${userUid}`);
      await set(applicationRef, {
        fullName: applicationFormData.fullName,
        email: applicationFormData.email,
        phone: applicationFormData.phone,
        coverLetter: applicationFormData.coverLetter,
        resumeUrl: resumeUrl,
        appliedDate: new Date().toISOString(),
      });

      // Update user's applied jobs
      const userRef = ref(db, `users/${userUid}`);
      const userSnap = await get(userRef);
      let userData = userSnap.val();

      let appliedJobs = userData.appliedJobs
        ? userData.appliedJobs.split(",")
        : [];
      appliedJobs.push(jobId);

      await update(userRef, {
        appliedJobs: appliedJobs.join(","),
      });

      setApplicationFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
        useruid: localStorage.getItem("userUid") || "",
      });
      const jobRef = ref(db, `jobs/${jobId}`);
      const jobSnap = await get(jobRef);
      let jobData = jobSnap.val();

      let applicantIds = jobData.applicantId
        ? jobData.applicantId.split(",")
        : [];
      applicantIds.push(userUid);

      await update(jobRef, {
        applicantId: applicantIds.join(","),
      });
      setIsModal(false);
      toast.success("Applied Successfully 🎉", {
        className: "toast-message",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application 😞", {
        className: "toast-message",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {" "}
      <div className="jobsPage">
        <Navbar />
        <ToastContainer />

        <header className="jobsPage-header">
          <h1 className="jobsPage-main-title">Available Jobs</h1>
          <p className="jobsPage-subtitle">
            Explore exciting career opportunities
          </p>
        </header>
        <div style={{ width: "100vw", textAlign: "center" }}>
          <button
            onClick={handlePostJob}
            style={{
              cursor: "pointer",
              margin: "auto",
              padding: "8px 17px",
              backgroundColor: "#12229d",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Post Job
          </button>
        </div>
        <section className="jobsPage-content" style={{ zIndex: 10 }}>
          {loading ? (
            <BlogsSkeleton count={JobsData.length} />
          ) : (
            <div className="jobsPage-list">
              {jobsData1.map((job) => (
                <div key={job.id} className="jobsPage-card">
                  <h2 className="jobsPage-title">
                    {job.jobTitle ? job.jobTitle : job.title}
                  </h2>
                  <h3 className="jobsPage-company">
                    {job.companyName ? job.companyName : job.company}
                  </h3>
                  <p className="jobsPage-description">
                    {job.jobDescription ? job.jobDescription : job.description}
                  </p>
                  <p className="jobsPage-location">Location: {job.location}</p>

                  <button
                    className="jobsPage-apply"
                    onClick={() => handleOpenModal(job)}
                    disabled={appliedJobs.includes(job.id)}
                  >
                    {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
      {isModal && (
        <>
          <div className="modal-jobs">
            <FaTimes
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                cursor: "pointer",
              }}
              size={"2rem"}
            />
            <div className="jobs-container">
              <h1>Application Form</h1>
              <form className="modal-form" onSubmit={handleSubmitApplication}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="fullName"
                    value={applicationFormData.fullName}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationFormData.email}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={applicationFormData.phone}
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="resume">Upload Resume</label>
                  <input
                    id="resume"
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    onChange={handleApplicationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={applicationFormData.coverLetter}
                    onChange={handleApplicationChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button1">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
          <div className="blackb"></div>
        </>
      )}
      {isJobModal && (
        <>
          <div
            className="modal-jobs"
            style={{ overflowY: "scroll", overflowX: "hidden" }}
          >
            <FaTimes
              onClick={handleJobClose}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                cursor: "pointer",
              }}
              size={"2rem"}
            />
            <div className="jobs-container">
              <h1 style={{ overflow: "scroll" }}>Add Job</h1>
              <form className="modal-form" onSubmit={handleSubmitJob}>
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobDescription">Job Description</label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows="5"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobSalary">Job Salary</label>
                  <input
                    type="text"
                    id="jobSalary"
                    name="jobSalary"
                    value={formData.jobSalary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobType">Job Type</label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="experienceLevel">Experience Level</label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="entry">Entry</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="applicationDeadline">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit Job
                </button>
              </form>
            </div>
          </div>
          <div className="blackb"></div>
        </>
      )}{" "}
    </>
  );
};

export default Jobs;
