import React, { useState } from "react";
import CreateTournamentInput from "./CreateTournamentInput";
import AdminButton from "./common/AdminButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosCloseCircle } from "react-icons/io";

interface CreateTournamentFormProps {
  title: string;
  tournamentPlaceholder: string;
  buttonLabel: string;
  onSubmit: (data: TournamentData) => Promise<void>;
  onSuccess: () => void;
  isDisabled?: boolean;
  errorMessage?: string;
}

export interface TournamentData {
  tournamentName: string;
  dateTime: number;
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
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const [tournamentName, setTournamentName] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | string>(new Date()); // Ensure it's a Date object
  const [type, setType] = useState<string>("rock");
  const [entryFee, setEntryFee] = useState<number>(5);
  const [nominalTournament, setNominalTournament] = useState<boolean>(true);
  const [nominalFee, setNominalFee] = useState<number>(5);
  const [bannerImage, setBannerImage] = useState<string>("");

  const [formErrors, setFormErrors] = useState<any>({});

  const handleTournamentName = (value: string) => setTournamentName(value);

  const handleDateTime = (value: string) => {
    let selectedDate = new Date(value);
    const currentDate = new Date();

    // Check if selected date is invalid and adjust accordingly
    if (isNaN(selectedDate.getTime())) {
      selectedDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Default to current time + 15 minutes
    }

    // Check if the selected date is in the past
    if (selectedDate <= currentDate) {
      selectedDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Add 15 minutes
    }

    setDateTime(selectedDate);
  };

  const handleType = (value: string) => setType(value);
  const handleEntryFee = (value: string) => setEntryFee(Math.max(0, Number(value)));
  const handleNominalTournament = (value: string) => setNominalTournament(value === "true");
  const handleNominalFee = (value: string) => setNominalFee(Number(value));

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      let resizedImage = "";

      // Check if the file size exceeds 1MB
      if (file.size > 1 * 1024 * 1024) {
        toast.info("File size exceeds 1MB. The image will be automatically resized to fit the required dimensions.");
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result as string;

        img.onload = () => {
          // Check if the image resolution is correct
          const maxWidth = 440;
          const maxHeight = 255;

          let width = img.width;
          let height = img.height;

          // Calculate the new width and height while maintaining the aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = Math.round(maxWidth / aspectRatio);
            } else {
              height = maxHeight;
              width = Math.round(maxHeight * aspectRatio);
            }
          }

          // Resize the image using a canvas
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Reduce the image quality if the file size is larger than 1MB
            resizedImage = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality here (0.7 means 70% quality)

            // Check the size of the resized image
            while (getBase64Size(resizedImage) > 1 * 1024 * 1024) {
              resizedImage = canvas.toDataURL("image/jpeg", 0.5); // Reduce quality further if necessary
            }

            setBannerImage(resizedImage); // Set the resized image as banner image
          }
        };

        img.onerror = () => {
          toast.error("Failed to load image.");
        };
      };

      reader.readAsDataURL(file); // Read the file as base64 data
    }
  };


  // Reset the banner image to allow the user to upload a new image
  const handleRemoveImage = () => {
    setBannerImage(""); // Clear the current image
  };


  // Function to get the size of the base64 string
  const getBase64Size = (base64String: string) => {
    return Math.round((base64String.length * 3) / 4);
  };


  const handleReset = () => {
    setTournamentName("");
    setDateTime(new Date());
    setType("rock");
    setEntryFee(0);
    setNominalTournament(true);
    setNominalFee(0);
    setBannerImage("");
  };

  const validateForm = () => {
    const errors: any = {};

    if (!tournamentName) {
      errors.tournamentName = "Tournament Name is required.";
    }

    if (!dateTime || new Date(dateTime).getTime() < new Date().getTime() + 15 * 60 * 1000) {
      errors.dateTime = "Tournament date must be at least 15 minutes in the future.";
    }

    if (entryFee <= 0) {
      errors.entryFee = "Entry Fee must be a positive value.";
    }

    if (nominalTournament && nominalFee <= 0) {
      errors.nominalFee = "Nominal Fee must be a positive value.";
    }

    // Check if banner image is selected
    if (!bannerImage) {
      errors.bannerImage = "Banner image is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, return true
  };

  const handleCreateTournament = async () => {
    if (!validateForm()) return; // Only proceed if form is valid

    const tournamentData: TournamentData = {
      tournamentName,
      dateTime: Math.floor(new Date(dateTime).getTime() / 1000), // Convert to UNIX timestamp
      type,
      entryFee,
      nominalTournament,
      nominalFee,
      bannerImage,
    };

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(tournamentData);
      onSuccess();
    } catch (err: any) {
      setError({ message: err.message || "An error occurred while creating the tournament" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <ToastContainer />
      <section>
        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[2.5rem] rajdhani-bold">
          {title}
        </h1>
      </section>


      <section className="mt-[0.5rem]">
        <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
          <div className="bg-[#0B0D13] rounded-[1.5rem] w-full h-full flex justify-center items-center">
            {bannerImage ? (
              <div className="w-full h-full flex justify-center items-center rounded-[1.5rem] relative">
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  className="max-w-full max-h-full object-contain rounded-[1.5rem] shadow-lg"
                />
                {/* Close icon button */}
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-700"
                >
                  <IoIosCloseCircle className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src="/create-tournament/file_upload.png"
                    alt="Upload"
                    className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem]"
                  />
                  <p className="text-center text-white rajdhani-bold text-[1rem] md:text-[1.875rem]">
                    440*255 <span className="text-[#45F882]">Below 1 MB</span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
        {formErrors.bannerImage && <p className="text-red-500">{formErrors.bannerImage}</p>} {/* Display error */}
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
              {formErrors.tournamentName && <p className="text-red-500">{formErrors.tournamentName}</p>}
            </div>

            {/* Date and Time */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Tournament Date"
                isRequired={true}
                placeHolder="Select a date and time"
                type="datetime-local"
                value={dateTime ? new Date(dateTime).toLocaleString('sv-SE').slice(0, 16) : ""} // Local timezone format
                callback={handleDateTime}
              />

              {formErrors.dateTime && <p className="text-red-500">{formErrors.dateTime}</p>}
            </div>

            {/* Entry Fee */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Entry Fee"
                isRequired={true}
                placeHolder="Enter fee amount"
                type="number"
                value={entryFee.toString()}
                callback={(e) => handleEntryFee(e)}
              />
              {formErrors.entryFee && <p className="text-red-500">{formErrors.entryFee}</p>}
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
                  value={nominalFee.toString()}
                  callback={(e) => handleNominalFee(e)}
                />
                {formErrors.nominalFee && <p className="text-red-500">{formErrors.nominalFee}</p>}
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
