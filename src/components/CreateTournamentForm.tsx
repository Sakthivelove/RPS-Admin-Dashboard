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
  bannerImage: string; // Image URL
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
  const [bannerImage, setBannerImage] = useState<string>("");

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
  const handleEntryFee = (value: string) => setEntryFee(Math.max(0, Number(value)));
  const handleNominalTournament = (value: string) => setNominalTournament(value === "true");
  const handleNominalFee = (value: string) => setNominalFee(Number(value));

  // Image upload handler
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 1 * 1024 * 1024) { // 1MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string); // Set base64 URL as banner image
      };
      reader.readAsDataURL(file); // Read the file as base64
    } else {
      alert("File size exceeds the 1MB limit.");
    }
  };


  // Reset the form fields
  const handleReset = () => {
    setTournamentName("");
    setDateTime(new Date()); // Reset to current date
    setType("rock");
    setEntryFee(5);
    setNominalTournament(true);
    setNominalFee(5);
    setBannerImage("");
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
      console.log("Error caught during API call:", err);
      setIsModalOpen(false);
      setError({ message: err.message || "An error occurred while creating the tournament" });
    } finally {
      // Reset the loading state
      setIsLoading(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


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
      {/* Banner Image Upload Section */}
      <section className="mt-[2rem]">
        <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
          <div className="bg-[#0B0D13] rounded-[1.5rem] w-full h-full flex justify-center items-center">
            {/* File Upload Section or Image Preview */}
            {bannerImage ? (
              <div className="w-full h-full flex justify-center items-center rounded-[1.5rem]">
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  className="max-w-full max-h-full object-contain rounded-[1.5rem] shadow-lg"
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src="/create-tournament/file_upload.png"
                    alt="Upload"
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
                  onChange={handleFileChange} // Trigger file selection
                />
              </label>
            )}
          </div>
        </div>
      </section>



      <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
        <div className="p-[1.125rem]">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Tournament Name */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Tournament Name"
                isRequired={true}
                placeHolder={tournamentPlaceholder}
                type="text"
                value={tournamentName}
                callback={handleTournamentName}
              />
            </div>

            {/* Date */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Tournament Date"
                isRequired={true}
                placeHolder="Select a date"
                type="date"
                value={dateTime.getTime()} // Pass date as timestamp (milliseconds)
                callback={handleDateTime}
              />
            </div>

            {/* Entry Fee */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Entry Fee"
                isRequired={true}
                placeHolder="Enter fee amount"
                type="number"
                value={entryFee}
                callback={handleEntryFee}
              />
            </div>

            {/* Nominal Tournament */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Nominal Tournament"
                isRequired={true}
                placeHolder="Select true/false"
                type="select"
                value={nominalTournament ? "true" : "false"}
                callback={handleNominalTournament}
                options={["true", "false"]}
              />
            </div>

            {/* Nominal Fee */}
            {nominalTournament && (
              <div className="mb-[2.75rem]">
                <CreateTournamentInput
                  inputLabel="Nominal Fee"
                  isRequired={true}
                  placeHolder="Enter nominal fee"
                  type="number"
                  value={nominalFee}
                  callback={handleNominalFee}
                />
              </div>
            )}

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
