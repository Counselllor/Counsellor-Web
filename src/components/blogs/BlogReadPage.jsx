import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getDatabase, ref, get,remove,update,push } from 'firebase/database';
import moment from "moment";
import DOMPurify from "dompurify";
import { marked } from "marked";
import upvote from  "./upvote-svgrepo-com.svg"
import downvote from  "./downvote-svgrepo-com.svg"
import { FaRegComment } from "react-icons/fa";
import Footer from "../Footer/Footer";
import randomAvatar from "../../assets/avatar1.png"; // Assuming you have an avatar image
import './BlogReadPage.css';
import { Modal} from 'antd';
import { toast } from "react-toastify";
import { MdModeEdit, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaEnvelope, FaRegClipboard,  FaTimes,  FaWhatsapp } from "react-icons/fa";
import { FaTrash, FaShareAlt , FaTwitter, FaLinkedin } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Discussions from "./Discussions";

const generateUUID = () => {
  var d = new Date().getTime();
  var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
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



const BlogReadPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // New state for loading
  const userId = localStorage.getItem('userUid');
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  let [isModal,setIsModal]=useState(false)

  let value=useRef()

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
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

  const handleNewCommentSubmit = async (comment) => {
    if (!isLoggedIn) {
      setIsNotLoggedInModalVisible(true);
      return;
    }
    try {
      const db = getDatabase();
      const commentsRef = ref(db, `articles/${id}/comments`);
      const newCommentId = generateUUID();
      const newCommentRef = ref(db, `articles/${id}/comments/${newCommentId}`);
      const commentData = {
        id: newCommentId,
        author: user.firstname, // Replace with actual user data if available
        content: comment,
        timestamp: Date.now(),
        avatar: user.profilePic || user.avatar || randomAvatar
      };
      await update(newCommentRef, commentData);
      console.log(commentData);
      setComments([...comments, commentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  const handleCloseModal = () => {
    setIsModal(false);
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
          if(Object.values(data).length==0){
            navigate('/blogs')

    return
          }
        
          navigate('/blogs')
        } else {
          navigate('/blogs')

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
 console.log()
  return (
    <>
     <Navbar/>
      <div className="blog-read-page_container">
        <div className="blog-read-page">
          <div className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <img src={blog.profilePic ? blog.profilePic :(blog.avatar ? blog.avatar : randomAvatar)} alt="Author Avatar" className="author-avatar" />
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
              <div className="comment-button"  onClick={()=>setIsModal(true)}>
              <FaRegComment size={16} /><p>{Object.keys(comments).length}</p>
            </div>
              
              <div className="share-button" onClick={handleShareClick}>
              <FaShareAlt size={16} />
            </div>
       
              {/* <button style={{padding:"10px",border:"solid 1px black"}} onClick={()=>setIsModal(true)}>Comment</button> */}
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

        <Discussions
  user={user}
  blogid={id}
  comments={comments}
  handleNewCommentSubmit={handleNewCommentSubmit}
  handleCloseModal={handleCloseModal}
  isModal={isModal}
/>
    </>
  );
};

export default BlogReadPage;