import React, { useContext, useState } from 'react';
import { Link, Links } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import logo from "../../assets/images/logo.jpg";
// import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBell } from "react-icons/fa";
// import { CiMail } from "react-icons/ci";
import user from "../../assets/images/user.jpg";
import notification1 from "../../assets/images/notification1.jpg";
import { IoShieldHalfSharp } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiMessageAltError } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { StayPrimaryLandscapeOutlined } from '@mui/icons-material';
import { Carousel } from 'bootstrap';
import men from "../../assets/images/men.jpg";
import { MyContext } from '../../App';


const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
    const openMyAcc = Boolean(anchorEl);
    const openNotifications = Boolean(isOpennotificationDrop);

    const context =useContext(MyContext)

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };
    const handleOpenotificationsDrop = () => {
        setisOpennotificationDrop(true)
    }
    const handleClosenotificationsDrop = () => {
        setisOpennotificationDrop(false)
    }


    return (
        <>
            <header>
                <div className="container-fluid" >
                    <div className="row">
                        {/* {Logo Wrapper} */}
                        <div className="col-sm-2 part1">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>
                        <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                            <Button className="rounded-circle mr-3" 
                            onClick={() => context.setsToggleSidebar(!context.isToggleSidebar)}>
                            {
                                context.isToggleSidebar===false ? <MdOutlineMenuOpen /> : <MdOutlineMenu />

                            }
                            </Button>
                            {/* <SearchBox /> */}
                        </div>

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                            <Button className="rounded-circle mr-3"><CiLight /></Button>
                            {/* <Button className="rounded-circle mr-3"><CiMail /></Button> */}
                            <div className='dropdownWrapper position-relative'>
                               <Link to="/notification"> <Button className="rounded-circle mr-3" onClick={handleOpenotificationsDrop}><FaBell /></Button></Link>
                                {/* <Menu
                                    anchorEl={isOpennotificationDrop}
                                    className='notifications'
                                    id="notifications"
                                    open={openNotifications}
                                    onClose={handleClosenotificationsDrop}
                                    onClick={handleClosenotificationsDrop}

                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className='head pl-3 pb-0'>
                                        <h6>Order (12)</h6></div>

                                    <Divider className='mb-3' />
                                    <div className="scroll">
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={men} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Mohit </b>
                                                            added to his favorite list
                                                            <b> leather belt steve madden</b>

                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>20 seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Preana</b>
                                                            added to his favorite list
                                                            <b>  leather belt steve madden</b>

                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>1 min  ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className='d-flex '>
                                                <div> <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={user} alt="User Image" /></span>
                                                </div>
                                                </div>
                                                <div className='dropdownInfo' >
                                                    <h4>
                                                        <span>
                                                            <b>Tinku</b>
                                                            added to his favorite list
                                                            <b>     leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className='text-sky mb-0'>few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                    </div>

                                </Menu> */}
                            </div>
                            <div className="myAccWrapper">
                                <Button className="myAcc d-flex align-items-center"
                                    onClick={handleOpenMyAccDrop}>
                                    <div className="userImg">
                                        <span className="rounded-circle"><img src={user} alt="User Image" /></span>


                                    </div>

                                    <div className="userInfo">
                                        <h4>Mohit khoth</h4>
                                        <p className=" mb-0">@mohit</p>
                                    </div>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={openMyAcc}
                                    onClose={handleCloseMyAccDrop}
                                    onClick={handleCloseMyAccDrop}

                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >

                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        My Account
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <IoShieldHalfSharp />
                                        </ListItemIcon>
                                        Reset password
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <Logout fontSize="small " />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;