import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useChangePassword } from "../../hooks/useChangePassword";
import StatusMessage from "../../components/StatusMessage";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // You need to install Heroicons if not already installed

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { sidebarActive } = useSidebar();

  // Use the custom hook
  const { mutate, isPending, error, isSuccess } = useChangePassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the new and confirm passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Trigger mutation
    mutate({ currentPassword, newPassword });
  };

  // Clear the fields after successful password change
  if (isSuccess) {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  // Conditionally render StatusMessage or the main content
  if (isPending || error) {
    return (
      <StatusMessage
        isLoading={isPending}
        error={error}
        loadingMessage="Updating password..."
        errorMessage="Failed to update password"
        className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen flex justify-center items-center`}
      />
    );
  }

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
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
