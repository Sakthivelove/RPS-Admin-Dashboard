import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAdminTournamentTableData } from "../constants/constants";

interface TablePropIF {
    isVip: boolean;
    tournamentName: string;
    winner: string;
    time: string;
    pricePool: number;
    history: string;
    earnings: string;
}

interface TableProps {
    datas: TablePropIF[];
}

const SearchBox: React.FC = () => {
    const [searchString, setSearchString] = useState<string>("");

    return (
        <div className="bg-[#0b0d13] px-[1rem] md:px-[5rem] py-[1rem] mx-4 mt-4">
            <div className="grid grid-cols-10 bg-[#1A1D26] px-[0.5rem] py-[1rem] rounded-full">
                <div className="col-span-1 flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#969EB2]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </div>
                <div className="col-span-8">
                    <input
                        onChange={(event) => setSearchString(event.target.value)}
                        type="text"
                        className="outline-none bg-[#1A1D26] text-[#969EB2]"
                        placeholder="Search here"
                    />
                </div>
            </div>
        </div>
    );
};

const Table: React.FC<TableProps> = ({ datas }) => {
    return (
        <div className="bg-[#0b0d13] h-auto px-[1rem] md:px-[5rem] py-[1rem] overflow-x-auto no-scrollbar mx-4">
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-[#FFFFFF] rajdhani-normal text-[1rem] text-left">
                        <th className="capitalize px-4 py-2">Tournament Name</th>
                        <th className="capitalize px-4 py-2">Winner</th>
                        <th className="capitalize px-4 py-2">Time</th>
                        <th className="capitalize px-4 py-2">Price Pool</th>
                        <th className="capitalize px-4 py-2">History</th>
                        <th className="capitalize px-4 py-2">Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, key) => (
                        <tr
                            key={key}
                            className={`${key % 2 === 0 ? "bg-[#0E1B22]" : ""} text-[#FFFFFF] text-[1rem] text-left`}
                        >
                                                        <td className="capitalize py-[0.5rem] rounded-l-[10px] min-w-[150px] truncate pl-[1rem]">
                                <div className="flex gap-2 items-center justify-start">
                                    <img
                                        src={data.isVip ? "/affiliatePanel/icons/vip_active.png" : "/affiliatePanel/icons/vip_unactive.png"}
                                        alt={data.isVip ? "VIP Active" : "VIP Inactive"}
                                        className="w-[25px] h-[25px]"
                                    />
                                    <h1 className="rajdhani-normal text-ellipsis overflow-hidden whitespace-nowrap">
                                        {data.tournamentName}
                                    </h1>
                                </div>
                            </td>
                            <td className="px-4 py-2 truncate">{data.winner}</td>
                            <td className="px-4 py-2">{data.time}</td>
                            <td className="px-4 py-2">${data.pricePool}</td>
                            <td className="px-4 py-2">{data.history}</td>
                            <td className="px-4 py-2 rounded-r-lg">${data.earnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const AffiliateTournaments: React.FC = () => {
    const navigate = useNavigate();
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);
    const [tableData] = useState<TablePropIF[]>(CreateAdminTournamentTableData);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / documentHeight) * 100;
            setScrollPercentage(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative flex flex-col h-screen">
            <SearchBox />
            <Table datas={tableData} />
            {scrollPercentage > 25 && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-[#1A1D26] rounded-full p-2 cursor-pointer hover:shadow-lg"
                >
                    <img
                        src="/move_to_top.png"
                        alt="Move to Top"
                        className="w-8 h-8"
                    />
                </div>
            )}
        </div>
    );
};

export default AffiliateTournaments;
