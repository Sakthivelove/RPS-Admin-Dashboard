import React from "react";
import Footer from "../components/Footer";
import SideBar from "../components/sideBarNew";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import GradientCard from "../components/GradientCard";

const AdminList = () => {
    // Sample data for the table
    const tableData = [
        { id: 1, username: 'user1', password: '******' },
        { id: 2, username: 'user2', password: '******' },
        { id: 3, username: 'user3', password: '******' },
        { id: 4, username: 'user4', password: '******' },
    ];

    const menuItems = [
        { label: "Rock Tournaments", icon: "/star_1.png" },
        { label: "VIP Tournaments", icon: "/vip_1.png" },
        { label: "Affiliate Tournaments", icon: "/affiliate_1.png" },
        { label: "User's List", icon: "/users_list.png" },
        { label: "User Info", icon: "/user-info.png" },
        { label: "User Status Update", icon: "/user-status-update.png" },
        { label: "Admin List", icon: "/admin-list.png" },
        { label: "Admin Add", icon: "/admin-add.png" },
        { label: "Admin Edit", icon: "/admin-edit.png" },
        { label: "Activity List", icon: "/activity-list.png" },
        { label: "Tournament List", icon: "/tournament-list.png" },
        { label: "Tournament Info", icon: "/tournament-info.png" },
        { label: "Game History", icon: "/game-history.png" },
        { label: "Game Info", icon: "/game-info.png" },
        { label: "Stake History", icon: "/stake-history.png" },
        { label: "Stake Info", icon: "/stake-info.png" },
        { label: "Project Settings", icon: "/project-settings.png" },
        { label: "Change Password", icon: "/change-password.png" },
        { label: "Logout", icon: "/logout.png" },
    ];
    
    return (
        <div className="min-h-screen flex flex-col">
            {/* Page Menu Section */}
            <div className="relative flex-grow flex">
                <img
                    src="./adminlist.png"
                    alt="Admin List Background"
                    className="w-full h-screen object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full flex overflow-y-auto scrollbar-none">
                    {/* Sidebar */}
                    <SideBar
                        breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
                        menuItem={menuItems}
                        username={"Admin"}
                        createTournamentIcon="/affiliate_2.png"
                        createTournamentText={"Dashboard"}
                        createTournamentPath={"#"}
                    />
                    {/* Content Section */}
                    <div className="flex flex-col w-full">
                        <div className="my-[2%] mx-[2%] flex gap-2">
                            {/* Cards Section */}
                            <GradientCard title={"Total Players"} value={"100"} imageSrc={"./user-avathar.png"} imageAlt={"fdsdf"} />
                            <GradientCard title={"Total Tournaments"} value={"3k"} imageSrc={"./league.png"} imageAlt={"fdsdf"} />
                            <GradientCard title={"Current Tournaments"} value={"100"} imageSrc={"./trophy_1.png"} imageAlt={"fdsdf"} />
                        </div>

                        {/* Table Section */}
                        <div className="bg-[#1A1D26] p-2 mx-[2%] mb-[1%] rounded-lg flex-grow">
                            <div className="p-4 flex-grow">
                                {/* Header Section */}
                                <div className="flex items-center justify-between mb-4">
                                    {/* Admin List */}
                                    <h1 className="text-[#45F882] text-rajdhani text-[1.5rem]">Admin List</h1>

                                    {/* Add Admin Button */}
                                    <button className="flex items-center space-x-2 bg-[#45F882] text-black px-4 py-2 rounded-lg font-medium">
                                        {/* Circle for the plus icon */}
                                        <div className="flex items-center justify-center w-5 h-5 bg-green rounded-full text-black border-[1px] border-black">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                        <span>Add Admin</span>
                                    </button>
                                </div>

                                <table
                                    className="min-w-full table-auto text-white border-separate font-weight-500" // Use border-separate
                                    style={{ borderSpacing: "0 0.5rem" }} // Add spacing between rows
                                >
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-2 text-left">S.No</th> {/* Reduced padding for first column */}
                                            <th className="px-4 py-2 text-left">Username</th>
                                            <th className="px-4 py-2 text-left">Password</th>
                                            <th className="px-2 py-2 text-left text-right pr-5">Actions</th> {/* Moved Actions column to right */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr
                                                key={row.id}
                                                className="bg-[#0F1C23] rounded-lg" // Background for rows
                                            >
                                                <td className="px-2 py-2">{index + 1}</td> {/* Reduced padding for first column */}
                                                <td className="px-4 py-2">{row.username}</td>
                                                <td className="px-4 py-2">{row.password}</td>
                                                <td className="px-2 py-2 flex justify-end space-x-4"> {/* Moved Actions column to right */}
                                                    {/* Eye Icon */}
                                                    <button className="text-gray-400 hover:text-white">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                    {/* Edit Icon */}
                                                    <button className="text-gray-400 hover:text-white">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    {/* Delete Icon */}
                                                    <button className="text-gray-400 hover:text-white">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminList;
