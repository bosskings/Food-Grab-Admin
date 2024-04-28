import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import DataTable from 'react-data-table-component';
import { Checkbox } from '@mui/material';
import { PiTrashSimpleBold } from "react-icons/pi";
import Switch from '@mui/material/Switch';
import { RiCircleFill } from "react-icons/ri";


import Navbar from '../components/common/Navbar'
import UserData from '../dummyData/UserData';

const Users = ({ toggleShowMenu }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const customColumns = [
        {
            name: 'Merchant',
            selector: row => row.merchant.name,
            cell: row => (
                <div className='table__merchants'>
                    <img src={row.merchant.profilePicture} alt="Profile" width={70} />
                    <div>
                        <p>{row.merchant.name}</p>
                        <span>{row.merchant.username}</span>
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
            selector: row => row.status,
            cell: row => (
                <div className='status__state'>
                    <p>{row.status}</p>
                    {row.status === "Active" ? <RiCircleFill className='status__active' /> : <RiCircleFill className='status__deactive' />}
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
            cell: () => (
                <div className='table__user__action-btns'>
                    <Switch size="small" />
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
                        data={UserData}
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