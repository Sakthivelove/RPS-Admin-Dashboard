import React, { useState } from "react";
import CreateTournamentInput from "./CreateTournamentInput";
import AdminButton from "./common/AdminButton";
import Modal from "./common/Modal";
import StatusMessage from "./StatusMessage"; // Import the StatusMessage component

interface CreateTournamentFormProps {
  title: string; // Title of the form (e.g., "Create New VIP Tournament")
  tournamentPlaceholder: string; // Placeholder for the tournament name input
  buttonLabel: string; // Label for the "Create Tournament" button
  onSubmit: (data: TournamentData) => Promise<void>; // Callback to submit the form data
}

// Define Tournament Data Interface
export interface TournamentData {
  tournamentName: string;
  dateTime: number; // The dateTime will be a Unix timestamp (in seconds)
  type: string;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  bannerImage: string;
}

const CreateTournamentForm: React.FC<CreateTournamentFormProps> = ({
  title,
  tournamentPlaceholder,
  buttonLabel,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<{ message: string } | null>(null); // Track error state

  // State variables for form inputs
  const [tournamentName, setTournamentName] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(new Date()); // Initialize with current date
  const [type, setType] = useState<string>("rock");
  const [entryFee, setEntryFee] = useState<number>(5);
  const [nominalTournament, setNominalTournament] = useState<boolean>(true);
  const [nominalFee, setNominalFee] = useState<number>(5);
  const [bannerImage, setBannerImage] = useState<string>("http://example.com/banner.jpg");

  // Callback functions for updating state
  const handleTournamentName = (value: string) => setTournamentName(value);

  // Ensure dateTime is at least 15 minutes in the future and convert it to Unix timestamp
  const handleDateTime = (value: string) => {
    let selectedDate = new Date(value);
    const currentDate = new Date();

    // Add 15 minutes if the selected date is in the past
    if (selectedDate <= currentDate) {
      selectedDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Add 15 minutes
    }

    setDateTime(selectedDate);
  };

  const handleType = (value: string) => setType(value);
  const handleEntryFee = (value: string) => setEntryFee(Math.max(0, Number(value))); // Prevent negative values
  const handleNominalTournament = (value: string) => setNominalTournament(value === "true");
  const handleNominalFee = (value: string) => setNominalFee(Number(value));
  const handleBannerImage = (value: string) => setBannerImage(value);

  // Reset the form fields
  const handleReset = () => {
    setTournamentName("");
    setDateTime(new Date()); // Reset to current date
    setType("rock");
    setEntryFee(5);
    setNominalTournament(true);
    setNominalFee(5);
    setBannerImage("http://example.com/banner.jpg");
  };

  // Open modal when creating a tournament
  const handleCreateTournament = async () => {
    const tournamentData: TournamentData = {
      tournamentName,
      dateTime: Math.floor(dateTime.getTime() / 1000), // Convert dateTime to Unix timestamp (seconds)
      type,
      entryFee,
      nominalTournament,
      nominalFee,
      bannerImage,
    };

    // Set loading to true and reset the error state before submitting
    setIsLoading(true);
    setError(null); // Reset any previous error

    try {
      // Attempt to create the tournament through the provided onSubmit API function
      await onSubmit(tournamentData); // Pass the tournament data to the parent component

      // If API call is successful, show the success modal
      setIsModalOpen(true);
    } catch (err: any) {
      console.log("Error caught during API call:", err);  // Log the error
      setIsModalOpen(false);
      setError({ message: err.message || "An error occurred while creating the tournament" });
    } finally {
      // Reset the loading state
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Format the date for display (e.g., MM/DD/YYYY HH:MM AM/PM)
  const formattedDate = dateTime.toLocaleString('en-US', {
    weekday: 'short', // Weekday (Mon, Tue, etc.)
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // AM/PM format
  });

  if (isLoading || error) {
    return (
      <StatusMessage
        isLoading={isLoading}
        error={error}
        loadingMessage="Creating Tournament..."
        errorMessage={error?.message || "Failed to create tournament."}
        className="mb-4"
      />
    );
  }

  return (
    <div className="m-4">
      <section>
        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[4rem] lg:text-[6rem] rajdhani-bold">
          {title}
        </h1>
      </section>

      <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
        <div className="p-[1.125rem]">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Tournament Name */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Name"}
                isRequired={true}
                placeHolder={tournamentPlaceholder}
                type={"text"}
                value={tournamentName}
                callback={handleTournamentName}
              />
            </div>
            {/* Date */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Tournament Date"}
                isRequired={true}
                placeHolder={"Select a date"}
                type={"date"}
                value={dateTime.getTime()} // Pass date as timestamp (milliseconds)
                callback={handleDateTime}
              />
            </div>


            {/* Display formatted date
            <div className="mb-[2.75rem]">
              <label className="text-white">Selected Date (User-Friendly)</label>
              <p className="text-white">{formattedDate}</p>
            </div> */}

            {/* Entry Fee */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Entry Fee"}
                isRequired={true}
                placeHolder={"Enter fee amount"}
                type={"number"}
                value={entryFee}
                callback={handleEntryFee}
              />
            </div>

            {/* Nominal Tournament */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Nominal Tournament"}
                isRequired={true}
                placeHolder={"Select true/false"}
                type={"select"}
                value={nominalTournament ? "true" : "false"}
                callback={handleNominalTournament}
                options={["true", "false"]}
              />
            </div>

            {/* Nominal Fee */}
            {nominalTournament && (
              <div className="mb-[2.75rem]">
                <CreateTournamentInput
                  inputLabel={"Nominal Fee"}
                  isRequired={true}
                  placeHolder={"Enter nominal fee"}
                  type={"number"}
                  value={nominalFee}
                  callback={handleNominalFee}
                />
              </div>
            )}

            {/* Banner Image */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel={"Banner Image"}
                isRequired={true}
                placeHolder={"Enter banner image URL"}
                type={"text"}
                value={bannerImage}
                callback={handleBannerImage}
              />
            </div>

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

      {/* Success Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content="Tournament created successfully!" title={""} />
      )}
    </div>
  );
};

export default CreateTournamentForm;
