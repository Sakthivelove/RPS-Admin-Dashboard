import React, { useState, FormEvent } from "react";
import logo from "../../../public/RockMainLogo.png";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaTelegram } from "react-icons/fa";
import Button from "./Button";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [telegramId, setTelegramId] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleTelegramIdSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Logging in with username:", username);
  };

  const handleToggleLoginMethod = () => {
    setStep(step === 1 ? 3 : 1);
    setUsername("");
    setPassword("");
    setTelegramId("");
    setOtp("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage: "url('../../../public/background.png')",
      }}
    >
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full sm:w-auto">
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto"
        />
        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }}
        >
          Admin Login
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mb-4">
          <button
            onClick={handleToggleLoginMethod}
            className={`mx-2 px-4 py-2 rounded-lg text-white ${
              step === 1 ? "bg-green-600" : "bg-gray-600"
            } flex-grow`}
          >
            Login with Username/Password
          </button>
          <button
            onClick={handleToggleLoginMethod}
            className={`mx-2 px-4 py-2 rounded-lg text-white ${
              step === 3 ? "bg-green-600" : "bg-gray-600"
            } flex-grow`}
          >
            Login with Telegram ID
          </button>
        </div>

        {/* Step 1: Username and Password Input */}
        {step === 1 && (
          <div
            className="p-[0.07rem] rounded-lg"
            style={{
              background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            }}
          >
            <form
              className="p-8 rounded-lg"
              style={{ backgroundColor: "rgba(26, 29, 38, 1)" }}
              onSubmit={handleLoginSubmit}
            >
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <FaUser
                    color="green"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                  <input
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                    style={{
                      backgroundColor: "rgba(14, 27, 34, 1)",
                      color: "white",
                      border: "none",
                    }}
                  />
                </div>
                <div className="relative flex items-center">
                  <FaLock
                    color="green"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                    style={{
                      backgroundColor: "rgba(14, 27, 34, 1)",
                      color: "white",
                      border: "none",
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: "none", border: "none" }}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="white" />
                    ) : (
                      <FaEye color="white" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  image="green"
                  text="Login"
                  onClick={() => console.log("button clicked")}
                />
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Telegram ID Input (Before OTP) */}
        {step === 3 && (
          <div
            className="p-[0.07rem] rounded-lg"
            style={{
              background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            }}
          >
            <form
              className="p-8 rounded-lg"
              style={{ backgroundColor: "rgba(26, 29, 38, 1)" }}
              onSubmit={handleTelegramIdSubmit}
            >
              <div className="relative">
                <FaTelegram
                  color="green"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
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
                  text="Send OTP"
                  onClick={() => console.log("button clicked")}
                />
              </div>
            </form>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <div
            className="p-[0.07rem] rounded-lg"
            style={{
              background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            }}
          >
            <form
              className="p-8 rounded-lg"
              style={{ backgroundColor: "rgba(26, 29, 38, 1)" }}
              onSubmit={handleOtpSubmit}
            >
              <div className="flex flex-col gap-3">
                <div className="relative flex items-center">
                  <FaTelegram
                    color="green"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Telegram ID"
                    value={telegramId}
                    readOnly
                    className="p-2 pl-10 pr-3 rounded-md bg-gray-600 text-white focus:outline-none w-full"
                  />
                </div>
                <div className="relative flex items-center">
                  <FaLock
                    color="green"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                    style={{
                      backgroundColor: "rgba(14, 27, 34, 1)",
                      color: "white",
                      border: "none",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  image="green"
                  text="Verify OTP"
                  onClick={() => console.log("button clicked")}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
