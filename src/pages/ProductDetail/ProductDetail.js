import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw, Package } from 'lucide-react';
import "./ProductDetail.css"

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(0);
  
    const product = {
      name: "Textbooks & Workbooks",
      category: "Academic Materials",
      price:  49,
      description: "A high school biology textbook paired with a workbook for diagram labeling and quizzes, or a math textbook accompanied by a workbook with problem-solving exercises.",
      sizes: ['S', 'M', 'L', 'XL'],
      images: [
        "https://bobbooks.com/wp-content/uploads/2024/02/Workbook-Bundle.jpg",
        "https://bobbooks.com/wp-content/uploads/2024/02/S1BRW-p9-wbg-1.jpg",
        "https://bobbooks.com/wp-content/uploads/2024/02/beginning_readers_workbook_image_7-1.jpg",
        "https://bobbooks.com/wp-content/uploads/2024/02/Emerging-Readers-Workbook-Image-7-1.jpg"
      ],
      features: [
        { icon: <Truck size={20} />, text: "Free shipping " },
        { icon: <RefreshCw size={20} />, text: "30-day returns" },
        { icon: <Package size={20} />, text: "Secure packaging" }
      ]
    };
  
  return (
    <>
    <div className="product-container15">
    <div className="product-grid15">
      <div className="image-gallery15">
        <img 
          src={product.images[mainImage]} 
          alt={product.name} 
          className="main-image15"
        />
        <div className="thumbnail-container15">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className={`thumbnail15 ${mainImage === index ? 'active15' : ''}`}
              onClick={() => setMainImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info15">
        <div className="product-category15">{product.category}</div>
        <h1 className="product-title15">{product.name}</h1>
        <div className="product-price15">{product.price}</div>
        <p className="product-description15">{product.description}</p>

        <div className="quantity-selector15">
          <button 
            className="quantity-button15"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={20} />
          </button>
          <span className="quantity-display15">{quantity}</span>
          <button 
            className="quantity-button15"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={20} />
          </button>
        </div>

        <button className="add-to-cart15">
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <div className="features-list15">
          {product.features.map((feature, index) => (
            <div key={index} className="feature-item15">
              {feature.icon}
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default ProductDetail
