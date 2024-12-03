interface createTournamentInputIF {
    inputLabel: string;
    isRequired: boolean;
    placeHolder: string;
    type: string;
    value: string | number | null;  // Bind value to parent state
    callback: (value: string) => void;
  };
  
  const CreateTournamentInput: React.FC<createTournamentInputIF> = ({
    inputLabel,
    isRequired,
    placeHolder,
    type,
    value,
    callback,
  }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      callback(event.target.value);
    };
  
    return (
      <div className="">
        <h1 className="capitalize text-[#45F882] poppins-regular text-[1.5rem]">
          {`${inputLabel} ${isRequired ? "*" : ""}`}
        </h1>
        <input
          value={value || ""}
          onChange={handleChange}
          type={type}
          className="bg-[#0F1C23] text-[1.2rem] border-[1px] border-[#969EB280] w-full py-[16px] px-[12px] rounded-[1rem] mt-[10px] text-[#969EB2] focus:outline-none "
          placeholder={placeHolder}
        />
      </div>
    );
  };
  
  export default CreateTournamentInput;
  