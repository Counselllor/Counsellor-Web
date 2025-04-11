import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { signOut } from "firebase/auth";
import { Switch } from 'antd';
import './BlogWrite.css';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../App';


const BlogEditPage = () => {
  const location = useLocation();
  const { title: initialTitle, content: initialContent, tags: initialTagsArray, id } = location.state || {};
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const [tags, setTags] = useState(initialTagsArray ? initialTagsArray.join(', ') : '');
  const [isLoggedIn, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userUid');



  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, [navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
      lastUpdated: new Date().toISOString(),
    };

    try {
      const db = getDatabase();
      await update(ref(db, 'articles/' + id), updatedBlog);
      toast.success("Blog Updated Successfully!! 🚀", {
        className: "toast-message",
      });
      navigate('/blogs');
    } catch (error) {
      toast.error(error.message, {
        className: "toast-message",
      });
    }
  };


  return (
    <>

      <div className="blog-write-container">
        <h1>Edit Blog</h1>
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
          <button type="submit">Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogEditPage;
