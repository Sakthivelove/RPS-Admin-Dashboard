import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTournamentInput from "../../components/CreateTournamentInput";
import AdminButton from "../../components/common/AdminButton";
import Modal from "../../components/common/Modal";
import { useSidebar } from "../../context/SidebarContext";



const CreateNewRockTournament: React.FC = () => {

    const { sidebarActive } = useSidebar();
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();


    //input states
    const [tournamentName, setTournamentName] = useState<string | null>(null);
    const [players, setPlayers] = useState<number | null>(null);
    const [date, setData] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [fee, setFee] = useState<number | null>(null);


    //input callback functions
    const handleTournamentName = (value: string) => setTournamentName(value);
    const handlePlayers = (value: string) => setPlayers(parseInt(value));
    const handleDate = (value: string) => setData(value);
    const handleTime = (value: string) => setTime(value);
    const handleFee = (value: string) => setFee(parseInt(value));

    // Handle modal open/close
    const handleCreateTournament = () => {
        // Add validation or API call logic here if needed
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

        // Navigate after closing the modal
        navigate('/affiliate-tournaments');
    };




    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen overflow-auto`}>
            <div className="m-[2%]">
                <section className="">
                    {/* upload file section */}
                    <div className="">
                        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[4rem] lg::text-[6rem] rajdhani-bold">create new rock tournament</h1>
                    </div>
                    <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
                        <div className="bg-[#0B0D13]  rounded-[1.5rem] w-full h-full">
                            <div className="flex items-center justify-center w-full h-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <img src="/create-tournament/file_upload.png" alt="" className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem]" />
                                        <p className="text-center text-white rajdhani-bold text-[1rem] md:text-[1.875rem]">100*100 <span className="text-[#45F882]">Below 1 MB</span></p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
                    {/* form section */}
                    <div className="p-[1.125rem]">
                        <form onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            handleCreateTournament(); // Show the modal
                        }}>
                            <div className="mb-[2.75rem]">
                                <CreateTournamentInput inputLabel={"tournament name"} isRequired={true} placeHolder={"Rock Tournament"} type={"text"} callback={handleTournamentName} />
                            </div>
                            <div className="mb-[2.75rem]">
                                <CreateTournamentInput inputLabel={"Minimum Players"} isRequired={true} placeHolder={"Minimum 10 Players"} type={"text"} callback={handlePlayers} />
                            </div>
                            <div className="mb-[2.75rem]">
                                <CreateTournamentInput inputLabel={"Tournament Date"} isRequired={true} placeHolder={"DD / MM / YYYY"} type={"text"} callback={handleDate} />
                            </div>
                            <div className="mb-[2.75rem]">
                                <CreateTournamentInput inputLabel={"Tournament Time"} isRequired={true} placeHolder={"00:00:00"} type={"text"} callback={handleTime} />
                            </div>
                            <div className="mb-[2.75rem]">
                                <CreateTournamentInput inputLabel={"tournament fee"} isRequired={true} placeHolder={"$0.00"} type={"text"} callback={handleFee} />
                            </div>
                            <div className="flex gap-[1rem] flex-col md:flex-row items-center justify-center">
                                <AdminButton
                                    image={"yellow"}
                                    text={"Reset"}
                                    width="sm:w-32 lg:w-48"
                                    height="sm:h-12 lg:h-16"
                                    onClick={() => { }}
                                />
                                <AdminButton
                                    image={"green"}
                                    text={"Create Tournament"}
                                    width="sm:w-32 lg:w-48"
                                    height="sm:h-12 lg:h-16"
                                    onClick={handleCreateTournament}
                                />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Tournament Created Successfully"
                content="Your tournament has been created successfully."
                onConfirm={handleCloseModal}
            />
        </div>
    );
};



export default CreateNewRockTournament;