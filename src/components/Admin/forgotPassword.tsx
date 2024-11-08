import React, { useState } from "react";
import logo from "../../../public/RockMainLogo.png"; // Adjust the path as necessary
import { FaEye, FaEyeSlash, FaUser, FaLock, FaTelegram } from "react-icons/fa"; // Importing eye icons and user/lock icons
import Button from "../Button";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  // Toggle the password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  // Toggle the confirm password visibility
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage: "url('../../../public/background.png')", // Updated path for the background image
      }}
    >
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative">

        {/* Logo Image */}
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto" // Adjust the height as needed
        />

        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }} // Corrected casing for color
        >
          Forgot Password
        </h1>

        <form
          className="relative z-10 p-[0.07rem] rounded-lg"
          style={{
            background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)", // Gradient for border
          }}
        >
          <div
            className="p-8 rounded-lg bg-opacity-90"
            style={{ backgroundColor: "rgba(26, 29, 38, 1)" }} // Background color of the form
          >
            <div className="flex flex-col gap-3">
              {/* Username input with icon */}
              <div className="relative">
                <FaTelegram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              {/* Create Password input with lock and eye icons */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on state
                  placeholder="Create password"
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show the appropriate eye icon */}
                </button>
              </div>

              {/* Confirm Password input with lock and eye icons */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle input type based on state
                  placeholder="Confirm Password"
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Show the appropriate eye icon */}
                </button>
              </div>

              {/* Forgot Password link positioned below the password input */}
              {/* <div className="flex justify-end">
                <a
                  href="#"
                  className="text-lg text-[rgba(69, 248, 130, 1)] px-2 py-1 rounded"
                  style={{ color: "rgba(69, 248, 130, 1)" }}
                >
                  Forgot Password?
                </a>
              </div> */}
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <Button image="green" text="reset" onClick={() => console.log("button clicked")} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
