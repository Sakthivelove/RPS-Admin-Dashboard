import React, { useState } from "react";
import axios from "axios";
import { useSidebar } from "../../SidebarContext";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {sidebarActive} = useSidebar()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .put("/dev/settings/change-password", { currentPassword, newPassword })
      .then(() => alert("Password updated successfully"))
      .catch((error) => console.error("Error updating password:", error));
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white overflow-auto`}>
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
