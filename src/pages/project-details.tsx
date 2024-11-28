import React, { useState } from 'react';
import GradientCard from '../components/GradientCard';  
import Table from '../components/Table';  
import LineChart from '../components/LineChart';  
import { FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa"; // Example: FontAwesome Icons
import { top8GamesColumns,top8Gamesdata } from '../data/data';

const Dashboard: React.FC = () => {
    const [range, setRange] = useState<"day" | "week" | "month" | "year">("day");


    const username = "Admin";
    const createTournamentText = "Dashboard";
    const createTournamentPath = "#";

    // Sample data for Gradient Cards, Table, and LineChart
    const gradientCards = [
        { title: "Total Players", value: "1200", imageSrc: "icons/user-avathar.png", imageAlt: "Card 1" },
        { title: "Total Tournaments", value: "20", imageSrc: "icons/trophy_1.png", imageAlt: "Card 2" },
        { title: "Active Tournaments", value: "5", imageSrc: "icons/league.png", imageAlt: "Card 3" }
    ];


    const yearData = { years: [2022, 2023, 2024] };

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
            "User Avatar": "GRJ***5678",
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
            "User Avatar": "GRJ***7890",
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
            className="flex h-screen"
        >
            {/* Right Section */}
            <div className="flex-grow overflow-hidden">
                {/* Scrolling Container */}
                <div className="flex flex-col p-6 overflow-y-auto h-full">
                    {/* Gradient Cards */}
                    <div className="flex space-x-6 mb-6">
                        {gradientCards.map((card, index) => (
                            <GradientCard key={index} {...card} />
                        ))}
                    </div>

                    {/* Main Content: Table and LineChart */}
                    <div className="flex-grow flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        {/* Table Section */}
                        <div className="flex-1 w-full md:w-1/2 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4 px-4 h-[9%]">
                                <h2 className="text-xl font-semibold text-[#45F882] font-Rajdhani">Top 8 Games</h2>
                            </div>
                            <div className="flex-1 overflow-auto">
                                <Table columns={top8GamesColumns} data={top8Gamesdata} height='50vh' />
                            </div>
                        </div>

                        {/* Line Chart Section */}
                        <div className="flex-1 w-full md:w-1/2 h-full flex flex-col">
                            <div className="flex justify-end items-center gap-2 mb-4 h-[9%]">
                                {["day", "week", "month", "year"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setRange(option as "day" | "week" | "month" | "year")}
                                        disabled={range === option}
                                        className={`px-4 py-2 rounded ${range === option
                                            ? "bg-[#45F882] cursor-not-allowed"
                                            : "bg-[#969EB299] hover:bg-[#45F882] text-white"
                                            }`}
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="flex-1 overflow-auto">
                                <LineChart yearData={yearData} />
                            </div>
                        </div>
                    </div>

                    {/* Recent Visitors Table */}
                    <div className="mt-4 p-4 bg-[#1A1D26] rounded-lg">
                        {/* Combined Title and Table */}
                        <div className="flex flex-col">
                            {/* Table */}
                            <div className="overflow-auto">
                                <Table columns={visitorColumns} data={visitorData} title='Recent Visitors' height='50vh'/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );

};

export default Dashboard;
