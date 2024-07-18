import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update } from 'firebase/database';
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
import { MdModeEdit, MdFavorite, MdFavoriteBorder } from "react-icons/md";

const BlogReadPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // New state for loading
  const navigate = useNavigate();
  const userId = localStorage.getItem('userUid');

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
          checkIfLiked(data.id);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const checkIfLiked = async (blogId) => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.LikedArticles && data.LikedArticles.includes(blogId)) {
            setLiked(true);
          }
        }
      } catch (error) {
        console.error('Error checking liked articles:', error);
      }
    };

    fetchBlog();
  }, [id, userId]);

  const handleEditClick = () => {
    navigate('/blogs/edit/' + id, {
      state: {
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
        id: id
      }
    });
  };

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to like the article.", {
        className: "toast-message",
      });
      return;
    }

    if (isLiking) return; // Prevent multiple clicks

    setIsLiking(true); // Set loading state

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      const userSnap = await get(userRef);
      const userData = userSnap.exists() ? userSnap.val() : {};

      let userLikedArticles = userData.LikedArticles ? userData.LikedArticles.split(',') : [];
      let likeCount = blog.likeCount || 0;

      if (liked) {
        userLikedArticles = userLikedArticles.filter(articleId => articleId !== id);
        likeCount -= 1;
      } else {
        userLikedArticles.push(id);
        likeCount += 1;
      }

      await update(ref(db, `articles/${id}`), {
        likeCount: likeCount
      });

      await update(userRef, {
        LikedArticles: userLikedArticles.join(',')
      });

      setLiked(!liked);
      setBlog((prevBlog) => ({
        ...prevBlog,
        likeCount: likeCount
      }));
    } catch (error) {
      console.error('Error updating like status:', error);
    } finally {
      setIsLiking(false); // Reset loading state
    }
  };

  if (!blog) {
    return <div></div>;
  }

  const createMarkup = (content) => {
    return { __html: DOMPurify.sanitize(marked(content)) };
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
            <div className="icons_blog_read">
              <div >
              <div className="like_icon" onClick={handleLikeClick} >{liked ? (
                  <MdFavorite size={18} />
                ) : (
                  <MdFavoriteBorder size={18} />
                )}<p>{blog.likeCount}</p>
                </div>  
              </div>
              {blog.createdBy === userId && (
                <div className="Edit_icon">
                  <MdModeEdit size={18} onClick={handleEditClick} />
                </div>
              )}
            </div>
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogReadPage;
