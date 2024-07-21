import React, { useEffect, useState } from "react";
import './Blogs.css'; // Import CSS file for styles
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { getDatabase, ref, get } from 'firebase/database';
import DOMPurify from "dompurify";
import { marked } from "marked";
import Navbar from "../Navbar/Navbar";

const Blogs = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [ids, setIds] = useState({});
  const [blogsData, setBlogsData] = useState([]);
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
        const userRef = ref(db, 'users/' + userId);

        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.val();
          setUser(userData);

          const articleCreated = userData.articleCreated;
          if (articleCreated) {
            const idArray = articleCreated.split(',');
            const idObject = idArray.reduce((acc, id) => {
              acc[id.trim()] = true;
              return acc;
            }, {});
            setIds(idObject);
          } else {
            console.log('No articles created by the user.');
          }
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
  }, [userId]);

  const stripMarkdown = (content) => {
    const cleanHtml = DOMPurify.sanitize(marked(content));
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <Navbar />
      <div className="blogs-container">
        <header className="blogs-header">
          <h1>Our Latest Blogs</h1>
          <p>Stay updated with our latest news and articles on counseling.</p>
          {isLoggedIn && <button onClick={() => navigate('/blogwrite')} className="blogwrite">Create Blog</button>}
        </header>
        <div className="blogs-list">
          {blogsData.map((blog, index) => (
            <div key={index} className="blog-card" onClick={() => navigate(blog.link)}>
              <h2 className=" clip-text">{blog.title}</h2>
              <p className="blog-date ">{blog.date}</p>
              <p className=" clip-text">{blog.summary}</p>
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
