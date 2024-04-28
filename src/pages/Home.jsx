import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import Checkbox from '@mui/material/Checkbox';

import Navbar from "../components/common/Navbar"
import DataTable from 'react-data-table-component';
import approveMerchants from '../dummyData/approveMerchants';

const Home = ({ toggleShowMenu }) => {
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
            cell: row => (
                <>
                    {row.status === 'pending' && (
                        <div className='table__action-btns'>
                            <button onClick={() => handleDecline(row.id)}>Decline</button>
                            <button onClick={() => handleApprove(row.id)}>Approve</button>
                        </div>
                    )}
                </>
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

    const handleApprove = (id) => {
        // Logic to approve merchant with ID
    };

    const handleDecline = (id) => {
        // Logic to decline merchant with ID
    };

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows)
    };

    // const customCheckbox = () => <Checkbox color='default' />

    return (
        <div className='main__container'>
            <Navbar toggleShowMenu={toggleShowMenu} />
            <div className='main__content'>
                <div className='main__content-assets-container'>
                    <div className='main__content-assets-head'>
                        <h2>Dashboard</h2>
                    </div>
                    <div className='main__content-assets'>
                        <div className='main__content-asset balance'>
                            <p>Available Balance</p>
                            <h2>&#8358;140,000.00</h2>
                            <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div>
                        </div>

                        <div className='main__content-asset users'>
                            <p>Total Users</p>
                            <h2>100</h2>
                            <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div>
                        </div>

                        <div className='main__content-asset merchants'>
                            <p>Total Merchant</p>
                            <h2>20</h2>
                            <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div>
                        </div>

                        <div className='main__content-asset riders'>
                            <p>Total Riders</p>
                            <h2>80</h2>
                            <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='main__content-table-container'>
                    <div className='main__content-table-head'>
                        <h2>Approve Merchants</h2>
                        <div>
                            <input type="text" placeholder='Search' />
                            <IoIosSearch />
                        </div>
                    </div>
                    <div className='main__content-table'>
                        <DataTable
                            title=""
                            columns={customColumns}
                            data={approveMerchants}
                            customStyles={customStyles}
                            responsive
                            selectableRows
                            onSelectedRowsChange={handleChange}
                            pagination
                            paginationPerPage={5}
                            selectableRowsComponent={Checkbox}
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home