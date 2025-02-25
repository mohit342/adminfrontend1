import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css"; // Custom styles
import trust from "../../assets/images/bio1.jpg"
import secure from "../../assets/images/bio1.jpg"
import customer from "../../assets/images/bio1.jpg";
import support from "../../assets/images/bio1.jpg";
import { MdNavigateNext, MdNavigateBefore, MdClose } from "react-icons/md";
// import Footer from "../../components/Footer/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index); // Just change the main image
    // No need to open the modal here
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const images = response.data.data.images;
        setProduct(response.data.data);
        if (images.length > 0) setSelectedImageIndex(0);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (loading) return <div className="loading100">Loading...</div>;

  if (!product) return <div className="error100">Product not found</div>;

  return (
    <>
     <div className="product-detail-container100">
  <div className="image-section100">
  <div className="main-image-container100" onClick={() => openModal(selectedImageIndex)}>
            {product.images[selectedImageIndex] ? (
              <img
                src={`http://localhost:5000/${product.images[selectedImageIndex]}`}
                alt={product.name}
                className="main-image100"
              />
            ) : (
              <div className="no-image100">No Image Available</div>
            )}
          </div>
    <div className="thumbnail-container100">
      {product.images.slice(0, 5).map((img, index) => (
        <img
          key={index}
          src={`http://localhost:5000/${img}`}
          alt={`Thumbnail ${index + 1}`}
          className={`thumbnail100 ${selectedImageIndex === index ? "active" : ""}`}
                onClick={() =>handleThumbnailClick(index) }
        />
      ))}
    </div>
  </div>

  <div className="product-info100">
    <h1 className="product-name100">{product.name}</h1>
    <p className="product-price100"><b>Price:</b> Rs.{product.price}</p>
    <p className="product-short-description100">{product.short_description || "N/A"}</p>
    <div className="quantity-container100">
      <label><b>Quantity:</b></label>
      <div className="quantity-selector100">
        <button onClick={decreaseQuantity} className="qty-btn100">−</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} className="qty-btn100">+</button>
      </div>
    </div>
    <button className="add-to-cart100">Add to Cart</button>
    <button className="buy-now100">Buy It Now</button>
  </div>
</div>

  
  

    {/* Full-Screen Modal */}
    {isModalOpen && (
        <div className="modal-overlay100" onClick={closeModal}>
          <button className="close-btn100" onClick={closeModal}><MdClose size={30} /></button>
          <button className="nav-btn100 prev-btn100" onClick={prevImage}><MdNavigateNext size={50} /></button>
          <img
            src={`http://localhost:5000/${product.images[selectedImageIndex]}`}
            alt={`Enlarged ${selectedImageIndex + 1}`}
            className="enlarged-image100"
          />
          <button className="nav-btn100 next-btn100" onClick={nextImage}><MdNavigateBefore size={50} /></button>
        </div>
      )}
    
    


    {/* Below Both Sections: Long Description */}
    <div className="product-description100">
      <h2>Description</h2>
      <p>{product.description || "No description available."}</p>
    </div>
     <div className="detail">
               <div className="detailCard">
                  <img src={trust} alt="trusted"  />
                  <h5>Trusted platform</h5>
                  <p>Provide security capabilites</p>
               </div>
               <div className="detailCard">
                  <img src={secure} alt="trusted"  />
                  <h5>Secure Payment</h5>
                  <p>We ensure secure payment</p>
               </div>
               <div className="detailCard">
               <img src={customer} alt="trusted"  />
                  <h5>Become a Mittsure customer</h5>
                  <p>It's intuitive,and it helps you leverage<br/> 
                  every money you spend</p>
               </div>
               <div className="detailCard">
                   <img src={support} alt="trusted"  />
                  <h5>Customer Support </h5>
                  <p>Call or email us 24/7</p>
               </div>
          </div>
    {/* <Footer/> */}
    
    </>
   
  );
  
};

export default ProductDetail;