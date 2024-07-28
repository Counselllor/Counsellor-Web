import React, { useEffect, useState } from "react";
import './Blogs.css';
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from 'firebase/database';
import DOMPurify from "dompurify";
import { marked } from "marked";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogsSkeleton from "./BlogsSkeleton";
import SearchIcon from '../../assets/search_icon.png';

const Blogs = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('all'); // Default to 'all' search mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userUid');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getDatabase();

        if (userId) {
          const userRef = ref(db, 'users/' + userId);
          const userSnap = await get(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.val();
            setUser(userData);
          } else {
            console.log('No user data available');
          }
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
          setFilteredBlogs(blogsArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchBlogs();
  }, [userId]);

  const stripMarkdown = (content) => {
    const cleanHtml = DOMPurify.sanitize(marked(content));
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    if (localStorage.getItem('newblog')) {
      toast.success("Blog Created Successfully!! 🚀", {
        className: "toast-message",
      });
      localStorage.removeItem('newblog');
    }
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    switch (searchMode) {
      case 'title':
        searchByTitle(term);
        break;
      case 'author':
        searchByAuthor(term);
        break;
      case 'tags':
        searchByTags(term);
        break;
      default:
        searchByAll(term);
    }
  };

  const searchByTitle = (term) => {
    const filtered = blogsData.filter(blog => blog.title.toLowerCase().includes(term));
    setFilteredBlogs(filtered);
  };

  const searchByAuthor = (term) => {
    const filtered = blogsData.filter(blog => blog.author.toLowerCase().includes(term));
    setFilteredBlogs(filtered);
  };

  const searchByTags = (term) => {
    const filtered = blogsData.filter(blog => blog.tags.some(tag => tag.toLowerCase().includes(term)));
    setFilteredBlogs(filtered);
  };

  const searchByAll = (term) => {
    const filtered = blogsData.filter(blog =>
      blog.title.toLowerCase().includes(term) ||
      blog.author.toLowerCase().includes(term) ||
      blog.tags.some(tag => tag.toLowerCase().includes(term))
    );
    setFilteredBlogs(filtered);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="blogs-container">
        <header className="blogs-header">
          <h1>Our Latest Blogs</h1>
          <p>Stay updated with our latest news and articles on counseling.</p>
          {isLoggedIn && <button onClick={() => navigate('/blogwrite')} className="blogwrite">Create Blog</button>}

          {/* Search Box */}
          <div className="search">
            <div className="s_bar_c">
              <img src={SearchIcon} alt="Search" onClick={openModal} />
              <div className="vl" />
              <input
                type="text"
                placeholder={`Search by ${ searchMode === 'all' ? "Title , Author ,Tag" : searchMode}`}
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ outline: "1px solid black", fontSize: "20px" }}
              />
            </div>
            <div className="search_box">
              <button>Search</button>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Select Search Mode</h2>
                <div className="search-modes">
                  <label>
                    <input
                      type="radio"
                      value="title"
                      checked={searchMode === 'title'}
                      onChange={() => setSearchMode('title')}
                    />
                    Title
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="author"
                      checked={searchMode === 'author'}
                      onChange={() => setSearchMode('author')}
                    />
                    Author
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="tags"
                      checked={searchMode === 'tags'}
                      onChange={() => setSearchMode('tags')}
                    />
                    Tags
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="all"
                      checked={searchMode === 'all'}
                      onChange={() => setSearchMode('all')}
                    />
                    All
                  </label>
                </div>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </header>
        <div className="blogs-list">
          {loading ? (
            <BlogsSkeleton count={blogsData.length} />
          ) : (
            filteredBlogs.map((blog, index) => (
              <div key={index} className="blog-card" onClick={() => navigate(blog.link)}>
                <h2 className="clip-text">{blog.title}</h2>
                <p className="blog-date">{blog.date}</p>
                <p className="clip-text">{blog.summary}</p>
                <p className="blog-author">By: {blog.author}</p>
                <div className="blog-tags">
                  {blog.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <button className="click-btn1">
                  <a href={blog.link}>Read More</a>
                </button>
                <div className="read-more-container"></div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
