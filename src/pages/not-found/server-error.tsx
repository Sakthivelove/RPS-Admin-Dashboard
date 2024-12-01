import React from "react";
import { useNavigate } from "react-router-dom";

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-500">500</h1>
      <h2 className="text-2xl font-semibold mt-4">Internal Server Error</h2>
      <p className="text-center mt-2 text-gray-600">
        Something went wrong on our end. Please try again later or go back to the homepage.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default ServerError;
