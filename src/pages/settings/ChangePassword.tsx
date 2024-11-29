import React, { useState } from "react";
import { useSidebar } from "../../SidebarContext";
import { useChangePassword } from "../../hooks/useChangePassword";

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

  if (isPending) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
        <div className="flex items-center">
          <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
        <div className="bg-red-500 p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-bold text-white">Error fetching Tournaments!</h2>
          <p className="mt-2 text-white">Error: {error.message}</p>
        </div>
      </div>
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
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
