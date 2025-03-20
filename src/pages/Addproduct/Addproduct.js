import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import './Addproduct.css';

const Addproduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: '',
    discountPercentage: '',

    stockQuantity: '',
    categoryId: '',
    subcategoryId: '',
    subSubcategoryId: '',
    selectedAttributes: [],
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchAttributes();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      setError('Error fetching categories: ' + error.message);
      console.error('Error details:', error);
    }
  };
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleNameChange = (e) => {
    const productName = e.target.value;
    setFormData({
      ...formData,
      name: productName,
      slug: generateSlug(productName)
    });
  };


  const fetchAttributes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attributes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setAttributes(data.data);
      } else {
        setError('Failed to fetch attributes');
      }
    } catch (error) {
      setError('Error fetching attributes: ' + error.message);
      console.error('Error details:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find(c => c.id === parseInt(categoryId));
    setFormData({
      ...formData,
      categoryId,
      subcategoryId: '',
      subSubcategoryId: ''
    });
    setSubcategories(category ? category.subcategories : []);
    setSubSubcategories([]);
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    const subcategory = subcategories.find(s => s.id === parseInt(subcategoryId));
    setFormData({
      ...formData,
      subcategoryId,
      subSubcategoryId: ''
    });
    setSubSubcategories(subcategory ? subcategory.subSubcategories : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            formDataToSend.append('images', image);
          });
        } else if (key === 'selectedAttributes') {
          formDataToSend.append('selectedAttributes', JSON.stringify(formData.selectedAttributes || []));
        } else {
          formDataToSend.append(key, formData[key] || '');
        }
      });

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Product added successfully!');
        setFormData({
          name: '',
          slug: '',
          shortDescription: '',
          description: '',
          price: '',
          stockQuantity: '',
          categoryId: '',
          subcategoryId: '',
          subSubcategoryId: '',
          selectedAttributes: [],
          images: []
        });
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (error) {
      setError('Error adding product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  return (
    <div className="add-product-container">
      <h1 className="page-title">Add New Product</h1>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Slug</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="form-input"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Discount Percentage (%)</label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                className="form-input"
                min="0"
                max="100"
                step="0.01"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                className="form-input"
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.categoryId}
                onChange={handleCategoryChange}
                className="form-select"
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
              <label className="form-label">Subcategory</label>
              <select
                value={formData.subcategoryId}
                onChange={handleSubcategoryChange}
                className="form-select"
                disabled={!formData.categoryId}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label className="form-label">Sub-subcategory</label>
              <select
                value={formData.subSubcategoryId}
                onChange={(e) => setFormData({ ...formData, subSubcategoryId: e.target.value })}
                className="form-select"
                disabled={!formData.subcategoryId}
              >
                <option value="">Select Sub-subcategory</option>
                {subSubcategories.map(subSubcategory => (
                  <option key={subSubcategory.id} value={subSubcategory.id}>
                    {subSubcategory.name}
                  </option>
                ))}
              </select>
            </div>
            {/* 
            {<div className="form-group">
              <label className="form-label">Attributes</label>
              <select
                multiple
                value={formData.selectedAttributes}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFormData({ ...formData, selectedAttributes: selectedOptions });
                }}
                className="form-select"
              >
                {attributes.map((attr) => (
                  <option key={attr.id} value={attr.value}>
                    {attr.category} - {attr.value}
                  </option>
                ))}
              </select>
            </div> } */}


          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Short Description</label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="form-textarea"
            rows="2"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Full Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Images</label>
          <div className="image-upload-container">
            <div className="upload-area">
              <label className="upload-icon">
                <Upload size={32} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="image-grid">
              {formData.images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...formData.images];
                      newImages.splice(index, 1);
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default Addproduct;