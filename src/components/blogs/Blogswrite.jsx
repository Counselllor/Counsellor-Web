import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, update, get } from 'firebase/database';
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { signOut } from "firebase/auth";
import { Switch } from 'antd';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
import './BlogWrite.css'; // Import the new CSS file
import { toast } from 'react-toastify';
import { ThemeContext } from '../../App';

const BlogWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoggedIn, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userUid');
 
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, [navigate]);
  
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        
        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.val());
        } else {
          console.log('No user data available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User not found');
      return;
    }
    const articleId = generateUUID();
    const newBlog = {
      id: articleId,
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
      author: user.firstname+" "+user.surname,
      createdBy: userId,
      likeCount:0,
      createdAt: new Date().toISOString(),
    };

    try {
      const db = getDatabase();
      await set(ref(db, 'articles/' + articleId), newBlog);
      await update(ref(db, 'users/' + userId), {
        articleCreated: (user.articleCreated ? user.articleCreated + ',' : '') + articleId,
      });
      toast.success("Blog Created Successfully!! 🚀",{
        className: "toast-message",
      });
      navigate('/blogs');
    } catch (error) {
     toast.error(error,{
        className: "toast-message",
      });
    }
  };

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
    <div className="blog-write-container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            placeholder='Enter Blog Title'
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea 
            id="content" 
             placeholder='Enter Blog Content'
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="tags">Tags </label>
          <input 
            type="text" 
            id="tags" 
            placeholder='Enter Tags (comma-separated)'
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default BlogWrite;
