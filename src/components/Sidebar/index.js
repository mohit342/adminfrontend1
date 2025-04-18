import Button from '@mui/material/Button';
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IoSettings } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { MdWarehouse } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";
import { GrProductHunt } from "react-icons/gr";
import { MyContext } from '../../App';
import { AuthContext } from '../../context/AuthContext'; // login



const Sidebar = () => {
    const { AdminLogout } = useContext(AuthContext);  //login
    const [activeTab, setActiveTab ] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu ] = useState(false);
    const [activeCouponSubmenu, setActiveCouponSubmenu] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }
    const toggleCouponSubmenu = () => {
        setActiveCouponSubmenu(prev => !prev);
    };

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">
                            <Button className={`w-100 ${activeTab === 0 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                                <span className='icon'><BiSolidDashboard /></span>
                                Dashboard
                                {/* <span className='arrow'><IoIosArrowForward /></span> */}
                            </Button>
                        </Link>

                    </li>
                    <li>

                        <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                            <span className='icon'><GrProductHunt /></span>
                            product
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/addproduct">Add product</Link></li>
                                <li><Link to="/productlist">Product List</Link></li>
                                <li><Link to="/Hotdeals">Hot deals</Link></li>
                                <li><Link to="/AdminHotDealList">AdminHotDealList</Link></li>
                                <li><Link to="/FeaturedCategories">Featured Categories</Link></li>
                                <li><Link to="/TopTrendingAdmin">TopTrending Admin</Link></li>
                                <li><Link to="/AdminReviews">Review data</Link></li>




                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                            <span className='icon'><FaLayerGroup /></span>
                            Category
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/add-category">Add Category</Link></li>
                                <li><Link to="/category-list">Category List</Link></li>


                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 3 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(3)}>
                            <span className='icon'><HiCube /></span>
                            Attributes
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/attributepage">Attributes</Link></li>
                                <li><Link to="/addattribute">Add Attributes</Link></li>


                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 4 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(4)}>
                            <span className='icon'><MdShoppingCart /></span>
                            order
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/OrderPages">View/Manage all order</Link></li>
                                <li><Link to="/BulkPage">Bulk  order</Link></li>
                                <li><Link to="/Enquirypage">Enquiry page</Link></li>
                                <li><Link to="/invoice">Invoice & billing</Link></li>
                                <li><Link to="/return">Return and refund</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li>
                    <Button 
                        className={`w-100 ${activeTab === 5 && isToggleSubmenu ? 'active' : ''}`} 
                        onClick={() => isOpenSubmenu(5)}
                    >
                        <span className='icon'><GiMoneyStack /></span>
                        Coupons & Rewards
                        <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab===5 && isToggleSubmenu===true  ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/totalcoupons">Total Coupons</Link></li>
                                <li><Link to="#">Manage Rewards for School</Link></li>
                                <li><Link to="/CouponsAll">Create coupons for everyone</Link></li>
                                <li><Link to="/">everyone coupons </Link></li>
                            </ul>
                        </div>
                </li>
            
                    <li>
                        <Button className={`w-100 ${activeTab === 6 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(6)}>
                            <span className='icon'><FaUser /></span>
                            User Role
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 6 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/Alluser">All User</Link></li>


                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/PaymentTransactions"> <Button className={`w-100 ${activeTab === 7 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(7)}>
                            <span className='icon'><GiWallet /></span>
                            Payment Transaction
                            {/* <span className='arrow'><IoIosArrowForward /></span> */}
                        </Button></Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 8 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(8)}>
                            <span className='icon'><MdLocalShipping /></span>
                            Shipping & logistics
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 8 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="#">Shipping integration</Link></li>
                                <li><Link to="#">Set shipping rates</Link></li>
                                <li><Link to="#">Order tracking & status update</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 9 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(9)}>
                            <span className='icon'><FaUsers /></span>
                            customer Management
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 9 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/customerprofile">Customer profile & order history</Link></li>
                                <li><Link to="#">Handle customer support & inquiries</Link></li>
                                <li><Link to="#">Managed review & feedback</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 10 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(10)}>
                            <span className='icon'><TbReport /></span>
                            analytics & reports
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 10 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/salesreports">Sales & Revenue Reports</Link></li>
                                <li><Link to="/bestselling">Best selling products</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 11 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(11)}>
                            <span className='icon'><MdWarehouse /></span>
                            Stocks
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 11 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/totalstocks">Total Stocks</Link></li>
                                <li><Link to="#">Low Stocks</Link></li>

                            </ul>
                        </div>
                    </li>

                   
                    {/* <li>
                        <Link to="/setting"><Button className={`w-100 ${activeTab === 13 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(13)}>
                            <span className='icon'><IoSettings /></span>
                            Settings
                            <span className='arrow'><IoIosArrowForward /></span>
                        </Button></Link>
                    </li> */}


                </ul>
                <div className='logoutWrapper'>
                    <div className='logoutBox'>
                        <Button variant="contained" onClick={AdminLogout}><MdOutlineLogout />Logout</Button>


                    </div>
                </div>



            </div>

        </>
    )
}
export default Sidebar;