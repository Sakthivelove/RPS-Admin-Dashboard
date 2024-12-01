import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import GradientCard from "../../components/GradientCard";
import { useSidebar } from "../../context/SidebarContext";
// Sample data for the table
const tableData = [
    { id: 1, username: "user1", password: "******" },
    { id: 2, username: "user2", password: "******" },
    { id: 3, username: "user3", password: "******" },
    { id: 4, username: "user4", password: "******" },
];

// Cards Data
const cardData = [
    {
        title: "Total Users",
        value: "1,500",
        imageSrc: "icons/user-avathar.png",
        imageAlt: "Users Icon",
    },
    {
        title: "Active Tournaments",
        value: "30",
        imageSrc: "icons/league.png",
        imageAlt: "Tournaments Icon",
    },
    {
        title: "Revenue",
        value: "$5,000",
        imageSrc: "icons/trophy_1.png",
        imageAlt: "Revenue Icon",
    },
];

const AdminList = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const {sidebarActive} = useSidebar()
    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen flex flex-col`}>
            {/* Top Row: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
                {cardData.map((card, index) => (
                    <GradientCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        imageSrc={card.imageSrc}
                        imageAlt={card.imageAlt}
                    />
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-[#1A1D26] p-2 mx-[2%] mb-[1%] rounded-lg flex-grow">
                <div className="p-4">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Admin List */}
                        <h1 className="text-[#45F882] text-rajdhani text-[1.5rem]">Admin List</h1>

                        {/* Add Admin Button */}
                        <button
                            className="flex items-center space-x-2 bg-[#45F882] text-black px-4 py-2 rounded-lg font-medium"
                            onClick={() => navigate("/add-admin")} // Navigate to /add-admin
                        >
                            {/* Circle for the plus icon */}
                            <div className="flex items-center justify-center w-5 h-5 bg-green rounded-full text-black border-[1px] border-black">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <span>Add Admin</span>
                        </button>
                    </div>

                    <table
                        className="min-w-full table-auto text-white border-separate font-weight-500"
                        style={{ borderSpacing: "0 0.5rem" }} // Add spacing between rows
                    >
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-left">S.No</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Password</th>
                                <th className="px-2 py-2 text-left text-right pr-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className="bg-[#0F1C23] rounded-lg"
                                >
                                    <td className="px-2 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{row.username}</td>
                                    <td className="px-4 py-2">{row.password}</td>
                                    <td className="px-2 py-2 flex justify-end space-x-4">
                                        <button className="text-gray-400 hover:text-white">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button className="text-gray-400 hover:text-white">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
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
    );
};

export default AdminList;
