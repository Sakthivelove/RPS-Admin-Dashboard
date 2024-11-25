import React, { useState, FormEvent } from "react";
import logo from "../../public/RockMainLogo.png";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Button from "./AdminButton";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Logging in with username:", username);
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
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
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
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
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
              <div className="flex justify-end">
                <Link
                  to="/forgotpassword"
                  className="text-lg text-[rgba(69, 248, 130, 1)] px-2"
                  style={{ color: "rgba(69, 248, 130, 1)" }}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text="Login"
                onClick={() => navigate("/create-admin-tournament")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
