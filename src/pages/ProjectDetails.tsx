import React, { useState } from 'react';
import Sidebar from "../components/sideBarNew"  // Import Sidebar Component
import GradientCard from '../components/GradientCard';  // Import GradientCard Component
import Table from '../components/Table';  // Import Table Component
import LineChart from '../components/LineChart';  // Import LineChart Component

const Dashboard: React.FC = () => {
    const [range, setRange] = useState<"day" | "week" | "month" | "year">("day");

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

    const username = "Admin";
    const createTournamentText = "Dashboard";
    const createTournamentPath = "#";

    // Sample data for Gradient Cards, Table, and LineChart
    const gradientCards = [
        { title: "Total Players", value: "1200", imageSrc: "/user-avathar.png", imageAlt: "Card 1" },
        { title: "Total Tournaments", value: "20", imageSrc: "/trophy_1.png", imageAlt: "Card 2" },
        { title: "Active Tournaments", value: "5", imageSrc: "/league.png", imageAlt: "Card 3" }
    ];

    const columns = ["Tournament Name", "User ID", "Affiliate"];
    const data = [
        {
            "Tournament Name": "Summer Championship",
            "User ID": "USR1234",
            "Affiliate": "PlayerOne",
        },
        {
            "Tournament Name": "Winter League",
            "User ID": "USR5678",
            "Affiliate": "TeamX",
        },
        {
            "Tournament Name": "Spring Open",
            "User ID": "USR91011",
            "Affiliate": "PlayerTwo",
        },
        {
            "Tournament Name": "Autumn Cup",
            "User ID": "USR121314",
            "Affiliate": "TeamY",
        },
    ];

    const yearData = { years: [2022, 2023, 2024] };

    return (
        <div
            className="flex h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/adminlist.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Sidebar */}
            <Sidebar
                username={username}
                menuItem={menuItems}
                createTournamentIcon="/affiliate_2.png"
                createTournamentText={createTournamentText}
                createTournamentPath={createTournamentPath}
                breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
            />

            {/* Main content area */}
            <div className="flex-grow flex flex-col p-6 overflow-hidden">
                {/* Gradient Cards */}
                <div className="flex space-x-6 mb-6">
                    {gradientCards.map((card, index) => (
                        <GradientCard key={index} {...card} />
                    ))}
                </div>

                {/* Main Content: Table and LineChart */}
                <div className="flex-grow flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 overflow-auto">
                    {/* Table */}
                    <div className="flex-1 w-full md:w-1/2 h-full flex flex-col">
                        {/* Title Container */}
                        <div className="flex justify-between items-center mb-4 px-4 h-[9%]">
                            <h2 className="text-xl font-semibold text-[#45F882] font-Rajdhani">Top 8 Games</h2>
                        </div>

                        {/* Table Container */}
                        <div className="flex-1 overflow-auto">
                            <Table columns={columns} data={data} />
                        </div>
                    </div>


                    {/* Line Chart */}
                    <div className="relative flex-1 w-full md:w-1/2 h-full flex flex-col">
                        {/* Button Container Positioned Above the Chart */}
                        <div className="flex justify-end gap-2 mb-4 h-[9%]">
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

                        {/* Line Chart Container with dynamic height */}
                        <div className="flex-1 overflow-auto">
                            <LineChart yearData={yearData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
