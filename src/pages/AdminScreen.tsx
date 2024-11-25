import React, { useState } from "react";
import GradientCard from "../components/GradientCard";
import Sidebar from "../components/sideBarNew";
import BarChartComponent from "../components/barChart";
import Table from "../components/Table";
import Button from "../components/AdminButton";

// Sidebar Props
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


// Cards Data
const cardData = [
    {
        title: "Total Users",
        value: "1,500",
        imageSrc: "./user-avathar.png",
        imageAlt: "Users Icon",
    },
    {
        title: "Active Tournaments",
        value: "30",
        imageSrc: "./league.png",
        imageAlt: "Tournaments Icon",
    },
    {
        title: "Revenue",
        value: "$5,000",
        imageSrc: "./trophy_1.png",
        imageAlt: "Revenue Icon",
    },
];

// Table Data
const columns = ["ID", "Name", "Age", "City"];
const data = [
    { ID: 1, Name: "John", Age: 28, City: "New York" },
    { ID: 2, Name: "Jane", Age: 32, City: "Los Angeles" },
    { ID: 3, Name: "Alice", Age: 25, City: "Chicago" },
    { ID: 4, Name: "Bob", Age: 40, City: "San Francisco" },
];

const AdminScreen: React.FC = () => {


    return (
        <div
            className="flex h-screen"
            style={{
                backgroundImage: 'url(/adminlist.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Sidebar */}
            <Sidebar
                username="Admin"
                menuItem={menuItems}
                createTournamentIcon="/affiliate_2.png"
                createTournamentText="Dashboard"
                createTournamentPath="#"
                breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
            />

            {/* Main Content */}
            <div
                className="flex-1 text-white m-[1rem]"
                style={{ backgroundColor: '#0E1B2280' }}
            >
                {/* Title */}
                <div className="flex justify-between p-4">
                    <h2 className="text-[#45F882] text-lg font-bold font-Rajdhani text-[3rem] capitalize break-words max-w-full">
                        Create new Rock Tournament
                    </h2>
                    <Button image={"yellow"} text={"Create New"} onClick={() => alert("Create New clicked")} />
                </div>


                {/* Top Row: Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
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

                {/* Bottom Row: BarChart and Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    {/* Left: Bar Chart */}
                    <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
                        <BarChartComponent height={290} />
                    </div>

                    {/* Right: Table */}
                    <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
                        <Table columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AdminScreen;
