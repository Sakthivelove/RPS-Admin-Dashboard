import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateTournament } from '../../hooks/useCreateTournament';
import CreateTournamentForm from '../../components/CreateTournamentForm';
import { TournamentData } from '../../services/tournamentService';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';
import Modal from "../../components/common/Modal"

const CreateRockTournament: React.FC = () => {
  const { mutateAsync, isPending, isError, error } = useCreateTournament();
  const { sidebarActive } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Submit handler for the form
  const handleCreateRockTournament = async (data: TournamentData) => {
    try {
      await mutateAsync(data); // Await the mutation promise
      setIsModalOpen(true); // Open success modal
    } catch (err) {
      console.error("Error creating tournament:", err);
    }
  };

  // Close modal and navigate
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/tournament-list"); // Navigate after the modal is closed
  };

  // Dynamic class for the container
  const containerClass = `absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen overflow-auto`;

  if (isPending || isError) {
    return (
      <StatusMessage
        isLoading={isPending}
        error={error}
        loadingMessage="Creating Tournament..."
        errorMessage={error?.message || "Failed to create tournament."}
        className={containerClass}
      />
    );
  }

  return (
    <div className={containerClass}>
      <CreateTournamentForm
        title="Create New Rock Tournament"
        tournamentPlaceholder="Enter Rock Tournament Name"
        buttonLabel="Create Rock Tournament"
        onSubmit={handleCreateRockTournament}
        onSuccess={() => console.log("Tournament successfully created!")} // Optional success callback
        isDisabled={isPending} // Disable the form while submitting
        errorMessage={isError ? "Unable to create the tournament." : undefined} // Display error message if any
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Tournament Created"
          content="The Rock Tournament has been created successfully!"
          onClose={handleCloseModal} // Navigate only after modal close
        />
      )}
    </div>
  );
};

export default CreateRockTournament;
