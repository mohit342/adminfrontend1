import { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";

const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    // Fetch total products from API
    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const result = await response.json();
                setTotalProducts(result.data.length); // Assuming result.data is an array of products
            } catch (error) {
                console.error('Error fetching total products:', error);
            }
        };

        fetchTotalProducts();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Button className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            {
                props.grow === true ?
                    <span className="chart"></span>
                    :
                    <span className="chart"></span>
            }

            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white mb-0">Total Products</h4>
                    <span className="text-white">{totalProducts}</span>
                </div>

                <div className="ml-auto">
                    {
                        props.icon ?
                            <span className="icon">
                                {props.icon ? props.icon : ''}
                            </span>
                            :
                            ''
                    }
                </div>
            </div>

            {/* s */}
        </Button>
    );
};

export default DashboardBox;