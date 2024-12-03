import React from "react";
import CreateTournamentForm from "../../components/CreateTournamentForm";
import { useSidebar } from "../../context/SidebarContext";

const CreateRockTournament: React.FC = () => {
    const {sidebarActive} = useSidebar()
  return (
    <div className={`absolute right-0 ${sidebarActive ? "w-[77%]":"w-[94%]"} h-screen overflow-auto`}>
      <CreateTournamentForm
        title="Create New Rock Tournament"
        tournamentPlaceholder="Rock Tournament"
        buttonLabel="Create Rock Tournament"
      />
    </div>
  );
};

export default CreateRockTournament;
