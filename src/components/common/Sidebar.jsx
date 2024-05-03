import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";


import "./Sidebar.css"
import sidebarLogo from "../../assets/logo.png"
import adminProfile from "../../assets/admin.png"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Sidebar = ({ toggleRemoveMenu, removeMenu }) => {
    const { logoutUser } = useContext(AuthContext)
    return (
        <div className={`sidebar ${removeMenu}`} >
            <div className='sidebar__container'>
                <div className='sidebar__logo'>
                    <img src={sidebarLogo} alt="Logo" width={120} />
                    <IoCloseCircleOutline onClick={toggleRemoveMenu} />
                </div>
                <div className='sidebar__items'>
                    <div className="sidebar__links">
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <GrHomeRounded />
                            <span>
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink
                            to="users"
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <FaRegUser />
                            <span>
                                Users
                            </span>
                        </NavLink>
                        <NavLink
                            to="merchants"
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <MdFoodBank />
                            <span>
                                Merchants
                            </span>
                        </NavLink>
                    </div>

                    <div className="profile">
                        <div className="profile__content">
                            <div className="profile__img">
                                <img src={adminProfile} alt="" />
                                <div>
                                    <FaCheck />
                                </div>
                            </div>
                            <div className="profile__title">
                                <p>Administrator</p>
                                <span>@admin</span>
                            </div>
                        </div>

                        <FiLogOut className="logout" onClick={logoutUser} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sidebar