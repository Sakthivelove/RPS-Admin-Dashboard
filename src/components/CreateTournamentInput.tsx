import React from "react";

interface CreateTournamentInputIF {
  inputLabel: string;
  isRequired: boolean;
  placeHolder: string;
  type: string;
  value: string | number | null; // Bind value to parent state
  callback: (value: string) => void;
  options?: string[]; // Only needed for select dropdown
}

const CreateTournamentInput: React.FC<CreateTournamentInputIF> = ({
  inputLabel,
  isRequired,
  placeHolder,
  type,
  value,
  callback,
  options
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    callback(event.target.value);
  };

  // Helper function to format the date
  const formatDate = (date: string | number | null) => {
    if (!date) return "";
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US");
  };

  // Conditional rendering based on the input type
  const renderInput = () => {
    switch (type) {
      case "text":
      case "number":
        return (
          <input
            value={value || ""}
            onChange={handleChange}
            type={type}
            className="bg-[#0F1C23] text-[1.2rem] border-[1px] border-[#969EB280] w-full py-[16px] px-[12px] rounded-[1rem] mt-[10px] text-[#969EB2] focus:outline-none "
            placeholder={placeHolder}
          />
        );
      case "date":
        return (
          <input
            value={value ? new Date(Number(value)).toISOString().split('T')[0] : ""} // Format for input field
            onChange={handleChange}
            type="date"
            className="bg-[#0F1C23] text-[1.2rem] border-[1px] border-[#969EB280] w-full py-[16px] px-[12px] rounded-[1rem] mt-[10px] text-[#969EB2] focus:outline-none "
            placeholder={placeHolder}
          />
        );
      case "select":
        return (
          <select
            value={value || ""}
            onChange={handleChange}
            className="bg-[#0F1C23] text-[1.2rem] border-[1px] border-[#969EB280] w-full py-[16px] px-[12px] rounded-[1rem] mt-[10px] text-[#969EB2] focus:outline-none"
          >
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <h1 className="capitalize text-[#45F882] poppins-regular text-[1.5rem]">
        {`${inputLabel} ${isRequired ? "*" : ""}`}
      </h1>
      {/* {type === "date" && value && (
        <p className="text-white mt-2">{formatDate(value)}</p> // Display formatted date
      )} */}
      {renderInput()}
    </div>
  );
};

export default CreateTournamentInput;
