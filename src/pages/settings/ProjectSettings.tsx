import React, { useState } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useUpdateProjectSettings } from '../../hooks/useProjectSettings';

const ProjectSettings: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { sidebarActive } = useSidebar();

  const { mutate, isPending, error } = useUpdateProjectSettings();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pass an object containing both projectName and description
    mutate({ projectName, description });
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
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto p-6 flex justify-center items-center`}>
      <div className="max-w-xl mx-auto w-1/2 bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Project Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-lg">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="mt-2 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectSettings;
