import React, { useState, useEffect } from "react";
import "./CategoryList.css";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/categories`);

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("An error occurred while fetching categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="category-list-container115">Loading categories...</div>;
  }

  if (error) {
    return <div className="category-list-container115 error-message115">{error}</div>;
  }

  return (
    <div className="category-list-container115">
      <h2>All Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <ul className="category-list115">
          {categories.map((category) => (
            <li key={category.id} className="category-item115">
              <strong>{category.name}</strong>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="subcategory-list115">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className="subcategory-item115">
                      {subcategory.name}
                      {subcategory.subSubcategories && subcategory.subSubcategories.length > 0 && (
                        <ul className="subsubcategory-list115">
                          {subcategory.subSubcategories.map((subsub) => (
                            <li key={subsub.id} className="subsubcategory-item115">
                              {subsub.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
