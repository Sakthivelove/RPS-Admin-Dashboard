import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';

interface TableProps {
  columns: string[]; // Column names
  data: any[] | undefined; // Table rows (dynamic data)
  rowColor?: string; // Color for rows (default: #0F1C23)
  tableBgColor?: string; // Table background color (default: #1A1D26)
  title?: string; // Optional title for the table
  headerTextColor?: string; // Optional customizable header text color
  showSearchBar?: boolean; // Whether to show the search bar
  onSearch?: (searchTerm: string) => void; // Search functionality handler
  customCellTextColor?: (row: any, col: string) => string; // Optional custom text color for cells
  alternateColumnTextColors?: (column: string) => string[]; // Optional logic for alternate column text colors
  height?: string; // Optional height for the table
  searchPlaceholder?: string; // Optional prop to customize the search bar placeholder
  scrollX?: string;
  scrollY?: string;
  className?: string;
  page?: number; // Current page
  limit?: number; // Items per page
  onPageChange?: (newPage: number) => void; // Callback to handle page change
  totalItems?: number; // Total number of items for pagination
  loadingMessage?: string; // Custom message for loading state
  errorMessage?: string; // Custom message for error state
  isLoading?: boolean; // Loading state from parent
  error?: boolean; // Error state from parent
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowColor = 'bg-[#0F1C23]',
  tableBgColor = 'bg-[#1A1D26]',
  title,
  headerTextColor = 'text-white',
  showSearchBar = false,
  onSearch,
  customCellTextColor,
  alternateColumnTextColors,
  height = 'auto',
  searchPlaceholder = 'Search...',
  scrollX = 'auto',
  scrollY = 'auto',
  className,
  page = 1,
  limit = 10,
  onPageChange,
  totalItems = 0,
  loadingMessage = 'Loading data...',
  errorMessage = 'Error loading data, please try again.',
  isLoading = false, // Use the loading state from the parent
  error = false,   // Use the error state from the parent
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term
  const [filteredData, setFilteredData] = useState<any[]>(data || []); // Filtered data for table rows

  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / limit)); // Initialize totalPages state

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / limit)); // Recalculate totalPages when totalItems or limit changes
  }, [totalItems, limit]); 

  useEffect(() => {
    if (searchTerm) {
      // Filter rows based on search term
      const filtered = data?.filter(row =>
        columns.some(col =>
          String(row[col])?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered || []);
    } else {
      // If no search term, show all data
      setFilteredData(data || []);
    }
  }, [searchTerm, data, columns]);

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term); // Pass the search term to the parent component if provided
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={`${tableBgColor} h-full rounded-lg flex p-2 flex-col`}>
      {/* Title and SearchBar outside the scrollable content */}
      <div>
        {title && (
          <h1 className={`text-3xl font-semibold text-[#45F882] sticky top-0 z-10 bg-[#1A1D26] p-2 ${columns.length === 2 ? 'text-center' : ""}`}>
            {title}
          </h1>
        )}

        {showSearchBar && (
          <div className='flex justify-center'>
            <div className={`sticky top-16 z-10 bg-[#1A1D26] p-2 ${columns.length === 2 ? "w-1/2" : "w-full"}`}>
              <SearchBar placeholder={searchPlaceholder} onSearch={handleSearch} />
            </div>
          </div>
        )}
      </div>

      {/* Show loading message */}
      {isLoading && <div className="text-center text-white">{loadingMessage}</div>}

      {/* Show error message */}
      {error && <div className="text-center text-red-500">{errorMessage}</div>}

      {/* Show no data message */}
      {(!isLoading && !error && filteredData.length === 0) && (
        <div className="text-center text-white font-semibold flex justify-center items-center">
          No data available
        </div>
      )}

      {/* Scrollable table content */}
      <div className={`overflow-x-${scrollX} overflow-y-${scrollY} flex-grow scrollbar-thin ${className} ${columns.length === 2 ? "flex justify-center items-start" : ""}`} style={{ height }}>
        {(!isLoading && !error && filteredData.length !== 0) && <table className={`${columns.length === 2 ? "w-1/2" : "w-full"} table-auto ${tableBgColor} table-layout-auto`}>
          <thead className="sticky top-0 bg-[#1A1D26]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-2 ${idx === 0
                    ? 'text-center'
                    : idx === columns.length - 1
                      ? 'text-center'
                      : 'text-left'
                    } ${headerTextColor} break-words whitespace-normal`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? `${rowColor}` : 'bg-transparent'}`}
              >
                {columns.map((col, colIndex) => {
                  const alternateTextColors = alternateColumnTextColors
                    ? alternateColumnTextColors(col)
                    : [];

                  const textColor =
                    alternateTextColors.length > 0
                      ? alternateTextColors[rowIndex % 2]
                      : customCellTextColor
                        ? customCellTextColor(row, col)
                        : 'white'; // Default color if no alternation or custom color is provided

                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-2 ${colIndex === 0
                        ? 'text-center'
                        : colIndex === columns.length - 1
                          ? 'text-center'
                          : 'text-left'
                        } break-words whitespace-normal`} // Added classes for wrapping
                      style={{
                        color: textColor, // Set the dynamic text color
                      }}
                    >
                      {row[col]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      {/* Pagination controls */}
      <div className="flex flex-wrap justify-between items-center p-4 text-[#45F882]">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
        >
          Previous
        </button>

        <div className="flex items-center">
          <span className="mr-2">Page</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={page}
            onChange={(e) => {
              const newPage = Math.max(1, Math.min(totalPages, Number(e.target.value)));
              handlePageChange(newPage);
            }}
            className="w-16 px-2 py-1 text-center border-2 border-[#45F882] rounded-md bg-transparent text-white focus:outline-none"
          />
          <span className="ml-2">of {totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
