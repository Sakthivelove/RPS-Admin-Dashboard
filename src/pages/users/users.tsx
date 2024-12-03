import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../services/user/userService';
import { useSidebar } from '../../context/SidebarContext';

const Users: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { sidebarActive } = useSidebar()
  const { data, isLoading, isError, isFetching, error } = useUsers(page);

  console.log("Data:", data);
  console.log("Loading:", isLoading);
  console.log("Error:", isError);
  console.log("Fetching:", isFetching);
  console.log("API Error:", error);


  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };



  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <h1>Users</h1>
      <ul>
        {data?.users?.map((user: User) => (
          <li key={user.id}>
            <p>{user.XLink}</p>
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
