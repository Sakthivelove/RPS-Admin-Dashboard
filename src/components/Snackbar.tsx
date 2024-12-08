import React, { useEffect } from "react";

interface SnackbarProps {
  message: string | null;
  type: "error" | "loading" | null;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Close Snackbar after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-4 z-50 transition-all duration-300 ${
        type === "loading"
          ? "bg-indigo-400 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : ""
      }`}
    >
      <div className="text-center font-medium">{message}</div>
    </div>
  );
};

export default Snackbar;
