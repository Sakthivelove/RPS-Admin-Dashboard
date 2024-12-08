import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useChangePassword } from "../../hooks/useChangePassword";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { sidebarActive } = useSidebar();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const { mutate, isPending, error, isSuccess } = useChangePassword();

  console.log(error,"error change password")

  useEffect(() => {
    if (isSuccess) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSnackbarMessage("Password changed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
     // Handle AxiosError response structure
     const errorMsg = (error as AxiosError<ErrorResponse>)?.response?.data?.message || "Failed to update password. Please try again.";
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [error]);

  const validateForm: () => boolean = () => {
    // Ensure new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 6000); // 3000 ms = 3 seconds
      return false;
    }
  
    // Check if the new password meets criteria (e.g., minimum length)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      setErrorMessage("New password must be at least 8 characters long and include a number and a special character.");
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 6000); // 3 seconds delay
      return false;
    }
  
    // Reset error message if all validations pass
    setErrorMessage(null);
    return true;
  };
  
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({ currentPassword, newPassword });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen flex justify-center items-center p-6 sm:p-8 md:p-10`}
    >
      <div className="m-3 text-white overflow-auto bg-gray-800 p-6 w-1/2 rounded-lg">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className={`mt-4 ${isPending ? "bg-gray-500 " : "bg-indigo-600 hover:bg-indigo-700"} text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangePassword;
