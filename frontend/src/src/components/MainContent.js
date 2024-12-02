"use client";

import React, { useState, useEffect } from "react";
import AnalyticsData from "@/data/AnalyticsData"; // Import the flat Orders array
import "./MainContent.css";

const ProgressCircle = ({ percentage }) => {
  const radius = 30;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-circle-container">
      <svg className="progress-circle" width="76" height="76">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="#e0e0e0" strokeWidth={strokeWidth} />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      <div className="percentage">{percentage}%</div>
    </div>
  );
};

const DynamicTable = ({ apiUrl, title }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="table-container">
      <h3>{title}</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((header, index) => (
                <th key={index}>{header.replace(/([A-Z])/g, " $1")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {Object.values(row).map((value, colIdx) => (
                  <td key={colIdx}>{value || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No data available</p>
      )}
    </div>
  );
};

const MainContent = ({ activeButton, isSidebarCollapsed }) => {
  const numColumns = 3; // Number of columns
  const columns = Array.from({ length: numColumns }, () => []); // Initialize empty columns

  // Distribute tables column-first
  AnalyticsData.forEach((category, index) => {
    columns[index % numColumns].push(category);
  });

  return (
    <div
      className={`main-content ${
        isSidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <h1>{activeButton}</h1>
      <div className="columns">
        {/* Fixed Containers */}
        <div className="row fixed-row">
          <div className="column">
            <div className="fixed-container">
              <div>
                <h3>Total Sales</h3>
                <h1>$65,024</h1>
              </div>
              <ProgressCircle percentage={81} />
            </div>
          </div>
          <div className="column">
            <div className="fixed-container">
              <div>
                <h3>Site Visits</h3>
                <h1>24,981</h1>
              </div>
              <ProgressCircle percentage={52} />
            </div>
          </div>
          <div className="column">
            <div className="fixed-container">
              <div>
                <h3>Searches</h3>
                <h1>14,147</h1>
              </div>
              <ProgressCircle percentage={21} />
            </div>
          </div>
        </div>

        {/* Dynamic Tables */}
        <div className="row">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="column">
              {column.map((category, categoryIndex) => (
                <div key={categoryIndex} className="table-container">
                  <h3>{category.name}</h3> {/* Category name */}
                  {category.data && category.data.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          {Object.keys(category.data[0]).map((header, index) => (
                            <th key={index}>{header.replace(/([A-Z])/g, " $1")}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.data.map((rowData, rowIdx) => (
                          <tr key={rowIdx}>
                            {Object.values(rowData).map((value, colIdx) => (
                              <td key={colIdx}>{value || "N/A"}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Example: Adding a Dynamic Table */}
          <div className="column">
            <DynamicTable
              apiUrl="http://192.168.100.195:3000/api/events/event-count-by-event-name/?limit=5&offset=0&start_date=2024-10-06&end_date=2024-10-07" // Replace with your actual API URL
              title="Dynamic API Data Table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
