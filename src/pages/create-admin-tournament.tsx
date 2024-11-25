import React, { useState, useEffect, useRef } from "react";
import SideBar from "../components/layout/SideBar";
import { PrimaryButton } from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CreateAdminTournamentTableData } from "../constants/constants";


interface TablePropIF {
    isVip: boolean,
    tournamentName: string,
    winner: string,
    time: string,
    pricePool: number,
    history: string,
    earnings: string

};

const SearchBox = () => {
    const [searchString, setSearchString] = useState<string>("");

    return (
        <div className="bg-[#0b0d13] px-[1rem] md:px-[5rem] py-[1rem]">
            <div className="grid grid-cols-10 bg-[#1A1D26] px-[0.5rem] py-[1rem] rounded-full">
                <div className="col-span-1 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#969EB2]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <div className="col-span-8">
                    <input onChange={(event) => setSearchString(event.target.value)} type="text" className="outline-none bg-[#1A1D26] text-[#969EB2]" placeholder="Search here" />
                </div>
                <div className="col-span-1 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#969EB2]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>

                </div>

            </div>

        </div>
    );

};



const Table = (datas: TablePropIF[]) => {
    return (
        <div className="bg-[#0b0d13] h-[26rem] px-[1rem] md:px-[5rem] py-[1rem] overflow-x-auto no-scrollbar">
            <table className="min-w-full table-fixed mx-auto">
                <thead>
                    <tr className="text-[#FFFFFF] rajdhani-normal text-[1.5rem] text-left">
                        <th className="capitalize rajdhani-normal min-w-[150px] pl-[1rem]">tournament name</th>
                        <th className="capitalize rajdhani-normal min-w-[100px]">winner</th>
                        <th className="capitalize rajdhani-normal min-w-[100px]">time</th>
                        <th className="capitalize rajdhani-normal min-w-[100px]">price pool</th>
                        <th className="capitalize rajdhani-normal min-w-[100px]">history</th>
                        <th className="capitalize rajdhani-normal min-w-[100px]">earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map((data, key: number) => (
                            <tr key={key} className={`text-[#FFFFFF] rajdhani-normal text-[1.5rem] text-left ${key % 2 == 0 ? "bg-[#0E1B22]" : ""}`}>
                                <td className="capitalize py-[0.5rem] rounded-l-[10px] min-w-[150px] truncate pl-[1rem]">
                                    <div className="flex gap-2 items-center justify-start">
                                        {
                                            data.isVip ?
                                                <img src="/affiliatePanel/icons/vip_active.png" alt="" className="w-[25px] h-[25px]" />
                                                :
                                                <img src="/affiliatePanel/icons/vip_unactive.png" alt="" className="w-[25px] h-[25px]" />
                                        }
                                        <h1 className="rajdhani-normal text-ellipsis overflow-hidden whitespace-nowrap">{data.tournamentName}</h1>
                                    </div>
                                </td>
                                <td className="capitalize rajdhani-normal min-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">{data.winner}</td>
                                <td className="capitalize rajdhani-normal min-w-[100px]">{data.time}</td>
                                <td className="capitalize rajdhani-normal min-w-[100px]">{data.pricePool}</td>
                                <td className="capitalize rajdhani-normal min-w-[100px]">{data.history}</td>
                                <td className="capitalize rounded-r-[10px] rajdhani-normal min-w-[100px]">$ {data.earnings}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};



const CreateAdminTournament: React.FC = () => {

    const navigate = useNavigate();

    const bannerRef = useRef<HTMLDivElement>(null);

    const [scrollPercentage, setScrollPercentage] = useState<number>(0);
    const [tableData, setTableData] = useState<TablePropIF[]>(CreateAdminTournamentTableData);

    // Function to scroll to a specific section
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const PrimaryButtonListener = () => {
        navigate("/create-new-admin-tournament");
    };



    const handleScroll = () => {
        const scrollTop = window.scrollY; // Distance scrolled from the top
        const clientHeight = window.innerHeight; // Viewport height
        const scrollHeight = document.documentElement.scrollHeight; // Total height of the document

        const totalHeight = scrollHeight - clientHeight;
        const percentage = (scrollTop / totalHeight) * 100;

        setScrollPercentage(percentage);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    console.log(scrollPercentage);



    return (
        <div className="relative">
            <section ref={bannerRef}>
                {/* page menu section */}
                <div className="relative min-h-[100vh] h-fit">
                    <div className="absolute top-0 w-full h-full flex">
                        <SideBar />
                        <div className="w-full h-full p-[1.5rem] lg:p-[5rem] flex flex-col justify-center">
                            <div className="text-center md:text-start">
                                <h1 className="capitalize text-[#45F882] rajdhani-bold text-[1.8rem] md:text-[3rem] lg:text-[6.5rem] xl:leading-[126px]">Create New Admin Tournament</h1>
                            </div>
                            <div className="mx-auto md:ml-0 mt-[1rem]">
                                <PrimaryButton listener={PrimaryButtonListener} context={"create now"} />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section>
                {/* page table section */}
                <div className="bg-[#0b0d13] py-[1rem]">
                    {SearchBox()}
                    {Table(tableData)}
                </div>
            </section>
            <section>
                <Footer />
            </section>
            {
                scrollPercentage > 25 ?
                    <div onClick={() => scrollToSection(bannerRef)} className="fixed bottom-2 right-2 cursor-pointer">
                        <img src="/move_to_top.png" alt="" className="" />
                    </div>
                    :
                    <></>
            }
        </div>
    )
};



export default CreateAdminTournament;