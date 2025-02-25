import React, { useState, useEffect } from "react";
import "./AddCategory.css"; // Updated className
import axios from "axios"; // Make sure to install axios: npm install axios

const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newSubSubcategory, setNewSubSubcategory] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editingSubSubcategory, setEditingSubSubcategory] = useState(null);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      if (response.data.success) {
        const allCategories = response.data.data.map(cat => ({
          id: cat.id,
          name: cat.name
        }));
        setCategories(allCategories);
      }
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    setSelectedSubcategory("");
    setSubSubcategories([]);
    
    // Find the selected category
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      setSelectedCategoryId(category.id);
      // Fetch subcategories for this category
      fetchSubcategories(category.id);
    } else {
      setSelectedCategoryId(null);
      setSubcategories([]);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      if (response.data.success) {
        const category = response.data.data.find(cat => cat.id === categoryId);
        if (category && category.subcategories) {
          setSubcategories(category.subcategories.map(sub => ({
            id: sub.id,
            name: sub.name
          })));
        } else {
          setSubcategories([]);
        }
      }
    } catch (err) {
      setError("Failed to fetch subcategories");
      console.error(err);
    }
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryName = e.target.value;
    setSelectedSubcategory(subcategoryName);
    
    // Find the selected subcategory
    const subcategory = subcategories.find(sub => sub.name === subcategoryName);
    if (subcategory) {
      setSelectedSubcategoryId(subcategory.id);
      // Fetch sub-subcategories for this subcategory
      fetchSubSubcategories(selectedCategoryId, subcategory.id);
    } else {
      setSelectedSubcategoryId(null);
      setSubSubcategories([]);
    }
  };

  const fetchSubSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      if (response.data.success) {
        const category = response.data.data.find(cat => cat.id === categoryId);
        if (category && category.subcategories) {
          const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
          if (subcategory && subcategory.subSubcategories) {
            setSubSubcategories(subcategory.subSubcategories.map(subsub => ({
              id: subsub.id,
              name: subsub.name
            })));
          } else {
            setSubSubcategories([]);
          }
        }
      }
    } catch (err) {
      setError("Failed to fetch sub-subcategories");
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/categories`, {
        name: newCategory.trim()
      });
      
      if (response.data.success) {
        setSuccess("Category added successfully");
        setNewCategory("");
        fetchCategories();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add category");
      console.error(err);
    }
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategory.trim() || !selectedCategoryId) return;
    
    try {
      const response = await axios.post(`${API_URL}/categories/${selectedCategoryId}/subcategories`, {
        name: newSubcategory.trim()
      });
      
      if (response.data.success) {
        setSuccess("Subcategory added successfully");
        setNewSubcategory("");
        fetchSubcategories(selectedCategoryId);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add subcategory");
      console.error(err);
    }
  };

  const handleAddSubSubcategory = async () => {
    if (!newSubSubcategory.trim() || !selectedCategoryId || !selectedSubcategoryId) return;
    
    try {
      const response = await axios.post(
        `${API_URL}/categories/${selectedCategoryId}/subcategories/${selectedSubcategoryId}/subsubcategories`,
        { name: newSubSubcategory.trim() }
      );
      
      if (response.data.success) {
        setSuccess("Sub-subcategory added successfully");
        setNewSubSubcategory("");
        fetchSubSubcategories(selectedCategoryId, selectedSubcategoryId);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add sub-subcategory");
      console.error(err);
    }
  };

  const handleUpdateCategory = async (id, newName) => {
    if (!newName.trim()) return;
    
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, {
        name: newName.trim()
      });
      
      if (response.data.success) {
        setSuccess("Category updated successfully");
        fetchCategories();
        setEditingCategory(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update category");
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`);
      
      if (response.data.success) {
        setSuccess("Category deleted successfully");
        fetchCategories();
        if (selectedCategoryId === id) {
          setSelectedCategory("");
          setSelectedCategoryId(null);
          setSubcategories([]);
          setSubSubcategories([]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete category");
      console.error(err);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    if (!selectedCategoryId) return;
    
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${selectedCategoryId}/subcategories/${subcategoryId}`
      );
      
      if (response.data.success) {
        setSuccess("Subcategory deleted successfully");
        fetchSubcategories(selectedCategoryId);
        if (selectedSubcategoryId === subcategoryId) {
          setSelectedSubcategory("");
          setSelectedSubcategoryId(null);
          setSubSubcategories([]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete subcategory");
      console.error(err);
    }
  };

  const handleDeleteSubSubcategory = async (subSubcategoryId) => {
    if (!selectedCategoryId || !selectedSubcategoryId) return;
    
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${selectedCategoryId}/subcategories/${selectedSubcategoryId}/subsubcategories/${subSubcategoryId}`
      );
      
      if (response.data.success) {
        setSuccess("Sub-subcategory deleted successfully");
        fetchSubSubcategories(selectedCategoryId, selectedSubcategoryId);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete sub-subcategory");
      console.error(err);
    }
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="category-container116"> {/* Updated className */}
      <h2>Manage Categories</h2>
      
      {error && <div className="error-message116">{error}</div>} {/* Updated className */}
      {success && <div className="success-message116">{success}</div>} {/* Updated className */}

      <div className="category-row116"> {/* Updated className */}
        <div className="category-section116"> {/* Updated className */}
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="New Category" 
          />
          <button onClick={handleAddCategory}>Add Category</button>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                {editingCategory === cat.id ? (
                  <input 
                    type="text" 
                    defaultValue={cat.name} 
                    onBlur={(e) => handleUpdateCategory(cat.id, e.target.value)} 
                    autoFocus 
                  />
                ) : (
                  <>
                    {cat.name} 
                    <button onClick={() => setEditingCategory(cat.id)}>✏️</button>
                    <button onClick={() => handleDeleteCategory(cat.id)}>🗑</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="category-section116"> {/* Updated className */}
          <input 
            type="text" 
            value={newSubcategory} 
            onChange={(e) => setNewSubcategory(e.target.value)} 
            placeholder="New Subcategory" 
            disabled={!selectedCategory} 
          />
          <button onClick={handleAddSubcategory} disabled={!selectedCategory}>
            Add Subcategory
          </button>
          <select 
            value={selectedSubcategory} 
            onChange={handleSubcategoryChange} 
            disabled={!subcategories.length}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.name}>{sub.name}</option>
            ))}
          </select>
          <ul>
            {subcategories.map((sub) => (
              <li key={sub.id}>
                {editingSubcategory === sub.id ? (
                  <input 
                    type="text" 
                    defaultValue={sub.name} 
                    // Note: Backend doesn't support updating subcategories yet
                    onBlur={() => setEditingSubcategory(null)} 
                    autoFocus 
                  />
                ) : (
                  <>
                    {sub.name} 
                    <button onClick={() => setEditingSubcategory(sub.id)}>✏️</button>
                    <button onClick={() => handleDeleteSubcategory(sub.id)}>🗑</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="category-section116"> {/* Updated className */}
          <input 
            type="text" 
            value={newSubSubcategory} 
            onChange={(e) => setNewSubSubcategory(e.target.value)} 
            placeholder="New Sub-Subcategory" 
            disabled={!selectedSubcategory} 
          />
          <button onClick={handleAddSubSubcategory} disabled={!selectedSubcategory}>
            Add Sub-Subcategory
          </button>
          <select disabled={!subSubcategories.length}>
            <option value="">Select Sub-Subcategory</option>
            {subSubcategories.map((subsub) => (
              <option key={subsub.id} value={subsub.name}>{subsub.name}</option>
            ))}
          </select>
          <ul>
            {subSubcategories.map((subsub) => (
              <li key={subsub.id}>
                {editingSubSubcategory === subsub.id ? (
                  <input 
                    type="text" 
                    defaultValue={subsub.name} 
                    // Note: Backend doesn't support updating sub-subcategories yet
                    onBlur={() => setEditingSubSubcategory(null)} 
                    autoFocus 
                  />
                ) : (
                  <>
                    {subsub.name} 
                    <button onClick={() => setEditingSubSubcategory(subsub.id)}>✏️</button>
                    <button onClick={() => handleDeleteSubSubcategory(subsub.id)}>🗑</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;