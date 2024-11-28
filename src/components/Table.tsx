import React from 'react';
import SearchBar from './SearchBar';

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
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowColor = 'bg-[#0F1C23]',
  tableBgColor = 'bg-[#1A1D26]',
  title,
  headerTextColor = 'text-white', // Default header text color is white
  showSearchBar = false, // Default: do not show the search bar
  onSearch, // Search functionality handler
  customCellTextColor, // Optional custom text color for cells
  alternateColumnTextColors, // Optional logic for alternate column text colors
  height = 'auto', // Default height if not provided
  searchPlaceholder = 'Search...', // Default placeholder text for search bar
}) => {
  return (
    <div className={`${tableBgColor} h-full p-4 rounded-lg`}>
      {/* Title and SearchBar outside the scrollable content */}
      <div>
        {/* Conditionally render title if provided */}
        {title && (
          <h1 className="text-3xl font-semibold text-[#45F882] sticky top-0 z-10 bg-[#1A1D26] p-4">
            {title}
          </h1>
        )}

        {/* Conditionally render SearchBar if showSearchBar is true */}
        {showSearchBar && (
          <div className="sticky top-16 z-10 bg-[#1A1D26] p-4">
            <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} />
          </div>
        )}
      </div>

      {/* Scrollable table content */}
      <div className="overflow-auto" style={{ height }}>
        <table className={`min-w-full table-auto ${tableBgColor} overflow-auto`}>
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
                    } ${headerTextColor}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? `${rowColor}` : 'bg-transparent'
                  }`}
              >
                {columns.map((col, colIndex) => {
                  // Apply alternating text colors if provided for a specific column
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
                        }`}
                      style={{
                        color: textColor, // Set the dynamic text color
                      }}
                    >
                      {col === 'Tournament Name' ? (
                        <div className="flex items-center justify-start">
                          <img
                            src={
                              rowIndex % 2 === 0
                                ? '/affiliatePanel/icons/vip_active.png'
                                : '/affiliatePanel/icons/vip_unactive.png'
                            }
                            alt="Tournament Icon"
                            className="w-6 h-6 mr-2"
                          />
                          {row[col]}
                        </div>
                      ) : (
                        row[col]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
