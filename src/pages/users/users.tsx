import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../services/userService';

const Users: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isFetching, error } = useUsers(page);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
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
