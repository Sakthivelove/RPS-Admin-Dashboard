import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../services/user/userService';
import { useSidebar } from '../../context/SidebarContext';

const Users: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { sidebarActive } = useSidebar()
  const { data, isLoading, isError, isFetching, error } = useUsers(page);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
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
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <h1>Users</h1>
      <ul>
        {data?.users?.map((user: User) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            {/* Add other user details here */}
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1 || isFetching}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={isFetching}>
          Next
        </button>
      </div>

      {isFetching && <div>Fetching more users...</div>}
    </div>
  );
};

export default Users;
