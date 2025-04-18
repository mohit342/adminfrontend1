import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Product updated successfully');
        navigate('/productlist');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('An error occurred while updating the product.');
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>
          Product Name:
          <input name="name" defaultValue={product.name} placeholder="Product Name" required />
        </label>

        <label>
          Slug (optional):
          <input name="slug" defaultValue={product.slug} placeholder="Slug" />
        </label>

        <label>
          Short Description:
          <textarea
            name="shortDescription"
            defaultValue={product.short_description}
            placeholder="Short Description"
            required
          ></textarea>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            defaultValue={product.description}
            placeholder="Description"
          ></textarea>
        </label>

        <label>
          Price:
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            placeholder="Price"
            required
          />
        </label>

        <label>
          Stock Quantity:
          <input
            name="stockQuantity"
            type="number"
            defaultValue={product.stock_quantity}
            placeholder="Stock Quantity"
            required
          />
        </label>

        {/* <fieldset className="readonly-fields">
          <legend>Category Info (Read-Only)</legend>
          <div>Category: {product.category_name || 'N/A'}</div>
          <div>Subcategory: {product.subcategory_name || 'N/A'}</div>
          <div>Sub-Subcategory: {product.sub_subcategory_name || 'N/A'}</div>
        </fieldset> */}

        <label>
          Upload New Images:
          <input type="file" name="images" multiple />
        </label>

        <button type="submit" className="update-btn">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;