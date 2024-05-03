import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import DataTable from 'react-data-table-component';
import { Checkbox } from '@mui/material';
import { PiTrashSimpleBold } from "react-icons/pi";
import Switch from '@mui/material/Switch';
import { RiCircleFill } from "react-icons/ri";


import Navbar from '../components/common/Navbar'
import AuthContext from '../context/AuthContext';

const Users = ({ toggleShowMenu }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [switchStatus, setSwitchStatus] = useState({});

    const { allUsers, authTokens, getUsers } = useContext(AuthContext)

    useEffect(() => {
        const storedSwitchStatus = JSON.parse(localStorage.getItem('UserSwitchStatus')) || {};
        setSwitchStatus(storedSwitchStatus);
    }, []);

    useEffect(() => {
        getUsers();
    }, [allUsers]);

    const customColumns = [
        {
            name: 'Merchant',
            selector: "User",
            cell: row => (
                <div className='table__merchants'>
                    <img src={row.pictureAddress} alt="Profile" width={70} />
                    <div>
                        <p>{row.fullname}</p>
                        <span>{row.fullname}</span>
                    </div>
                </div>
            ),
            center: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            style: {
                color: "#000",
                fontFamily: "Sherika, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                width: "350px"
            },
            center: true
        },
        {
            name: 'Status',
            selector: "Status",
            cell: row => (
                <div className='status__state'>
                    <p>{row.isSuspended}</p>
                    {row.isSuspended === "true" ? <RiCircleFill className='status__active' /> : <RiCircleFill className='status__deactive' />}
                </div>
            ),
            style: {
                color: "#000",
                fontFamily: "Sherika, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                textTransform: "capitalize",
                width: "250px"
            },
            center: true
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className='table__user__action-btns'>
                    <Switch
                        size="small"
                        checked={switchStatus[row._id] || false}
                        onChange={(e) => handleSwitchChange(e, row._id)}
                    />
                    <PiTrashSimpleBold className='trash' />
                </div>
            ),
            button: true,
            width: '250px',
            center: true
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '65px',
                border: "none",
                backgroundColor: "#f9fafb"
            },
        },
        headCells: {
            style: {
                minHeight: '65px',
                fontSize: '13px',
                backgroundColor: "#d4d4d4",
                color: "#383838"
            },
        },
        cells: {
            borderBottomStyle: "none",
            borderBottomWidth: "0px"
        },
        pagination: {
            style: {
                backgroundColor: "#f9fafb"
            }
        },
        head: {
            style: {
                borderRadius: "10px"
            }
        }
    };

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows)
    };

    const handleSwitchChange = async (e, id) => {
        const newStatus = e.target.checked;

        const action = newStatus ? 'true' : 'false';

        setSwitchStatus((prevState) => ({
            ...prevState,
            [id]: newStatus
        }));

        try {
            const response = await fetch("https://api.foodgrab.africa/admin/api/v1/suspend", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.token}`,
                },
                body: JSON.stringify({
                    userType: 'USER',
                    id: id,
                    action: action
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update user status');
            }

            localStorage.setItem('UserSwitchStatus', JSON.stringify({ ...switchStatus, [id]: newStatus }));

            if (!newStatus) {
                const updatedResponse = await fetch("https://api.foodgrab.africa/admin/api/v1/suspend", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.token}`,
                    },
                    body: JSON.stringify({
                        userType: 'USER',
                        id: id,
                        action: action
                    })
                });

                if (!updatedResponse.ok) {
                    throw new Error('Failed to update user status again');
                }
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };



    return (
        <div className='main__container'>
            <Navbar toggleShowMenu={toggleShowMenu} />
            <div className="main__content">
                <div className='main__content-table-container'>
                    <div className='main__content-table-head'>
                        <h2>Users</h2>
                        <div>
                            <input type="text" placeholder='Search' />
                            <IoIosSearch />
                        </div>
                    </div>
                </div>
                <div className='main__content-table'>
                    <DataTable
                        title=""
                        columns={customColumns}
                        data={allUsers}
                        customStyles={customStyles}
                        responsive
                        selectableRows
                        onSelectedRowsChange={handleChange}
                        pagination
                        paginationPerPage={10}
                        selectableRowsComponent={Checkbox}
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
            </div>
        </div>
    )
}

export default Users