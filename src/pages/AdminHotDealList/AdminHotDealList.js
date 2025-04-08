import React, { useEffect, useState } from 'react';

const AdminHotDealList = () => {
  const [deals, setDeals] = useState([]);
  const [editDeal, setEditDeal] = useState(null);
  const [image, setImage] = useState(null);

  // Function to fetch deals from the server
  const fetchDeals = () => {
    fetch('http://localhost:5000/api/hotdeals?admin=true')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched deals:', data); // Log for debugging
        setDeals(data);
      })
      .catch(error => console.error('Error fetching deals:', error));
  };

  useEffect(() => {
    fetchDeals(); // Initial fetch on mount
  }, []);

  const handleChange = (e) => {
    setEditDeal({ ...editDeal, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const startEdit = (deal) => {
    setEditDeal({ ...deal });
    setImage(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editDeal.title);
    formData.append('price', editDeal.price);
    formData.append('offer_text', editDeal.offer_text || '');
    formData.append('is_visible', editDeal.is_visible);
    if (image) formData.append('image', image);

    fetch(`http://localhost:5000/api/hotdeals/${editDeal.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchDeals(); // Re-fetch deals after update
        setEditDeal(null);
        setImage(null);
      })
      .catch(error => console.error('Error updating deal:', error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      fetch(`http://localhost:5000/api/hotdeals/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          fetchDeals(); // Re-fetch deals after deletion
        })
        .catch(error => console.error('Error deleting deal:', error));
    }
  };

  const handleVisibilityToggle = async (deal) => {
    const visibleCount = deals.filter(d => d.is_visible).length;
    const willBeVisible = !deal.is_visible;

    if (willBeVisible && visibleCount >= 4) {
      alert('Only 4 deals can be visible on the front page at a time.');
      return;
    }

    const formData = new FormData();
    formData.append('title', deal.title);
    formData.append('price', deal.price.toString().replace(/[^0-9.]/g, ''));
    formData.append('offer_text', deal.offer_text || '');
    formData.append('is_visible', willBeVisible.toString());
    formData.append('image_path', deal.image_path); // Preserve existing image

    try {
      const response = await fetch(`http://localhost:5000/api/hotdeals/${deal.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update visibility');
      }

      const data = await response.json();
      console.log('Update response:', data); // Log the response for debugging

      // Re-fetch deals from the server to ensure sync
      fetchDeals();

      // Trigger refresh for front page
      window.dispatchEvent(new Event('hotDealsRefresh'));
    } catch (error) {
      console.error('Toggle error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Hot Deal List</h1>
      <p>Visible Deals: {deals.filter(d => d.is_visible).length}/4</p>
      {editDeal ? (
        <div>
          <h2>Edit Deal</h2>
          <form onSubmit={handleEditSubmit}>
            <input name="title" value={editDeal.title} onChange={handleChange} placeholder="Title" />
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
            <input name="price" value={editDeal.price} onChange={handleChange} placeholder="Price" />
            <input name="offer_text" value={editDeal.offer_text || ''} onChange={handleChange} placeholder="Offer Text" />
            <label>
              Visible on Front Page:
              <input
                type="checkbox"
                name="is_visible"
                checked={editDeal.is_visible}
                onChange={(e) => setEditDeal({ ...editDeal, is_visible: e.target.checked })}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditDeal(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Offer Text</th>
              <th>Visible on Front Page</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.id}</td>
                <td>{deal.title}</td>
                <td><img src={`http://localhost:5000${deal.image_path}`} alt={deal.title} width="50" /></td>
                <td>₹{deal.price}</td>
                <td>{deal.offer_text || '-'}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={deal.is_visible}
                    onChange={() => handleVisibilityToggle(deal)}
                    disabled={!deal.is_visible && deals.filter(d => d.is_visible).length >= 4}
                  />
                </td>
                <td>
                  <button onClick={() => startEdit(deal)}>Edit</button>
                  <button onClick={() => handleDelete(deal.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHotDealList;