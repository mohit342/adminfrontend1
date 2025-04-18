import { useState, useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from 'react-icons/io';

const DashboardBox = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  // Fetch order data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setTotalOrders(data.length); // Store the count of orders
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
      }}
    >
      {props.grow === true ? (
        <span className="chart">
          {/* <TrendingUpIcon /> */}
        </span>
      ) : (
        <span className="chart">
          {/* <TrendingDownIcon /> */}
        </span>
      )}

      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">Total Orders</h4>
          {loading ? (
            <span className="text-white">Loading...</span>
          ) : error ? (
            <span className="text-white">Error</span>
          ) : (
            <span className="text-white">{totalOrders}</span>
          )}
        </div>

        <div className="ml-auto">
          {props.icon ? <span className="icon">{props.icon}</span> : ''}
        </div>
      </div>

      {/* <div className="d-flex align-item-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last Month</h6>
        <div className="ml-auto">
          <Button className="ml-auto toggleIcon" onClick={handleClick}>
            <HiDotsVertical />
          </Button>

          <Menu
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
          </Menu>
        </div>
      </div> */}
    </Button>
  );
};

export default DashboardBox;