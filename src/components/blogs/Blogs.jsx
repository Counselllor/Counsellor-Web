import React, { useCallback, useContext, useEffect, useState } from "react";
import './Blogs.css'; // Import CSS file for styles
import BackToHomeButton from "../backtohome";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { signOut } from "firebase/auth";
import { getDatabase, ref, set,remove, update, get } from 'firebase/database';
import { auth } from "../../firebase/auth";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
const Blogs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  let [ids,setIds]=useState([])
  const [blogsData, setBlogsData] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userUid');
  const [user, setUser] = useState(null);
let router=useNavigate()
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
    
  }, [navigate]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        
        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.val());

          let inputString = userSnap.val().articleCreated;
          let idArray = inputString.split(',');
          
          let idObject = idArray.reduce((acc, id) => {
              acc[id.trim()] = true; // or any other value you want to associate with the ID
              return acc;
          }, {});             
              console.log(idObject,'asssssssssssssssssss')
            setIds(idObject)
          
        } else {
          console.log('No user data available');
        }
        const articlesRef = ref(db, 'articles');
        const snapshot = await get(articlesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const blogsArray = Object.values(data).map(blog => ({
            title: blog.title,
            date: new Date(blog.createdAt).toLocaleDateString(),
            summary: stripMarkdown(blog.content.substring(0, 100)) + '...',
            tags: blog.tags,
            author: blog.author,
            link: `/blogs/${blog.id}`
          }));
          setBlogsData(blogsArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
    

    
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("login");
        navigate("/");
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

  const stripMarkdown = (content) => {
    const cleanHtml = DOMPurify.sanitize(marked(content));
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
console.log(blogsData)

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

            {!isLoggedIn && <li><a href="/" onClick={handleSignOut}>Login</a></li>}
            {isLoggedIn && <>
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
              </li>
            </>}
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
          {isLoggedIn && <button onClick={() => navigate('/blogwrite')} className="blogwrite">Create Blog</button>}
        </header>
        <div className="blogs-list">
          {blogsData.map((blog, index) => (
           
            <div key={index} className="blog-card" onClick={()=>{navigate(blog.link)}}>
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
