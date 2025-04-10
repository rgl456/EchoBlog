import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Contact from './Contact';
import Faq from './Faq';

import { getPublishedPosts, getPostsByCategoryId } from '../services/postService';
import { getCategories } from '../services/categoryService';

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const currentUserEmail = localStorage.getItem("email");
  console.log(currentUserEmail);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publishedPostsResponse = await getPublishedPosts();
        setPosts(publishedPostsResponse.data);
        setFilteredPosts(publishedPostsResponse.data);

        const categoriesResponse = await getCategories();
        setCategories([{ id: 'all', name: 'All' }, ...categoriesResponse.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    if (categoryId === 'all') {
      setFilteredPosts(posts);
      setError('');
    } else {
      try {
        const response = await getPostsByCategoryId(categoryId);
        setFilteredPosts(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching posts by category:', error);
        setError('Failed to load posts for this category. Please try again later.');
      }
    }
  };

  const handleEditClick = (post) => {
    navigate('/updatepost', { state: { post } }); // 👈🏽 Update to /updatepost route
  };

  return (
    <>
      <div className="category-scroll">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category.id)}
              style={{ cursor: 'pointer' }}
            >
              {category.name}
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      <div className="home-container">
        <h2 className="home-title">Latest Posts</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="post-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-meta">
                  🗓️ {new Date(post.createdAt).toLocaleDateString()} | 🧑 {post.author.name} | 📂{' '}
                  {post.categoryName.name}
                </p>
                <p className="post-tags">
                  🏷️ Tags: {post.tags.map((tag) => tag.name).join(', ')}
                </p>
                <p className="post-content">{post.content}</p>
                <p className="post-status">
                  📖 Reading Time: {post.readingTime} mins
                </p>
                <div className="post-actions">
                  {currentUserEmail === post.author.email && 
                    <button className="edit-button" onClick={() => handleEditClick(post)}>
                    ✏️ Edit
                    </button>
                  }
                </div>
              </div>
            ))
          ) : (
            <p>No posts available for this category.</p>
          )}
        </div>
      </div>
          
      <Faq />
      <Contact />

      <footer className="footer">
        <p>Designed and Developed by Anonymous</p>
        <div className="social-media">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
