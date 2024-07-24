import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, update, get } from 'firebase/database';
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { signOut } from "firebase/auth";
import { Switch } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
import './BlogWrite.css'; // Import the new CSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeContext } from '../../App';
import Navbar from '../Navbar/Navbar';

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
  let ref1=useRef()
  let ref2=useRef()
 
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
    if(title.length>80){
      toast.error("Title Length Should not be greater than 80!! 🚀",{
        className: "toast-message",
      });
      // toast.error("sdsdsd")
      return 
    }
    if( tags.split(',').length>6){
      toast.error("Tags length should Not be Greater then 6!! 🚀",{
        className: "toast-message",
      });
      // toast.error("sdsdsd")
      return 
    }
    const articleId = generateUUID();
    const newBlog = {
      id: articleId,
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
      author: user.firstname+" "+user.surname,
       pic: user.profilePic || "",
       avatar:user.avatar || "",
      createdBy: userId,
      likeCount:0,
      createdAt: new Date().toISOString(),
    };
    console.log('sdsdsd')
    localStorage.setItem("newblog",true)

    try {
      const db = getDatabase();
      await set(ref(db, 'articles/' + articleId), newBlog);
      await update(ref(db, 'users/' + userId), {
        articleCreated: (user.articleCreated ? user.articleCreated + ',' : '') + articleId,
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
function checkLength(e){
  console.log(ref1.current.value,title)
  let length=title.length
  let temp=ref1.current.value
  if(temp.length<length){
    setTitle(ref1.current.value)
  }
  if(title.length+1<=80){
    setTitle(ref1.current.value)
  }else{
    if(!localStorage.getItem("showed")){

      localStorage.setItem("showed",true)
      toast.error("Title Length Should not be greater than 80!! 🚀",{
        className: "toast-message",
      });
      setTimeout(()=>{
  localStorage.removeItem('showed')
      },6000)
    }
  }

}
function updatedesc(){
  setContent(ref2.current.value)
}
  return (
    <>
       <Navbar/>
       <ToastContainer />
    <div className="blog-write-container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <ReactQuill 
                      style={{background:"white",color:"black"}}

            type="text" 
            id="title" 
            placeholder='Enter Blog Title'
            value={title} 
          onChange={checkLength}
          ref={ref1}
            required 
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <ReactQuill 
            id="content" 
            style={{background:"white",color:"black !important"}}
            placeholder='Enter Blog Content'
            value={content} 
    ref={ref2}
            onChange={updatedesc} 
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
