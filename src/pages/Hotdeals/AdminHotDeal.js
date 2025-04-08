import React, { useState, useEffect } from 'react';

const AdminHotDeal = () => {
  const [deal, setDeal] = useState({ id: '', title: '', price: '', offer_text: '', is_visible: false, subcategory_id: '' });
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => {
        const allSubcategories = data.data.flatMap(category => 
          category.subcategories.map(sub => ({
            id: sub.id,
            name: sub.name,
            categoryId: category.id,
            categoryName: category.name
          }))
        );
        setSubcategories(allSubcategories);
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'title') {
      const selectedSubcategory = subcategories.find(sub => sub.name === value);
      setDeal({ 
        ...deal, 
        title: value, 
        subcategory_id: selectedSubcategory ? selectedSubcategory.id : deal.subcategory_id 
      });
    } else {
      setDeal({ ...deal, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', deal.title);
    formData.append('price', deal.price);
    formData.append('offer_text', deal.offer_text);
    formData.append('is_visible', deal.is_visible);
    formData.append('subcategory_id', deal.subcategory_id); // Add this
    if (image) formData.append('image', image);

    const url = deal.id ? `http://localhost:5000/api/hotdeals/${deal.id}` : 'http://localhost:5000/api/hotdeals';
    const method = deal.id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setDeal({ id: '', title: '', price: '', offer_text: '', is_visible: false, subcategory_id: '' });
        setImage(null);
      })
      .catch(error => console.error('Error submitting deal:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="id" 
        placeholder="Deal ID (leave blank for new)" 
        value={deal.id} 
        onChange={handleChange} 
      />
      <select
        name="title"
        value={deal.title}
        onChange={handleChange}
      >
        <option value="">Select a subcategory</option>
        {subcategories.map(subcategory => (
          <option 
            key={subcategory.id} 
            value={subcategory.name}
          >
            {`${subcategory.categoryName} > ${subcategory.name}`}
          </option>
        ))}
      </select>
      <input 
        type="file" 
        name="image" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      <input 
        name="price" 
        placeholder="Price" 
        value={deal.price} 
        onChange={handleChange} 
      />
      <input 
        name="offer_text" 
        placeholder="Offer Text" 
        value={deal.offer_text} 
        onChange={handleChange} 
      />
      <label>
        Visible on Front Page:
        <input
          type="checkbox"
          name="is_visible"
          checked={deal.is_visible}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit Deal</button>
    </form>
  );
};

export default AdminHotDeal;