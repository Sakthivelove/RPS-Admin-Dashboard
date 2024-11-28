import React, { useState } from 'react';
import { useWinLossHistory } from '../../hooks/useWinLossHistory';
// Use type-only import for the WinLossHistory interface
import type { WinLossHistory } from '../../services/winLossService';

const WinLossHistory: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isFetching, error } = useWinLossHistory(page);

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
      <h1>Win/Loss History</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Tournament Name</th>
            <th>Game</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.history?.map((entry: WinLossHistory, index: number) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.tournamentName}</td>
              <td>{entry.game}</td>
              <td>{entry.result}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1 || isFetching}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={isFetching}>
          Next
        </button>
      </div>

      {isFetching && <div>Fetching more data...</div>}
    </div>
  );
};

export default WinLossHistory;
