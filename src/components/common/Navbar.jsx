import { IoNotifications } from "react-icons/io5";
import { HiMiniUser } from "react-icons/hi2";
import { BsMenuAppFill } from "react-icons/bs";

import "./Navbar.css"

const Navbar = ({ toggleShowMenu }) => {
    return (
        <div className='navbar'>
            <div className="navbar__close">
                <BsMenuAppFill onClick={toggleShowMenu} />
            </div>
            <div className="navbar__right">
                <div className='navbar__design' />
                <div className="navbar__notification-container">
                    <IoNotifications />
                    <div className="navbar__notification-box">4</div>
                </div>
                <div className="navbar__user">
                    <HiMiniUser />
                </div>
            </div>
        </div>
    )
}

export default Navbar