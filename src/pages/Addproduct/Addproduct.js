import React, { useState,useEffect } from 'react';
import "./Addproduct.css"
const Addproduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        images: [],
        stock: ''
      });
    
      const [previewUrls, setPreviewUrls] = useState([]);
      const [errors, setErrors] = useState({});
      const [successMessage, setSuccessMessage] = useState('');
    
      const categories = {
        'Academic Materials': ['Textbooks & Workbooks', 'Reference Books', 'Educational software & Apps'],
        'School Supplies ': ['Stationery', 'Classroom Supplies'],
        'Learning & Teaching Aids': ['Maniplative'],
        'Toys & games': ['educational Toys', 'toy & games'],
        'Play School Supplies ': ['Furniture', 'Learning Materials']
      };
    
      useEffect(() => {
        return () => {
          // Clean up object URLs
          previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
      }, [previewUrls]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
          ...prev,
          [name]: value,
          ...(name === 'category' && { subcategory: '' }) // Reset subcategory when category changes
        }));
      };
    
      const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        
        setProductData(prev => ({
          ...prev,
          images: [...prev.images, ...files]
        }));
        
        setPreviewUrls(prev => [...prev, ...urls]);
      };
    
      const removeImage = (index) => {
        const newImages = [...productData.images];
        const newUrls = [...previewUrls];
        
        newImages.splice(index, 1);
        newUrls.splice(index, 1);
        
        setProductData(prev => ({ ...prev, images: newImages }));
        setPreviewUrls(newUrls);
      };
    
      const validateForm = () => {
        const newErrors = {};
        if (!productData.name.trim()) newErrors.name = 'Product name is required';
        if (!productData.description.trim()) newErrors.description = 'Description is required';
        if (!productData.price || isNaN(productData.price)) newErrors.price = 'Valid price is required';
        if (!productData.category) newErrors.category = 'Category is required';
        if (productData.category && !productData.subcategory) newErrors.subcategory = 'Subcategory is required';
        if (productData.images.length === 0) newErrors.images = 'At least one image is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          try {
            console.log('Product data:', productData);
            setSuccessMessage('Product added successfully!');
            setProductData({
              name: '',
              description: '',
              price: '',
              category: '',
              subcategory: '',
              images: [],
              stock: ''
            });
            setPreviewUrls([]);
          } catch (error) {
            console.error('Error adding product:', error);
            setErrors({ submit: 'Failed to add product. Please try again.' });
          }
        }
      };
    
      return (
        <div className="add-product-container">
          <h2 className="add-product-title">Add New Product</h2>
          <form onSubmit={handleSubmit} className="add-product-form">
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
    
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group half-width">
            <label className="form-label">Price</label>
            <input
              type="number"
              className={`form-input ${errors.price ? 'input-error' : ''}`}
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              step="0.01"
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>
    
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className={`form-input ${errors.description ? 'input-error' : ''}`}
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                rows="4"
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
    
            <div className="form-row">
          <div className="form-group half-width">
            <label className="form-label">Category</label>
            <select
              className={`form-select ${errors.category ? 'input-error' : ''}`}
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          <div className="form-group half-width">
            <label className="form-label">Subcategory</label>
            <select
              className={`form-select ${errors.subcategory ? 'input-error' : ''}`}
              name="subcategory"
              value={productData.subcategory}
              onChange={handleInputChange}
              disabled={!productData.category}
            >
              <option value="">Select Subcategory</option>
              {productData.category && categories[productData.category].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            {errors.subcategory && <span className="error-text">{errors.subcategory}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Product Images</label>
          <div className="image-upload-container">
            <label className="file-input-label">
              <input
                type="file"
                className="file-input"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
              />
              <span className="upload-button">+ Upload Images</span>
            </label>
            
            <div className="image-previews">
              {previewUrls.map((url, index) => (
                <div key={url} className="image-preview">
                  <img src={url} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    className="delete-image-button"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {errors.images && <span className="error-text">{errors.images}</span>}
        </div>
    
            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-input"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
              />
            </div>
    
            <button type="submit" className="submit-button">
              Add Product
            </button>
          </form>
        </div>
      );
}

export default Addproduct
