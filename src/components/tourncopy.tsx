import React, { useState } from "react";
import CreateTournamentInput from "./CreateTournamentInput";
import AdminButton from "./common/AdminButton";

interface CreateTournamentFormProps {
  /**
   * The title of the form (e.g., "Create New VIP Tournament").
   */
  title: string;

  /**
   * Placeholder text for the tournament name input field.
   */
  tournamentPlaceholder: string;

  /**
   * Label text for the "Create Tournament" button.
   */
  buttonLabel: string;

  /**
   * Callback function to handle form submission.
   * @param data - The tournament data to be submitted.
   * @returns A promise that resolves once the submission is complete.
   */
  onSubmit: (data: TournamentData) => Promise<void>;

  /**
   * Callback function to handle successful form submission.
   * This allows the parent component to trigger additional actions, such as showing a success modal.
   */
  onSuccess: () => void;

  /**
   * Optional boolean flag to disable the form. Useful for loading states.
   * Defaults to `false` if not provided.
   */
  isDisabled?: boolean;

  /**
   * Optional custom error message to display when the form submission fails.
   */
  errorMessage?: string;
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
  onSuccess, // Add new prop for success callback
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
      dateTime: Math.floor(dateTime.getTime() / 1000),
      type,
      entryFee,
      nominalTournament,
      nominalFee,
      bannerImage,
    };

    setIsLoading(true);
    setError(null); // Reset any previous error

    try {
      await onSubmit(tournamentData); // Call parent-provided API function
      onSuccess(); // Trigger the parent callback for success
    } catch (err: any) {
      console.log("Error caught during API call:", err);
      setError({ message: err.message || "An error occurred while creating the tournament" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <section>
        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[3rem]  rajdhani-bold">
          {title}
        </h1>
      </section>
      {/* Banner Image Upload Section */}
      <section className="mt-[0.5rem]">
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
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
      {isLoading && <div className="text-green-500 mt-2">Creating tournament...</div>}
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

    </div>
  );
};

export default CreateTournamentForm;
