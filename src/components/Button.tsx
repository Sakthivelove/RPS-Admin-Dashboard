import React from "react";

// GreenButton and YellowButton images
import greenButtonImg from "../../public/greenbutton.png";
import yellowButtonImg from "../../public/yellowbutton.png";

// Defining types for the props
interface ButtonProps {
  image: "green" | "yellow"; // Restrict to green or yellow image
  text: string; // The text to display inside the button
  onClick: () => void; // The click handler function
}

const Button: React.FC<ButtonProps> = ({ image, text, onClick }) => {
  // Determine the background image based on the 'image' prop
  const backgroundImage =
    image === "green" ? greenButtonImg : yellowButtonImg;

  return (
    <button
      onClick={onClick}
      className="w-36 h-12 flex justify-center items-center text-[rgba(11, 14, 19, 1)] font-bold text-lg border-none cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {text}
    </button>
  );
};

export default Button;
