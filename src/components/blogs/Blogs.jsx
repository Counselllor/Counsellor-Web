import React, { useCallback, useContext, useEffect, useState } from "react";
import './Blogs.css'; // Import CSS file for styles
import BackToHomeButton from "../backtohome";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { toast } from 'react-toastify';

const blogsData = [
  {
    title: "Understanding the Role of a Counselor",
    date: "June 20, 2024",
    summary: "Counselors play a vital role in supporting individuals through personal challenges and mental health issues. Learn more about their responsibilities and impact.",
    tags: ["Counseling", "Mental Health"],
    author: "John Doe",
    link: "#"
  },
  { 
    title: "How to Choose the Right Counselor for You", 
    date: "June 22, 2024", 
    summary: "Finding the right counselor can make a significant difference in your therapy journey. Here are some tips to help you select a counselor that fits your needs.", 
    tags: ["Counseling", "Advice"], 
    author: "Jane Smith", 
    link: "#" 
  }, 
  { 
    title: "The Benefits of Counseling for Mental Health", 
    date: "June 25, 2024", 
    summary: "Explore the various ways counseling can improve your mental health and overall well-being. From stress management to personal growth, counseling offers numerous benefits.", 
    tags: ["Mental Health", "Well-being"], 
    author: "Emily Johnson", 
    link: "#" 
  }, 
  { 
    title: "Counseling Techniques for Stress Management", 
    date: "June 28, 2024", 
    summary: "Discover effective counseling techniques that can help manage stress and improve your mental health.", 
    tags: ["Stress Management", "Techniques"], 
    author: "Michael Brown", 
    link: "#" 
  }, 
  { 
    title: "The Importance of Mental Health Awareness", 
    date: "June 30, 2024", 
    summary: "Raising awareness about mental health is crucial in today’s society. Learn why it matters and how you can contribute.", 
    tags: ["Awareness", "Mental Health"], 
    author: "Jessica Davis", 
    link: "#" 
  }, 
  { 
    title: "How to Support a Friend Going Through Counseling", 
    date: "July 2, 2024", 
    summary: "Supporting a friend who is going through counseling can be challenging. Here are some tips to help you provide the right support.", 
    tags: ["Support", "Friendship"], 
    author: "David Wilson", 
    link: "#" 
  }, 
  { 
    title: "Overcoming the Stigma of Counseling", 
    date: "July 4, 2024", 
    summary: "Many people still face stigma when seeking counseling. This article explores ways to overcome these challenges.", 
    tags: ["Stigma", "Counseling"], 
    author: "Chris Lee", 
    link: "#" 
  }, 
  { 
    title: "The Role of Counseling in Personal Development", 
    date: "July 6, 2024", 
    summary: "Counseling is not only for mental health issues; it also plays a significant role in personal development.", 
    tags: ["Personal Development", "Growth"], 
    author: "Megan Anderson", 
    link: "#" 
  }, 
  { 
    title: "Different Types of Counseling Approaches", 
    date: "July 8, 2024", 
    summary: "Learn about different counseling approaches and find out which one might be best for you.", 
    tags: ["Approaches", "Counseling"], 
    author: "Brian Martinez", 
    link: "#" 
  }, 
  { 
    title: "Counseling for Families: What You Need to Know", 
    date: "July 10, 2024", 
    summary: "Family counseling can help resolve conflicts and improve communication. Here’s what you need to know.", 
    tags: ["Family", "Counseling"], 
    author: "Sarah Robinson", 
    link: "#" 
  }, 
  { 
    title: "The Benefits of Group Counseling", 
    date: "July 12, 2024", 
    summary: "Group counseling offers unique benefits that individual sessions might not. Discover what group counseling can offer.", 
    tags: ["Group Counseling", "Benefits"], 
    author: "James Walker", 
    link: "#" 
  }, 
  { 
    title: "Counseling and Self-Care: A Perfect Match", 
    date: "July 14, 2024", 
    summary: "Learn how counseling and self-care go hand in hand in promoting mental health and overall well-being.", 
    tags: ["Self-Care", "Counseling"], 
    author: "Amanda Harris", 
    link: "#" 
  }
];

const Blogs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
let [isLoggedIn,setLogin]=useState(false)
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  let navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('login')){

      setLogin(true)
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // handle user logged in state
    //   } else {
        
    //   }
    // });
  }, [navigate]);
  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          localStorage.removeItem('login')

          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <>        
      <nav className={`navbar fixed`}>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="./courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>

            {!isLoggedIn&&  <li><a href="/" onClick={handleSignOut}>Login</a></li>}
          {
isLoggedIn&&<>

           <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
            <li><button className='profile_btn'>Profile</button></li>
         
            <li>
              <Switch
                style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
                onChange={handleThemeChange}
                checked={theme === "dark"}
                checkedChildren="Dark Mode"
                unCheckedChildren="Light Mode"
              />
            </li> </>} 
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>
      <div className="blogs-container">
        <BackToHomeButton />
        <header className="blogs-header">
          <h1>Our Latest Blogs</h1>
          <p>Stay updated with our latest news and articles on counseling.</p>
        </header>
        <div className="blogs-list">
          {blogsData.map((blog, index) => (
            <div key={index} className="blog-card">
              <h2>{blog.title}</h2>
              <p className="blog-date">{blog.date}</p>
              <p>{blog.summary}</p>
              <p className="blog-author">By: {blog.author}</p>
              <div className="blog-tags">
                {blog.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="blog-tag">{tag}</span>
                ))}
              </div>
              <button className="click-btn1">
                <a href={blog.link}>Read More</a>
              </button>
              <div className="read-more-container">
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
