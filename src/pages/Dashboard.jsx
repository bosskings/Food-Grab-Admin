import { Route, Routes } from 'react-router-dom'

import "../components/Dashboard/Dashboard.css"
import Home from "../pages/Home"
import Users from "../pages/Users"
import Merchants from "../pages/Merchants"
import Sidebar from '../components/common/Sidebar'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

const Dashboard = () => {
    const [removeMenu, setShowMenu] = useState('sidebar__close')
    const { getTotals, getUsers, getMerchants, getUnApprovedMerchants } = useContext(AuthContext)

    const toggleRemoveMenu = () => {
        setShowMenu((curr) => (curr === "sidebar" ? "sidebar__close" : "sidebar"));
    };

    useEffect(() => {
        getTotals();
        getUsers();
        getMerchants();
        getUnApprovedMerchants();
    }, []);

    return (
        <div className='dashboard'>
            <Sidebar removeMenu={removeMenu} toggleRemoveMenu={toggleRemoveMenu} />
            <Routes>
                <Route path='' element={<Home toggleShowMenu={toggleRemoveMenu} />} />
                <Route path='users' element={<Users toggleShowMenu={toggleRemoveMenu} />} />
                <Route path='merchants' element={<Merchants toggleShowMenu={toggleRemoveMenu} />} />
            </Routes>
        </div>
    )
}

export default Dashboard