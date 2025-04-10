import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CreateCategory.css';
import { getCategories, createCategory, deleteCategory } from "../services/categoryService";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); // List of categories
  const [message, setMessage] = useState('');

  // Fetch categories on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data); // Assuming the API returns an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Error fetching categories. Please try again.');
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs only once

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await createCategory({ name: categoryName.trim() }, token);

        const newCategory = {
          id: response.data.id,
          name: response.data.name,
          postCount: response.data.postCount || 0,
        };

        setCategories([...categories, newCategory]);
        setMessage(`Category created successfully: ${response.data.name}`);
        setCategoryName("");
      } catch (error) {
        setMessage('Error creating category. Please try again.');
        console.error(error);
      }
    } else {
      setMessage('Category name cannot be empty.');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteCategory(id, token);        

      setCategories(categories.filter((category) => category.id !== id));
      setMessage('Category deleted successfully.');
    } catch (error) {
      setMessage('Error deleting category.');
      console.error(error);
    }
  };

  return (
    <div className="create-category-container">
      <div className="add-category-container">
        <h2>Add Category</h2>
        <div className="category-input-container">
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className="add-category-button" onClick={handleAddCategory}>
            Add
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="category-list-container">
        <h2>Category List</h2>
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <p><strong>Name:</strong> {category.name}</p>
              <p><strong>Post Count:</strong> {category.postCount}</p>
              <button
                className="delete-category-button"
                onClick={() => handleDeleteCategory(category.id)}
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

export default CreateCategory;

