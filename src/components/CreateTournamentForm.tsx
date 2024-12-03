import React, { useState } from "react";
import CreateTournamentInput from "./CreateTournamentInput"
import AdminButton from "./common/AdminButton"
import Modal from "./common/Modal"

// Define interface for props
interface CreateTournamentFormProps {
  title: string; // Title of the form (e.g., "Create New VIP Tournament")
  tournamentPlaceholder: string; // Placeholder for the tournament name input
  buttonLabel: string; // Label for the "Create Tournament" button
}

const CreateTournamentForm: React.FC<CreateTournamentFormProps> = ({
  title,
  tournamentPlaceholder,
  buttonLabel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State variables for form inputs
  const [tournamentName, setTournamentName] = useState<string | null>(null);
  const [players, setPlayers] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null); // State for the file

  // Callback functions for updating state
  const handleTournamentName = (value: string) => setTournamentName(value);
  const handlePlayers = (value: string) => setPlayers(parseInt(value));
  const handleDate = (value: string) => setDate(value);
  const handleTime = (value: string) => setTime(value);
  const handleFee = (value: string) => setFee(parseInt(value));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Get the file from the input
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Reset the form fields
  const handleReset = () => {
    setTournamentName(null);
    setPlayers(null);
    setDate(null);
    setTime(null);
    setFee(null);
    setFile(null); // Reset file
  };

  // Open modal when creating a tournament
  const handleCreateTournament = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-4">
      <section>
        {/* Use the title prop here */}
        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[4rem] lg::text-[6rem] rajdhani-bold">
          {title}
        </h1>
      </section>

      <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
        <div className="p-[1.125rem]">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* File Upload Section */}
            <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
              <div className="bg-[#0B0D13] rounded-[1.5rem] w-full h-full">
                <div className="flex items-center justify-center w-full h-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img
                        src="/create-tournament/file_upload.png"
                        alt=""
                        className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem]"
                      />
                      <p className="text-center text-white rajdhani-bold text-[1rem] md:text-[1.875rem]">
                        100*100 <span className="text-[#45F882]">Below 1 MB</span>
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange} // Handle file change
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Tournament Name */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Name"}
                isRequired={true}
                placeHolder={tournamentPlaceholder}
                type={"text"}
                value={tournamentName || ""}
                callback={handleTournamentName}
              />
            </div>

            {/* Players */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Minimum Players"}
                isRequired={true}
                placeHolder={"Minimum 10 Players"}
                type={"text"}
                value={players !== null ? players.toString() : ""}
                callback={handlePlayers}
              />
            </div>

            {/* Date */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Date"}
                isRequired={true}
                placeHolder={"DD / MM / YYYY"}
                type={"text"}
                value={date || ""}
                callback={handleDate}
              />
            </div>

            {/* Time */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Time"}
                isRequired={true}
                placeHolder={"00:00:00"}
                type={"text"}
                value={time || ""}
                callback={handleTime}
              />
            </div>

            {/* Fee */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Fee"}
                isRequired={true}
                placeHolder={"$0.00"}
                type={"text"}
                value={fee !== null ? fee.toString() : ""}
                callback={handleFee}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-[1rem] flex-col md:flex-row items-center justify-center">
              <AdminButton
                image={"yellow"}
                text={"Reset"}
                width="sm:w-32 lg:w-48"
                height="sm:h-12 lg:h-16"
                onClick={handleReset}
              />
              <AdminButton
                image={"green"}
                text={buttonLabel}
                width="sm:w-32 lg:w-48"
                height="sm:h-12 lg:h-16"
                onClick={handleCreateTournament}
              />
            </div>
          </form>
        </div>
      </section>

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

export default CreateTournamentForm;
