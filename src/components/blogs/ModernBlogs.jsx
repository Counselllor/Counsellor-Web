import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import DOMPurify from "dompurify";
import { marked } from "marked";
import ConditionalNavbar from "../Navbar/ConditionalNavbar";
import Footer from "../Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogsSkeleton from "./BlogsSkeleton";
import "./modern-blogs.css";

const ModernBlogs = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [ids, setIds] = useState({});
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userUid");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getDatabase();

        // Fetch user data if logged in
        if (userId) {
          const userRef = ref(db, "users/" + userId);
          const userSnap = await get(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.val();
            setUser(userData);

            const articleCreated = userData.articleCreated;
            if (articleCreated) {
              const idArray = articleCreated.split(",");
              const idObject = idArray.reduce((acc, id) => {
                acc[id.trim()] = true;
                return acc;
              }, {});
              setIds(idObject);
            } else {
              console.log("No articles created by the user.");
            }
          } else {
            console.log("No user data available");
          }
        }

        // Fetch all articles
        const articlesRef = ref(db, "articles");
        const snapshot = await get(articlesRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const blogsArray = Object.values(data).map((blog) => ({
            id: blog.id,
            title: blog.title,
            date: new Date(blog.createdAt).toLocaleDateString(),
            summary: stripMarkdown(blog.content.substring(0, 100)) + "...",
            tags: blog.tags,
            author: blog.author,
            createdAt: new Date(blog.createdAt),
            link: `/blogs/${blog.id}`,
          }));

          // Sort blogs by createdAt timestamp in descending order
          blogsArray.sort((a, b) => b.createdAt - a.createdAt);

          setBlogsData(blogsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
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
    if (localStorage.getItem("newblog")) {
      toast.success("Blog Created Successfully!! 🚀", {
        className: "toast-message",
      });
      localStorage.removeItem("newblog");
    }
  }, []);

  return (
    <div className="modern-blogs">
      <ConditionalNavbar />
      <ToastContainer />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1>Our Latest Blogs</h1>
          <p>
            Stay updated with our latest news and articles on education, career guidance, and counseling.
          </p>
          {isLoggedIn && (
            <button
              onClick={() => navigate("/blogwrite")}
              className="hero-cta create-blog-btn"
            >
              Create Blog
            </button>
          )}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs-section">
        <div className="blogs-container">
          {loading ? (
            <div className="blogs-grid">
              <BlogsSkeleton count={6} />
            </div>
          ) : (
            <div className="blogs-grid">
              {blogsData.map((blog, index) => (
                <div
                  key={index}
                  className="blog-card"
                  onClick={() => navigate(blog.link)}
                >
                  <h3 title={blog.title}>{blog.title}</h3>
                  <p className="blog-date" title={blog.date}>{blog.date}</p>
                  <p className="blog-summary" title={blog.summary.replace("...", "")}>{blog.summary}</p>
                  <div className="blog-tags">
                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="blog-tag" title={tag}>
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="blog-tag">+{blog.tags.length - 3} more</span>
                    )}
                  </div>
                  <p className="blog-author" title={`By: ${blog.author}`}>By: {blog.author}</p>
                  <button className="blog-read-more">Read More</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Want to Share Your Knowledge?</h2>
          <p>
            Join our community of writers and share your insights on education, career guidance, and more.
          </p>
          <div className="cta-buttons">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/blogwrite")}
                className="cta-button cta-button-primary"
              >
                Write a Blog
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="cta-button cta-button-primary"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="cta-button cta-button-secondary"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModernBlogs;
