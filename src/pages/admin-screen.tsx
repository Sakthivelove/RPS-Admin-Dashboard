import React from "react";
import GradientCard from "../components/GradientCard";
import BarChartComponent from "../components/BarChart";
import Table from "../components/Table";
import Button from "../components/AdminButton";
import { AdminScreenColumns, AdminScreenData, AdminScreenCardData } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../SidebarContext";


const AdminScreen: React.FC = () => {
    const navigate = useNavigate();
    const {sidebarActive} = useSidebar()
    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white overflow-auto`}>
        <main
            className="flex h-full"
            aria-label="Admin Dashboard"
        >
            {/* Main Content */}
            <section
                className="flex-1 text-white m-4"
                style={{ backgroundColor: 'rgba(14, 27, 34, 0.5)' }}
            >
                {/* Section: Create New Rock Tournament */}
                <header className="flex justify-between items-center px-4 py-2">
                    <h2 className="text-[#45F882] font-rajdhani font-bold text-4xl">
                        Create New Rock Tournament
                    </h2>
                    <Button
                        image="yellow"
                        text="Create New"
                        onClick={() => navigate("/create-new-rock-tournament")}
                        aria-label="Create New Tournament"
                    />
                </header>

                {/* Top Row: Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                    {AdminScreenCardData.map((card, index) => (
                        <GradientCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            imageSrc={card.imageSrc}
                            imageAlt={card.imageAlt || "Card Image"}
                        />
                    ))}
                </section>

                {/* Bottom Row: BarChart and Table */}
                <section className="grid grid-cols-1 sm:grid-cols-7 gap-4 p-4">
                    {/* Left: Bar Chart */}
                    <div className="col-span-4 rounded-lg">
                        <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-2">
                            Tournament Overview
                        </h3>
                        <BarChartComponent height={340} />
                    </div>

                    {/* Right: Tournament History Table */}
                    <div className="col-span-3 rounded-lg overflow-hidden">
                        <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-2">
                            Tournament History
                        </h3>
                        <Table columns={AdminScreenColumns} data={AdminScreenData} />
                    </div>
                </section>
            </section>
        </main>
        </div>
    );
};


export default AdminScreen;
