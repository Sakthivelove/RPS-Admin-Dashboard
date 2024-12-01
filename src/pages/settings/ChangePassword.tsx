import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useChangePassword } from "../../hooks/useChangePassword";
import StatusMessage from "../../components/StatusMessage";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { sidebarActive } = useSidebar();

  // Use the custom hook
  const { mutate, isPending, error } = useChangePassword();

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

  // Conditionally render StatusMessage or the main content
  if (isPending || error) {
    return (
      <StatusMessage
        isLoading={isPending}
        error={error}
        loadingMessage="Updating password..."
        errorMessage="Failed to update password"
        className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen  flex justify-center items-center`}
      />
    );
  }

  return (
    <div
      className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"
        } h-screen flex justify-center items-center p-6 sm:p-8 md:p-10`}
    >
      <div className="m-3 text-white overflow-auto bg-gray-800 p-6 w-1/2 rounded-lg">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
