import React, { useState, useEffect } from 'react';
import '../css/CreateTag.css';
import { createTags, getTags, deleteTags } from '../services/tagService';

const CreateTag = () => {
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState([]); // List of tags
  const [message, setMessage] = useState('');

  // Fetch tags on component load
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response.data); // Assuming the API returns an array of tags
      } catch (error) {
        console.error('Error fetching tags:', error);
        setMessage('Error fetching tags. Please try again.');
      }
    };

    fetchTags();
  }, []); 

  const handleAddTag = async () => {
    if (tagName.trim()) {
      try {
        const token = localStorage.getItem("token"); // Assuming you saved token in localStorage after login

        const response = await createTags({ names: [tagName.trim()] }, token);
        console.log(response);

        const createdTags = response.data.map((tag) => ({
          id: tag.id,
          name: tag.name,
          postCount: tag.postCount || 0,
        }));

        setTags([...tags, ...createdTags]); // Spread the createdTags array into the existing tags array
        setMessage(`Tag created successfully: ${createdTags.map(tag => tag.name).join(', ')}`); // Display the names of the created tags
        setTagName("");
      } catch (error) {
        setMessage('Error creating tag. Please try again.');
        console.error(error);
      }
    } else {
      setMessage('Tag name cannot be empty.');
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await deleteTags(id, token);

      setTags(tags.filter((tag) => tag.id !== id));
      setMessage('Tag deleted successfully.');
    } catch (error) {
      setMessage('Error deleting tag.');
      console.error(error);
    }
  };

  return (
    <div className="create-tag-container">
      <div className="add-tag-container">
        <h2>Add Tag</h2>
        <div className="tag-input-container">
          <input
            type="text"
            placeholder="Enter tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <button className="add-tag-button" onClick={handleAddTag}>
            Add
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="tag-list-container">
        <h2>Tag List</h2>
        <div className="tag-list">
            {tags.filter(tag => tag.id).map((tag) => (
                <div key={tag.id} className="tag-item">
                <p><strong>Name:</strong> {tag.name}</p>
                <p><strong>Post Count:</strong> {tag.postCount}</p>
                <button
                    className="delete-tag-button"
                    onClick={() => handleDeleteTag(tag.id)}
                >
                    Delete
                </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTag;