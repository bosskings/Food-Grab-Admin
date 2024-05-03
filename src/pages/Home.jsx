import React, { useContext, useEffect, useState } from 'react'
// import { IoIosSearch } from "react-icons/io";
import Checkbox from '@mui/material/Checkbox';

import Navbar from "../components/common/Navbar"
import DataTable from 'react-data-table-component';
import AuthContext from '../context/AuthContext';

const Home = ({ toggleShowMenu }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const { authTokens, totals, approvableMerchants, getTotals, getUnApprovedMerchants } = useContext(AuthContext)

    useEffect(() => {
        getTotals();
        getUnApprovedMerchants()
    }, [totals, approvableMerchants]);

    const customColumns = [
        {
            name: 'Merchant',
            selector: "Merchant",
            cell: row => (
                <div className='table__merchants'>
                    <img src={row.pictureAddress} alt="Profile" width={70} />
                    <div>
                        <p>{row.firstname}</p>
                        <span>{row.lastname}</span>
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
            selector: row => row.verificationStatus,
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
                    {row.verificationStatus === 'false' && (
                        <div className='table__action-btns'>
                            <button onClick={(e) => handleDecline(row._id, e)}>Decline</button>
                            <button onClick={(e) => handleApprove(row._id, e)}>Approve</button>
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

    const handleApprove = async (id, e) => {
        try {
            e.preventDefault()

            let response = await fetch("https://api.foodgrab.africa/admin/api/v1/approveMerchants", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens.token}`,
                },
                body: JSON.stringify({
                    action: "true",
                    merchantId: id
                })
            })
            if (response.ok) {
                console.log(response.statusText)
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || "Approval failed";
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDecline = async (id, e) => {
        try {
            e.preventDefault()

            let response = await fetch("https://api.foodgrab.africa/admin/api/v1/approveMerchants", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens.token}`,
                },
                body: JSON.stringify({
                    action: "false",
                    merchantId: id
                })
            })
            if (response.ok) {
                console.log(response.statusText)
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || "Approval failed";
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
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
                            <p>Total Orders</p>
                            <h2>{totals.totalOrders}</h2>
                            {/* <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div> */}
                        </div>

                        <div className='main__content-asset users'>
                            <p>Total Users</p>
                            <h2>{totals.totalUsers}</h2>
                            {/* <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div> */}
                        </div>

                        <div className='main__content-asset merchants'>
                            <p>Total Merchant</p>
                            <h2>{totals.totalMerchants}</h2>
                            {/* <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div> */}
                        </div>

                        <div className='main__content-asset riders'>
                            <p>Total Riders</p>
                            <h2>{totals.totalCouriers}</h2>
                            {/* <div>
                                <p>Payout Balance: </p>
                                <span>&#36;139,900.99</span>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='main__content-table-container'>
                    <div className='main__content-table-head'>
                        <h2>Approve Merchants</h2>
                        {/* <div>
                            <input type="text" placeholder='Search' />
                            <IoIosSearch />
                        </div> */}
                    </div>
                    <div className='main__content-table'>
                        <DataTable
                            title=""
                            columns={customColumns}
                            data={approvableMerchants}
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