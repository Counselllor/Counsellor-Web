import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import moment from 'moment';
import { getDatabase, ref, update, onValue } from 'firebase/database'; 
import './Discussion.css'; 
import randomAvatar from '../../assets/avatar1.png';

const Discussions = ({ user, comments, handleNewCommentSubmit, handleCloseModal, isModal, blogid }) => {
  const [newComment, setNewComment] = useState('');
  const [userVotes, setUserVotes] = useState({ upvoted: [], downvoted: [] });
  const userUid = localStorage.getItem('userUid');

  useEffect(() => {
    const fetchUserVotes = async () => {
      const database = getDatabase();
      const userVotesRef = ref(database, `users/${userUid}/votes`);
      onValue(userVotesRef, (snapshot) => {
        const votes = snapshot.val() || { upvoted: [], downvoted: [] };
        setUserVotes(votes);
      });
    };

    fetchUserVotes();
  }, [userUid]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewCommentSubmit(newComment);
    setNewComment(''); 
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
              <Comment
                key={index}
                data={data}
                user={user}
                userVotes={userVotes}
                blogid={blogid}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

const Comment = ({ data, user, userVotes, blogid }) => {
  const [upvotes, setUpvotes] = useState(data.upvotes || 0);
  const [downvotes, setDownvotes] = useState(data.downvotes || 0);
  const userUid = localStorage.getItem('userUid');
  const [userVote, setUserVote] = useState(() => {
    if (userVotes?.upvoted?.includes(data.id)) return 'upvote';
    if (userVotes?.downvoted?.includes(data.id)) return 'downvote';
    return null;
  });

  useEffect(() => {
    const fetchVotes = async () => {
      const database = getDatabase();
      const commentRef = ref(database, `articles/${blogid}/comments/${data.id}`);

      onValue(commentRef, (snapshot) => {
        const commentData = snapshot.val();
        if (commentData) {
          setUpvotes(commentData.upvotes || 0);
          setDownvotes(commentData.downvotes || 0); // Ensure downvotes are set correctly
        }
      });
    };

    fetchVotes();
  }, [data.id, blogid]);

  const handleVoteChange = async (voteType) => {
    const database = getDatabase();
    const commentRef = ref(database, `articles/${blogid}/comments/${data.id}`);
    const userVotesRef = ref(database, `users/${userUid}/votes`);
  
    if (voteType === 'upvote') {
      if (userVote === 'upvote') {
        // User is removing the upvote
        setUpvotes(upvotes - 1);
        setUserVote(null);
        await update(commentRef, { upvotes: upvotes - 1 });
        await update(userVotesRef, { upvoted: userVotes.upvoted.filter(id => id !== data.id) });
      } else {
        // If the user had downvoted before, remove the downvote first
        if (userVote === 'downvote') {
          setDownvotes(downvotes - 1);
          await update(commentRef, { downvotes: downvotes - 1 });
          await update(userVotesRef, { downvoted: userVotes.downvoted.filter(id => id !== data.id) });
          await update(userVotesRef, { upvoted: [...userVotes.upvoted, data.id] });
        }
        // Then, add the upvote
        setUpvotes(upvotes + 1);
        setUserVote('upvote');
        await update(commentRef, { upvotes: upvotes + 1 });
        await update(userVotesRef, { upvoted: [...userVotes.upvoted, data.id] });
      }
    } else if (voteType === 'downvote') {
      if (userVote === 'downvote') {
        // User is removing the downvote
        setDownvotes(downvotes - 1);
        setUserVote(null);
        await update(commentRef, { downvotes: downvotes - 1 });
        await update(userVotesRef, { downvoted: userVotes.downvoted.filter(id => id !== data.id) });
      } else {
        // If the user had upvoted before, remove the upvote first
        if (userVote === 'upvote') {
          setUpvotes(upvotes - 1);
          await update(commentRef, { upvotes: upvotes - 1 });
          await update(userVotesRef, { upvoted: userVotes.upvoted.filter(id => id !== data.id) });
          
        }
        // Then, add the downvote
        setDownvotes(downvotes + 1);
        setUserVote('downvote');
        await update(commentRef, { downvotes: downvotes + 1 });
        await update(userVotesRef, { downvoted: [...userVotes.downvoted, data.id] });
      }
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img src={data.avatar || 'https://via.placeholder.com/50'} alt="User Avatar" className="user-avatar-comment" />
        <div className="comment-author">
          <span className="author-name">{data.author}</span>
          <span className="comment-time">{moment(data.timestamp).fromNow()}</span>
        </div>
      </div>
      <p className="comment-content">{data.content}</p>
      <div className="comment-actions">
        <FaChevronUp
          className={`vote-icon ${userVote === 'upvote' ? 'active upvote' : ''}`}
          onClick={() => handleVoteChange('upvote')}
        />
        <span className="vote-count">{upvotes}</span>
        <FaChevronDown
          className={`vote-icon ${userVote === 'downvote' ? 'active downvote' : ''}`}
          onClick={() => handleVoteChange('downvote')}
        />
        <span className="vote-count">{downvotes}</span>
        <span className="reply">Reply</span>
      </div>
    </div>
  );
};

export default Discussions;
