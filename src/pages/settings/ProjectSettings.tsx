import React, { useState } from "react";
import axios from "axios";

const ProjectSettings: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put("/dev/settings/projectsettings", { projectName, description })
      .then(() => alert("Project settings updated successfully"))
      .catch((error) => console.error("Error updating project settings:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Project Settings</h1>
      <div>
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProjectSettings;
