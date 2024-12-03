import React from "react";
import CreateTournamentForm from "../../components/CreateTournamentForm";
import { useSidebar } from "../../context/SidebarContext";

const CreateAdminTournament: React.FC = () => {
    const { sidebarActive } = useSidebar()
    return (
        <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen overflow-auto`}>
            <CreateTournamentForm
                title="Create New Admin Tournament"
                tournamentPlaceholder="Admin Tournament"
                buttonLabel="Create Admin Tournament"
            />
        </div>
    );
};

export default CreateAdminTournament;
