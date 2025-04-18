import React, { useState, useEffect } from 'react';
import DashboardBox from './components/dashboardBox';
import DashboardBox1 from './components/dashboardBox1';
import DashboardBox2 from './components/dashboardBox2';
import DashboardBox3 from './components/dashboards3';
import { FaProductHunt, FaUserCircle } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from 'react-icons/io';
import Button from '@mui/material/Button';
import { HiDotsVertical } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { TbBrandCashapp } from 'react-icons/tb';
import { GiWallet } from 'react-icons/gi';
import artsupplies1 from '../../assets/images/artsupplies1.jpg';
import bio1 from '../../assets/images/bio1.jpg';
import ExerciseBook from '../../assets/images/ExerciseBook.jpg';
import plush2 from '../../assets/images/plush2.jpg';
import seating4 from '../../assets/images/seating4.jpg';
import axios from 'axios';
import './Dashboard.css'; // Ensure this CSS file exists with the styles below

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hotDeals, setHotDeals] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [stockSummary, setStockSummary] = useState({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  // Fetch hot deals, featured categories, and stock data
  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotdeals');
        if (!response.ok) throw new Error('Failed to fetch hot deals');
        const data = await response.json();
        const visibleDeals = data.filter((deal) => deal.is_visible);
        setHotDeals(visibleDeals);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchFeaturedCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories1');
        setFeaturedCategories(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchStockData = async () => {
      try {
        const productsResponse = await fetch('http://localhost:5000/api/products');
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
        }
        const productsData = await productsResponse.json();

        if (!productsData || !Array.isArray(productsData.data)) {
          throw new Error('Invalid products data format');
        }

        const ordersResponse = await fetch('http://localhost:5000/api/orders');
        if (!ordersResponse.ok) {
          throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`);
        }
        const ordersData = await ordersResponse.json();

        const orders = Array.isArray(ordersData.data) ? ordersData.data : [];
        const globalLowStockLevel = 10; // Default low stock level

        const processedStock = productsData.data.map((product) => {
          const soldQuantity = orders
            .filter((order) => order.product_id === product.id)
            .reduce((sum, order) => sum + (order.quantity || 0), 0);

          const currentStock = (product.stock_quantity || 0) - soldQuantity;
          const lowStockLevel = product.low_stock_level || globalLowStockLevel;

          let status = 'In Stock';
          if (currentStock === 0) {
            status = 'Out of Stock';
          } else if (currentStock <= lowStockLevel) {
            status = 'Low Stock';
          }

          return {
            id: product.id,
            currentStock,
            status,
          };
        });

        // Calculate summary
        const inStock = processedStock.filter((item) => item.status === 'In Stock').length;
        const lowStock = processedStock.filter((item) => item.status === 'Low Stock').length;
        const outOfStock = processedStock.filter((item) => item.status === 'Out of Stock').length;

        setStockSummary({
          inStock,
          lowStock,
          outOfStock,
        });
      } catch (err) {
        setError(`Failed to load stock data: ${err.message}`);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchHotDeals(), fetchFeaturedCategories(), fetchStockData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={['#1da256', '#48d483']}
                icon={<TbBrandCashapp />}
                grow={true}
              />
              <DashboardBox1
                color={['#c012e2', '#eb64fe']}
                icon={<FaProductHunt/>}
                grow={false}
              />
              <DashboardBox2
                color={['#2c78e5', '#60aff5']}
                icon={<FaShoppingCart />}
                grow={false}
              />
              <DashboardBox3
                color={['#e1950e', '#f3cd29']}
                icon={<FaUserCircle  />}
                grow={true}
              />
            </div>
          </div>
          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align-item-center w-100 bottomEle">
                <h4 className="text-white mb-0 mt-0">Stock Summary</h4>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>
                  {/* <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu> */}
                </div>
              </div>
              {loading ? (
                <div className="loading">Loading stock data...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : (
                <div className="stock-summary-cards">
                  <div className="summary-card in-stock">
                    <h3>In Stock</h3>
                    <p>{stockSummary.inStock}</p>
                  </div>
                  <div className="summary-card low-stock">
                    <h3>Low Stock</h3>
                    <p>{stockSummary.lowStock}</p>
                  </div>
                  <div className="summary-card out-of-stock">
                    <h3>Out of Stock</h3>
                    <p>{stockSummary.outOfStock}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboardTablesWrapper">
          <div className="card">
            <h3 className="hd">Hot deals</h3>
            <div className="table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4">Error: {error}</td>
                    </tr>
                  ) : hotDeals.length > 0 ? (
                    hotDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td>{deal.id}</td>
                        <td>
                          <img
                            src={`http://localhost:5000${deal.image_path}`}
                            alt={deal.title}
                            className="product-image"
                          />
                        </td>
                        <td>{deal.title}</td>
                        <td className="price">₹{deal.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No visible hot deals found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="container1">
            <h3 className="hd1">Featured Categories</h3>
            <div className="table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Category Name</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="2">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="2">Error: {error}</td>
                    </tr>
                  ) : featuredCategories.length > 0 ? (
                    featuredCategories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <img
                            src={`http://localhost:5000/${category.image_path}`}
                            alt={category.name}
                            className="product-image"
                          />
                        </td>
                        <td>{category.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No featured categories found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;