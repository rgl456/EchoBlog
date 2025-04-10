import React, { useEffect, useState } from 'react';
import '../css/DraftPosts.css'; // Add CSS for styling if needed
import { getDraftPosts, updatePost,  } from '../services/postService'; // Import the service functions
import { useNavigate } from 'react-router-dom';

const DraftPosts = () => {
  const [draftPosts, setDraftPosts] = useState([]); // State to store draft posts
  const [error, setError] = useState(''); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDraftPosts = async () => {
      try {
        const response = await getDraftPosts(); // Fetch draft posts from the backend
        setDraftPosts(response.data); // Update the state with the fetched posts
      } catch (err) {
        console.error('Error fetching draft posts:', err);
        setError('Failed to load draft posts. Please try again later.');
      }
    };

    fetchDraftPosts();
  }, []);

  const handleEditClick = (post) => {
    // Navigate to the CreatePost page with the draft post data for editing
    navigate('/updatepost', { state: { post } });
  };

  return (
    <div className="draft-posts-container">
      <h1>Draft Posts</h1>
      {error && <p className="error-message">{error}</p>}
      {draftPosts.length > 0 ? (
        <div className="draft-posts-list">
          {draftPosts.map((post) => (
            <div key={post.id} className="draft-post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p className="post-meta">
                🗓️ {new Date(post.createdAt).toLocaleDateString()} | 📂 {post.categoryName?.name}
              </p>
              <div className="post-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(post)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No draft posts available.</p>
      )}
    </div>
  );
};

export default DraftPosts;