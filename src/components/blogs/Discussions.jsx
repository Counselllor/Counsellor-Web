import React, { useState } from 'react';
import { FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import moment from 'moment';
import './Discussion.css'; // Make sure to create and include this file
import randomAvatar from "../../assets/avatar1.png";

const Discussions = ({ user, comments, handleNewCommentSubmit, handleCloseModal, isModal }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    handleNewCommentSubmit(newComment, user);
    setNewComment(''); // Clear the textarea after submission
  };

  return (
    isModal && (
      <div className="discussion-modal">
        <div className="discussion-modal-content">
          <div className="modal-header">
            <h2>Discussions ({comments.length} Threads)</h2>
            <FaTimes className="close-icon" onClick={handleCloseModal} />
          </div>
          <div className="comment-box">
            <div className="user-info">
              <img src={user.profilePic || user.avatar || randomAvatar} alt="User Avatar" className="user-avatar" />
              <span className="user-name">{user.firstname} {user.surname}</span>
            </div>
            <textarea
              placeholder="Write Your Comments Here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="comment-list">
            {comments.map((data, index) => (
              <Comment key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

const Comment = ({ data }) => {
    console.log(data)
  return (
    <div className="comment">
      <div className="comment-header">
        <img src={data.avatar || "https://via.placeholder.com/50"} alt="User Avatar" className="user-avatar-comment" />
        <div className="comment-author">
          <span className="author-name">{data.author}</span>
          <span className="comment-time">{moment(data.timestamp).fromNow()}</span>
        </div>
      </div>
      <p className="comment-content">{data.content}</p>
      <div className="comment-actions">
        <FaChevronUp className="vote-icon" />
        <FaChevronDown className="vote-icon" />
        <span className="reply">Reply</span>
      </div>
    </div>
  );
};

export default Discussions;
