"use client";

import React, { useState, useEffect } from "react";
import "./DynamicTable.css";

const DynamicTable = ({
  title,
  fetchData, // Function to fetch data
  tableKey, // Unique key to identify the table
  rowsPerPage = 6, // Fixed rows per page
}) => {
  const [data, setData] = useState([]); // Current data for the table
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [offset, setOffset] = useState(0); // Offset for pagination

  // Fetch data when the offset or tableKey changes
  useEffect(() => {
    const loadTableData = async () => {
      setLoading(true);
      setError(null);

      try {
        const newData = await fetchData(offset, tableKey); // Fetch data
        setData(newData); // Directly set data array
      } catch (err) {
        setError("Failed to load data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadTableData();
  }, [offset, fetchData, tableKey]);

  // Pagination: Next Page
  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + rowsPerPage);
  };

  // Pagination: Previous Page
  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - rowsPerPage));
  };

  return (
    <div className="table-container">
      {/* Table Title */}
      <h3 className="table-title">{title}</h3>

      {/* Loading State */}
      {loading && <p className="loading">Loading...</p>}

      {/* No Data Message */}
      {!loading && data.length === 0 && (
        <div className="no-data-message">
          No data was recorded at this date.
        </div>
      )}

      {/* Table Rendering */}
      {!loading && data.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header.replace(/([A-Z])/g, " $1")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value || "N/A"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0}
              className="pagination-button"
            >
              &lt; {/* Left Arrow */}
            </button>
            <button
              onClick={handleNextPage}
              disabled={data.length < rowsPerPage}
              className="pagination-button"
            >
              &gt; {/* Right Arrow */}
            </button>
          </div>
        </>
      )}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DynamicTable;
