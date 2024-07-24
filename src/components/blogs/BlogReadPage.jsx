import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, get,remove,update,push } from 'firebase/database';
import moment from "moment";
import DOMPurify from "dompurify";
import { marked } from "marked";
import upvote from  "./upvote-svgrepo-com.svg"
import downvote from  "./downvote-svgrepo-com.svg"

import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import randomAvatar from "../../assets/avatar1.png"; // Assuming you have an avatar image
import './BlogReadPage.css';
import { Modal, Switch } from 'antd';
import { signOut } from "firebase/auth";
import { ThemeContext } from '../../App';
import { toast } from "react-toastify";
import { auth } from "../../firebase/auth";
import { MdModeEdit, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaEnvelope, FaRegClipboard,  FaTimes,  FaWhatsapp } from "react-icons/fa";
import { FaTrash, FaShareAlt , FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";


const BlogReadPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // New state for loading
  const userId = localStorage.getItem('userUid');
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  let [isModal,setIsModal]=useState(false)

  let value=useRef()

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  let [ids,setIds]=useState([])
  const [user, setUser] = useState(null);
  const [isNotLoggedInModalVisible, setIsNotLoggedInModalVisible] = useState(false);

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




  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const db = getDatabase();
        const blogRef = ref(db, `articles/${id}`);
        const snapshot = await get(blogRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBlog(data);
          if (data.comments) {
            setComments(Object.values(data.comments));
            console.log(Object.values(data.comments))
          }
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
      setIsNotLoggedInModalVisible(true);
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
  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setIsNotLoggedInModalVisible(true);
      return;
    }
    try {
      const db = getDatabase();
      const commentsRef = ref(db, `articles/${id}/comments`);
      const newCommentRef = push(commentsRef);
      const commentData = {
        author: user.firstname, // Replace with actual user data if available
        content: value.current.value,
      };
      await update(newCommentRef, commentData);
      console.log(commentData)
      setComments([...comments, commentData]);
      setNewComment('');
      value.current.value=""
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
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
        
          navigate('/blogs')
        } else {
          navigate('/blogs')

          console.log('No data available');
        }
      
    };
    function handleCLoseModal(){
      setIsModal(false)
    }
    const handleShareClick = () => {
      setShareModalVisible(true);
    };
  
    const handleShareModalClose = () => {
      setShareModalVisible(false);
    };
    const shareUrl = encodeURIComponent(window.location.href);

    const handleCopyToClipboard = () => {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
         alert("Copied!!");
        })
        .catch((err) => {
          toast.error("Failed to copy!");
          console.error("Could not copy text: ", err);
        });
    };

    const closeModal = () => {
      setIsNotLoggedInModalVisible(false);
    };
  
    const handleOkayClick = () => {
      navigate('/');
    };

  return (
    <>
     <Navbar/>
      <div className="blog-read-page_container">
        <div className="blog-read-page">
          <div className="blog-header">
            <h1 className="blog-title"  dangerouslySetInnerHTML={{
      __html: blog.title,
    }}/>
            <div className="blog-meta">
              <img src={blog.pic ? blog.pic :(blog.avatar ? blog.avatar : randomAvatar)} alt="Author Avatar" className="author-avatar" />
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
              <div className="right_blog_icon" style={{display:"flex"}}>
              <div className="share-button" onClick={handleShareClick}>
              <FaShareAlt size={16} />
            </div>
              <button style={{padding:"10px",border:"solid 1px black"}} onClick={()=>setIsModal(true)}>Comment</button>
              { isLoggedIn &&  blog.createdBy === userId && (
              <>  
              <div className="Edit_icon">
                  <MdModeEdit size={18} onClick={handleEditClick} />
                </div>
                <div className="flex justify-end" style={{display:'flex',justifyContent:"end"}}>{<FaTrash size={'1.5rem'} onClick={()=>handleDelete(blog.id)}/>}</div>        
              </>
              )}
                 </div>
             
              </div>
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        </div>
      
    
      </div>
      <Footer />
      <Modal
  title="Share this article"
  visible={isShareModalVisible}
  onCancel={handleShareModalClose}
  footer={null}
>
  <div className="modal_content" style={{marginTop: "20px"}}>
    <div className="blog-meta">
      <img src={randomAvatar} alt="Author Avatar" className="author-avatar" />
      <div className="meta-info">
        <p className="author-name">{blog.author}</p>
        <p className="blog-date">{moment(blog.createdAt).fromNow()}</p>
      </div>
    </div>
    <div className="blog_share_con">
      <p className="blog_share_title">{blog.title}</p>
      <p className="blog_share_summ">{blog.content}</p>
    </div>
    <div className="share-button-icons">
      <span
        style={{ backgroundColor: "#1DA1F2", color: "#fff" }}
        onClick={() => {
          window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, '_blank');
        }}
      >
        <FaTwitter size={24} />
      </span>
      <span
        style={{ backgroundColor: "#25D366", color: "#fff" }}
        onClick={() => {
          window.open(`https://api.whatsapp.com/send?text=${shareUrl}`, '_blank');
        }}
      >
        <FaWhatsapp size={24} />
      </span>
      <span
        style={{ backgroundColor: "#0077B5", color: "#fff" }}
        onClick={() => {
          window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`, '_blank');
        }}
      >
        <FaLinkedin size={24} />
      </span>
      <span
        style={{ backgroundColor: "#EA4335", color: "#fff" }}
        onClick={() => {
          window.open(`mailto:?subject=${encodeURIComponent("Check out this Article")}&body=${shareUrl}`, '_blank');
        }}
      >
        <FaEnvelope size={24} />
      </span>
      <span
        style={{
          backgroundColor: "transparent",
          color: "#000",
          border: "1px solid #1c1c1c66",
        }}
        onClick={handleCopyToClipboard}
      >
        <FaRegClipboard size={24} />
      </span>
    </div>
    <button onClick={handleShareModalClose} className="close-button">
      Close
    </button>
  </div>


</Modal>
<Modal
          title="Not Logged In"
          visible={isNotLoggedInModalVisible}
          onCancel={closeModal}
          footer={[
            <button key="ok" className="close-button" onClick={handleOkayClick}>
              Okay
            </button>,
          ]}
        >
          <p>You need to be logged in to perform this action.</p>
        </Modal>

{
isModal&&<>
<div className="modal-jobs1">  <FaTimes onClick={handleCLoseModal} style={{position:"absolute",right:"20px",top:"20px",cursor:"pointer",}} size={'2rem'}/>

<div className="jobs-container1">
  <h1>Discussions</h1>
  <div style={{display:"flex",flexDirection:"column",fontSize:"20px",marginBottom:"60px"}}>
  <p style={{display:"flex",alignItems:"center",fontSize:"15px"}}>
  <img height={"60px"} width={"60px"} src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"></img>{user.firstname}
  </p>
  <textarea ref={value} placeholder="Enter Your Comment" style={{borderRadius:"20px",padding:"10px",height:"100px",minHeight:"100px",minWidth:"100%",maxWidth:"100%"}}/><button style={{marginLeft:"20px",width:"100px",padding:"10px",marginTop:"20px",background:"blue",color:"white"}} onClick={handleNewCommentSubmit}>Comment</button>
  </div>
  {
      comments.map((data)=>{
        return <div className="abc" style={{backgroundColor:"white",margin:"auto",paddingBottom:"20px",height:"160px"}}><p style={{display:"flex",alignItems:"center",fontSize:"15px"}}>
        <img height={"60px"} width={"60px"} src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"></img>{data.author}
        </p><p style={{color:"black",marginTop:"10px",textAlign:"left",paddingLeft:"60px",fontSize:"14px"}}>{data.content}</p><div style={{width:"100%",paddingLeft:"60px",display:"flex",paddingTop:"20px",gap:"20px",fontSize:"10px"}}><img src={upvote}></img><img src={downvote}></img>&nbsp;Reply</div></div>
      })
    }



</div>
</div>
<div className="blackb"></div></>
   }
    </>
  );
};

export default BlogReadPage;
