import React from "react";
import CreateTournamentForm from "../../components/CreateTournamentForm"
import { useSidebar } from "../../context/SidebarContext";

const CreateVIPTournament: React.FC = () => {
    const {sidebarActive} = useSidebar()
  return (
    <div className={`absolute right-0 ${sidebarActive ? "w-[77%]":"w-[94%]"} h-screen overflow-auto`}>
      <CreateTournamentForm
        title="Create New VIP Tournament"
        tournamentPlaceholder="VIP Tournament"
        buttonLabel="Create VIP Tournament"
      />
    </div>
  );
};

export default CreateVIPTournament;
