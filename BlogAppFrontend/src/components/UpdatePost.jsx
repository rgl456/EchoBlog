import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories } from '../services/categoryService';
import { getTags } from '../services/tagService';
import { updatePost } from '../services/postService';
import '../css/CreatePost.css';

const UpdatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [categoryId, setCategoryId] = useState(post?.categoryId || '');
  const [tagIds, setTagIds] = useState(post?.tags.map(t => t.id) || []);
  const [status, setStatus] = useState(post?.status || 'DRAFT');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          getCategories(),
          getTags(),
        ]);
        setCategories(catRes.data);
        setTags(tagRes.data);
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const handleAddTag = (e) => {
    const tagId = e.target.value;
    if (tagId && !tagIds.includes(tagId)) {
      setTagIds([...tagIds, tagId]);
    }
  };

  const handleRemoveTag = (id) => {
    setTagIds(tagIds.filter(tagId => tagId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !categoryId) {
      setError('Please fill all required fields.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await updatePost(post.id, { title, content, categoryId, tagIds, status }, token);
      setSuccess('Post updated successfully!');
      navigate('/');
    } catch (err) {
      setError('Error updating post.');
    }
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Edit Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tag">Tags</label>
          <select id="tag" onChange={handleAddTag}>
            <option value="">Select Tag</option>
            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <div className="tag-list">
          {tagIds.map(id => {
            const tag = tags.find(t => t.id === id);
            return (
              <div key={id} className="tag-tile">
                {tag?.name}
                <button type="button" onClick={() => handleRemoveTag(id)} className="remove-tag-button">✕</button>
              </div>
            );
          })}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button type="submit" className="create-post-button">Update</button>
      </form>
    </div>
  );
};

export default UpdatePost;