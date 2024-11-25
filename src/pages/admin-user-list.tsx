import React from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import { FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa"; // Example: FontAwesome Icons

const AdminUserList: React.FC = () => {

    // Sample data for Gradient Cards, Table, and LineChart
    const gradientCards = [
        { title: "Total Players", value: "1200", imageSrc: "/user-avathar.png", imageAlt: "Card 1" },
        { title: "Total Tournaments", value: "20", imageSrc: "/trophy_1.png", imageAlt: "Card 2" },
        { title: "Active Tournaments", value: "5", imageSrc: "/league.png", imageAlt: "Card 3" }
    ];

    // Recent Visitors Table Data
    const visitorColumns = [
        "S.No",
        "Wallet Address",
        "User Name",
        "User Avatar",
        "X Username",
        "Telegram ID",
        "Actions",
    ];

    const visitorData = [
        {
            "S.No": 1,
            "Wallet Address": "0x123...abc",
            "User Name": "John Doe",
            "User Avatar": "GRJ***4665",
            "X Username": "@johndoe",
            "Telegram ID": "@telegramJohn",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
        {
            "S.No": 2,
            "Wallet Address": "0x456...def",
            "User Name": "Jane Smith",
            "User Avatar": "GRJ***7894",
            "X Username": "@janesmith",
            "Telegram ID": "@telegramJane",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
        {
            "S.No": 3,
            "Wallet Address": "0x789...ghi",
            "User Name": "Alice Johnson",
            "User Avatar": "GRJ***1238",
            "X Username": "@alicejohnson",
            "Telegram ID": "@telegramAlice",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
        {
            "S.No": 4,
            "Wallet Address": "0x234...jkl",
            "User Name": "Bob Williams",
            "User Avatar": "GRJ***3345",
            "X Username": "@bobwilliams",
            "Telegram ID": "@telegramBob",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
        {
            "S.No": 5,
            "Wallet Address": "0x567...mno",
            "User Name": "Charlie Brown",
            "User Avatar": "GRJ***3345",
            "X Username": "@charliebrown",
            "Telegram ID": "@telegramCharlie",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
        {
            "S.No": 6,
            "Wallet Address": "0x890...pqr",
            "User Name": "David Lee",
            "User Avatar": "GRJ***3345",
            "X Username": "@davidlee",
            "Telegram ID": "@telegramDavid",
            "Actions": (
                <div className="flex space-x-2">
                    <button className="text-white">
                        <FaInfoCircle size={20} />
                    </button>
                    <button className="bg-[#45F882] text-white px-3 py-1 rounded">Status</button>
                    <button className="text-white">
                        <FaEdit size={20} />
                    </button>
                    <button className="text-white">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            ),
        },
    ];



    return (
        <div
            className="flex h-screen overflow-hidden"
        >

            {/* Right Section */}
            <div className="flex-grow h-full overflow-hidden">
                {/* Scrolling Container */}
                <div className="flex flex-col p-6 h-full overflow-y-auto">
                    {/* Gradient Cards */}
                    <div className="flex space-x-6 mb-6">
                        {gradientCards.map((card, index) => (
                            <GradientCard key={index} {...card} />
                        ))}
                    </div>

                    {/* Recent Visitors Table */}
                    <div className="mt-4 p-4 bg-[#1A1D26] rounded-lg flex-grow">
                        {/* Combined Title and Table */}
                        <div className="flex flex-col h-full">
                            {/* Title */}
                            <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
                                User List
                            </h3>

                            {/* Table */}
                            <div className="overflow-auto flex-grow">
                                <Table columns={visitorColumns} data={visitorData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default AdminUserList;
