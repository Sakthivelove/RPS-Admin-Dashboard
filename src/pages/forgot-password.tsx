import React, { useState } from "react";
import logo from "../../public/RockMainLogo.png"; // Adjust the path as necessary
import { FaTelegram } from "react-icons/fa"; // Importing Telegram icon
import Button from "../components/AdminButton";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importing axios for API requests

const ForgotPassword = () => {
  const [telegramId, setTelegramId] = useState(""); // State for Telegram ID
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(""); // State to capture error messages
  const [success, setSuccess] = useState(""); // State to capture success messages
  const navigate = useNavigate();

  // Handle form submission to reset password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!telegramId) {
      setError("Telegram ID is required.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Make an API call to the backend to reset the password using the Telegram ID
      const response = await axios.post("/api/forgot-password", { telegramId });

      // Handle the response based on the API's success or failure
      if (response.status === 200) {
        setSuccess("Password reset instructions have been sent to your Telegram.");
        setTelegramId(""); // Clear the input after success
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after a delay
        }, 3000);
      }
    } catch (err) {
      // Handle error response from the API
      setError("Failed to send password reset instructions. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">

        {/* Logo Image */}
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto" // Adjust the height as needed
        />

        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }}
        >
          Forgot Password
        </h1>

        {/* Display error or success messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Form to reset password */}
        <form
          onSubmit={handleSubmit} // Form submit handler
          className="relative z-10 p-[0.07rem] rounded-lg w-[50%]"
          style={{
            background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)", // Gradient for border
          }}
        >
          <div
            className="p-8 rounded-lg bg-opacity-90"
            style={{ backgroundColor: "rgba(26, 29, 38, 1)" }} // Background color of the form
          >
            <div className="flex flex-col gap-3">
              {/* Telegram ID input with icon */}
              <div className="relative">
                <FaTelegram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Enter your Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)} // Update state with user input
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                
              </div>
              
          <div className="flex justify-center mt-6">
            <Button
              image="green"
              text={loading ? "Sending..." : "Send Reset Link"}
              onClick={handleSubmit}
              isDisabled={loading} // Disable button while loading
            />
          </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
