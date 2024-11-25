import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { category: 'Technology', 2022: 80, 2023: 90, 2024: 70 },
  { category: 'Car Brands', 2022: 50, 2023: 60, 2024: 55 },
  { category: 'Airlines', 2022: 70, 2023: 75, 2024: 65 },
  { category: 'Sports', 2022: 85, 2023: 88, 2024: 80 },
  { category: 'Music', 2022: 60, 2023: 65, 2024: 55 },
  { category: 'Food', 2022: 90, 2023: 85, 2024: 80 },
];
// Define the type for the props, specifically the height prop
interface BarChartComponentProps {
  height?: number;
}

// Define the BarChartComponent function with the type for the props
const BarChartComponent: React.FC<BarChartComponentProps> = ({ height }) => {
  return (
    <div className="bg-[#1A1D26] p-[10px] pl-0 rounded-[8px]"> {/* Reduced padding */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }} // Adjusted margins
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="category"
            axisLine={false} // Hide the X-axis line
            tickLine={false} // Hide the tick marks on the X-axis
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false} // Hide the Y-axis line
            tickLine={false} // Hide the tick marks on the Y-axis
            tick={{ fontSize: 12, fill: '#fff' }} // Optional: Customize ticks
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="2022" fill="#8884d8" />
          <Bar dataKey="2023" fill="#82ca9d" />
          <Bar dataKey="2024" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};



export default BarChartComponent;
