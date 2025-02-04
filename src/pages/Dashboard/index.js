import DashboardBox from "./components/dashboardBox";
import DashboardBox1 from "./components/dashboardBox1";
import DashboardBox2 from "./components/dashboardBox2";
import DashboardBox3 from "./components/dashboards3";
import { FaUserCircle } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";
import { useState } from "react";
import Button from '@mui/material/Button';
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts"
import { Height, Title } from "@mui/icons-material";
import { FaShoppingCart } from "react-icons/fa";
import { TbBrandCashapp } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import artsupplies1 from "../../assets/images/artsupplies1.jpg";
import bio1 from "../../assets/images/bio1.jpg";
import ExerciseBook from "../../assets/images/ExerciseBook.jpg";
import plush2 from "../../assets/images/plush2.jpg";
import seating4 from "../../assets/images/seating4.jpg";

export const data = [
    ["sales", " per year"],
    ["2021", 10],
    ["2022", 2],
    ["2023", 2],
    ["2024", 8],
];

export const options = {
    'backgroundColor': 'transparent',
    'chartArea': { 'width': '100%', 'height': '100%' },
};

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const products = [
        {
            id: "P001",
            name: "science kit",
            image: bio1,
            price: "1,827.00",
        },
        {
            id: "P002",
            name: "Arts and supplies",
            image: artsupplies1,
            price: "3,427.00",
        },
        {
            id: "P003",
            name: "Books",
            image: ExerciseBook,
            price: "5,627.00",
        },
        {
            id: "P004",
            name: "toys",
            image: plush2,
            price: "1,527.00",
        },
        {
            id: "P005",
            name: "chair",
            image: seating4,
            price: "2,227.00",
        },
    ];

    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">

                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox1 color={["#c012e2", "#eb64fe"]} icon={<FaShoppingCart />} grow={false} />
                            <DashboardBox2 color={["#2c78e5", "#60aff5"]} icon={<TbBrandCashapp />} grow={false} />
                            <DashboardBox3 color={["#e1950e", "#f3cd29"]} icon={< GiWallet />} grow={true} />

                        </div>

                    </div>
                    <div className="col-md-4 pl-0">
                        <div className="box graphBox">
                            <div className="d-flex align-item-center w-100 bottomEle">
                                <h4 className="text-white mb-0 mt-0">Sales Compresion</h4>
                                <div className="ml-auto">
                                    <Button className="ml-auto toggleIcon " onClick={handleClick}><HiDotsVertical /></Button>

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
                                            <IoIosTimer />Last Day
                                        </MenuItem>
                                        <MenuItem onClick={handleClose} >
                                            <IoIosTimer /> Last week
                                        </MenuItem>
                                        {<MenuItem onClick={handleClose} >
                                            <IoIosTimer /> Last year
                                        </MenuItem>}

                                    </Menu>
                                </div>
                            </div>

                            <h3 className="text-white font-weight-bold">4,56,564 this year</h3>
                            <p>15,45,945 last year</p>

                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height={"78%"}
                            />

                        </div>
                    </div>


                </div>

                {/* <div Classname="conatinerpro12"> */}
                <div className="card shadow border-0 p-3 mt-4">
                    <h3 className="hd">Best Selling Products</h3>
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
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <img src={product.image} alt={product.name} className="product-image" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td className="price">{product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="card shadow border-0 p-3 mt-4">
                        <h3 className="hd">Best Selling Products</h3>
                        </div> */}

                    {/* </div> */}



                </div>
            </div>


        </>
    )

}

export default Dashboard;