import React, { useState } from 'react';
import { useCreateTournament } from '../../hooks/useCreateTournament';
import CreateTournamentForm from '../../components/CreateTournamentForm';
import { TournamentData } from '../../services/tournamentService';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';


const CreateRockTournament: React.FC = () => {
  const { mutate, isPending, isError, error } = useCreateTournament();
  const { sidebarActive } = useSidebar()

  // Wrap mutate in a function that returns a Promise
  const handleCreateRockTournament = async (data: TournamentData) => {
    try {
      await mutate(data); // Pass the form data to the mutation
    } catch (err) {
      console.error("Error creating tournament:", err);
    }
  };

  if (isPending || error) {
    return (
      <StatusMessage
        isLoading={isPending}
        error={error}
        loadingMessage="Creating Tournament..."
        errorMessage={error?.message || "Failed to create tournament."}
        className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen overflow-auto`}
      />
    );
  }

  return (
    <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen overflow-auto`}>
      <CreateTournamentForm
        title="Create New Rock Tournament"
        tournamentPlaceholder="Rock Tournament"
        buttonLabel="Create Rock Tournament"
        onSubmit={handleCreateRockTournament}
      />
    </div>
  );
};

export default CreateRockTournament;

