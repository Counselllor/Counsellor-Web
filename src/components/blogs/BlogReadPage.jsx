import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, get,remove,update } from 'firebase/database';
import moment from "moment";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import randomAvatar from "../../assets/avatar1.png"; // Assuming you have an avatar image
import './BlogReadPage.css';
import { Switch } from 'antd';
import { signOut } from "firebase/auth";
import { ThemeContext } from '../../App';
import { toast } from "react-toastify";
import { auth } from "../../firebase/auth";
import { FaTrash } from "react-icons/fa";

const BlogReadPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const userId = localStorage.getItem('userUid');

  const navigate = useNavigate();
  let [ids,setIds]=useState([])
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, [navigate]);

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          localStorage.removeItem('login');
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const db = getDatabase();
        const blogRef = ref(db, `articles/${id}`);
        const snapshot = await get(blogRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBlog(data);
          console.log('fddddddddddd',data)
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div></div>;
  }

  const createMarkup = (content) => {
    return { __html: DOMPurify.sanitize(marked(content)) };
  };
  const handleDelete = async (id) => {
    console.log(user)
      let isUser=true
      user.articleCreated.split(',').map((data)=>{
        if(data==id){
          isUser=true
        }
      })
      if(!isUser){
        return
      }
      const db = getDatabase();
        // Remove the article from the articles collection
       let a= await remove(ref(db, 'articles/' + id));
        // Update the user's articleCreated list
        const updatedArticles = user.articleCreated
          .split(',')
          .filter((id) => id !== id)
          .join(',');
    console.log(db)
        await update(ref(db, 'users/' + userId), {
          articleCreated: updatedArticles,
        });
    
        toast.success("Blog Deleted Successfully!! 🚀", {
          className: "toast-message",
        });
        const articlesRef = ref(db, 'articles');
        const snapshot = await get(articlesRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data)
          if(Object.values(data).length==0){
            navigate('/blogs')

    return
          }
          const blogsArray = Object.values(data).map(blog => ({
            title: blog.title,
            date: new Date(blog.createdAt).toLocaleDateString(),
            summary: stripMarkdown(blog.content.substring(0, 100)) + '...',
            tags: blog.tags,
            author: blog.author,
            link: `/blogs/${blog.id}`
          }));
          navigate('/blogs')
        } else {
          navigate('/blogs')

          console.log('No data available');
        }
      
    };
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
      <div className="blog-read-page_container">
        <div className="blog-read-page">
          <div className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <img src={randomAvatar} alt="Author Avatar" className="author-avatar" />
              <div className="meta-info">
                <p className="author-name">{blog.author}</p>
                <p className="blog-date">{moment(blog.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className="blog-tags">
              {blog.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="blog-tag">{tag}</span>
              ))}
            </div>
              {blog.userId==user.id && <div className="flex justify-end" style={{display:'flex',justifyContent:"end"}}>{<FaTrash size={'2rem'} onClick={()=>handleDelete(blog.id)}/>}</div>}
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogReadPage;
