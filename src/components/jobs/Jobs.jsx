import React, { useEffect, useState } from "react";
import JobsData from "./jobs.json";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin, FaSlack, FaDiscord } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set, update, get } from 'firebase/database';

import {FaTimes} from 'react-icons/fa'
import BlogsSkeleton from "../blogs/BlogsSkeleton";
const Jobs = () => {
  let [isModal,setIsModal]=useState(false)
  const [jobs, setJobs] = useState([]); // State to store jobs data
  let [isJobModal,setIsJobModal]=useState(false)
  const userId = localStorage.getItem('userUid');
  const [user, setUser] = useState(null);
  let [jobsData1,setJobsData]=useState([])
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    companyName: '',
    location: '',
    jobSalary: '',
    jobType: 'full-time',
    experienceLevel: 'entry',
    applicationDeadline: '',
  });
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getDatabase();

        // Fetch user data
        if (userId) {
          const userRef = ref(db, `users/${userId}`);
          const userSnap = await get(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.val();
            setUser(userData);

            if (userData.jobsCreated) {
              const idArray = userData.jobsCreated.split(',').map(id => id.trim());
              const idObject = idArray.reduce((acc, id) => ({ ...acc, [id]: true }), {});
              setJobs(idObject);
            }
          } else {
            console.log("No user data available");
          }
        }

        // Fetch jobs
        const jobRef = ref(db, 'jobs');
        const snapshot = await get(jobRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const jobsArray = Object.values(data)
            .filter(job => job.createdAt && job.companyName !== 'Soft')
            .map(job => ({
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
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchJobs();
  }, [userId]);


  const generateUUID = () => {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  };
  const handleSubmitJob = async (event) => {
    event.preventDefault();
  if(!user){
    return
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
        jobsCreated: (user.jobsCreated ? user.jobsCreated + ',' : '') + jobId,
      });

      setJobsData(prev => [newJob, ...prev]);
      setIsJobModal(false);
      toast.success("Job Listed Successfully 🚀", {
        className: "toast-message",
      });

      setFormData({
        jobTitle: '',
        jobDescription: '',
        companyName: '',
        location: '',
        jobSalary: '',
        jobType: 'full-time',
        experienceLevel: 'entry',
        applicationDeadline: '',
      });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
function handleJobClose(){
  setIsJobModal(false)
}

  const [loading, setLoading] = useState(true); // Loading state

  function handleOpenModal(){
    setIsModal(true)
    console.log('click')
  }
  function handleCLoseModal(){
    setIsModal(false)
  }

  function handlePostJob(){
    setIsJobModal(true)
  }

useEffect(() => {
    // Simulate loading delay of 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  return (
  <>  <div className="jobsPage">
      <Navbar />
      <ToastContainer />

      <header className="jobsPage-header">
        <h1 className="jobsPage-main-title">Available Jobs</h1>
        <p className="jobsPage-subtitle">Explore exciting career opportunities</p>
      </header>
      <div className="post-job-container"><button onClick={handlePostJob} className="post-job-button">Post Job</button></div>
      <section className="jobsPage-content" style={{zIndex:10}}>
      { loading ? (
            <BlogsSkeleton count={JobsData.length} />) :    ( <div className="jobsPage-list">
              {  jobsData1.map((job) => (
            <div key={job.id} className="jobsPage-card">
              <h2 className="jobsPage-title">{job.jobTitle?job.jobTitle:job.title}</h2>
              <h3 className="jobsPage-company">{job.companyName?job.companyName:job.company}</h3>
              <p className="jobsPage-description">{job.jobDescription?job.jobDescription:job.description}</p>
              <p className="jobsPage-location">Location: {job.location}</p>
              <button className="jobsPage-apply" onClick={handleOpenModal}>Apply Now</button>
            </div>
          ))}
        </div>)}
      </section>


    </div>
    <Footer/>
   {
isModal&&<>
<div className="modal-jobs" >
  <FaTimes onClick={handleCLoseModal} style={{position:"absolute",right:"20px",top:"20px",cursor:"pointer",}} size={'2rem'}/>
<div className="jobs-container">
  <h1>Application Form</h1>
  <form className="modal-form" >
    <div className="form-group">
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        id="name"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"

        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="resume">Upload Resume</label>
      <input
        type="file"
        id="resume"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="coverLetter">Cover Letter</label>
      <textarea
        id="coverLetter"
        required
      ></textarea>
    </div>
    <button type="submit" className="submit-button1">Submit Application</button>
  </form>
</div>
</div>
<div className="blackb"></div></>
   }
     {isJobModal && (
        <>
          <div className="modal-jobs" style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <div className="modal-close-btn" onClick={handleJobClose}>
              <FaTimes size={'1.5rem'} />
            </div>
            <div className="jobs-container">
              <h1>Post a New Job</h1>
              <form className="modal-form" onSubmit={handleSubmitJob}>
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required placeholder="e.g., Software Engineer, Product Manager" />
                </div>
                <div className="form-group">
                  <label htmlFor="jobDescription">Job Description</label>
                  <textarea id="jobDescription" name="jobDescription" rows="5" value={formData.jobDescription} onChange={handleChange} required placeholder="Describe the job responsibilities, requirements, and benefits..."></textarea>
                  <small className="form-helper-text">Provide a detailed description of the job to attract qualified candidates.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g., Acme Corporation" />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., San Francisco, CA or Remote" />
                </div>
                <div className="form-group">
                  <label htmlFor="jobSalary">Job Salary</label>
                  <input type="text" id="jobSalary" name="jobSalary" value={formData.jobSalary} onChange={handleChange} required placeholder="e.g., $50,000 - $70,000 per year" />
                  <small className="form-helper-text">Specify salary range or compensation details.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="jobType">Job Type</label>
                  <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="experienceLevel">Experience Level</label>
                  <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
                    <option value="entry">Entry</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="applicationDeadline">Application Deadline</label>
                  <input type="date" id="applicationDeadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} required />
                  <small className="form-helper-text">The last date candidates can apply for this position.</small>
                </div>
                <button type="submit" className="submit-button1">Submit Job</button>
              </form>
            </div>
          </div>
          <div className="blackb"></div>
        </>
      )}  </>
  );
};

export default Jobs;
