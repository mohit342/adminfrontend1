import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [image, setImage] = useState(null);
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        fetchMainCategories();
        fetchFeaturedItems();
    }, []);

    const fetchMainCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching main categories:', error);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/categories/${categoryId}/subcategories`
            );
            setSubcategories(response.data.data || []);
            setSelectedSubcategory('');
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            setSubcategories([]);
        }
    };

    const fetchFeaturedItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories1');
            setFeaturedItems(response.data);
        } catch (error) {
            console.error('Error fetching featured items:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        if (categoryId) {
            fetchSubcategories(categoryId);
        } else {
            setSubcategories([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!selectedCategory || !selectedSubcategory || !image) {
          alert("Select category, subcategory, and upload image");
          return;
        }
      
        const formData = new FormData();
        formData.append("categoryId", selectedCategory);
        formData.append("subcategoryId", selectedSubcategory);
        formData.append("image", image);
      
        try {
          await axios.post("http://localhost:5000/api/categories1", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          // Reset form and refresh data
          setSelectedCategory("");
          setSelectedSubcategory("");
          setImage(null);
        } catch (error) {
          alert(error.response?.data?.error || "Failed to save");
        }
      };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories1/${id}`);
            fetchFeaturedItems();
        } catch (error) {
            console.error('Error deleting featured item:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Manage Featured Categories</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Main Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Subcategory:</label>
                    <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        required
                        disabled={!selectedCategory}
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map(sub => (
                            <option key={sub.id} value={sub.id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/jpeg,image/png,image/gif"
                        required
                    />
                </div>

                <button type="submit">Add Featured Category</button>
            </form>

            <div className="featured-list">
                <h2>Currently Featured</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {featuredItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image_path && (
                                        <img 
                                            src={`http://localhost:5000/${item.image_path}`} 
                                            alt={item.name} 
                                            style={{ width: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedCategories;