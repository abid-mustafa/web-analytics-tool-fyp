"use client";

import React, { useState, useEffect } from "react";

const DynamicTable = ({ apiUrl }) => {
  const [data, setData] = useState(null);
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

  const renderRows = () => {
    if (!data || !data.values) return null;

    return data.values.map((row, index) => {
      // Skip the "Total" keyword row
      if (row === "Total") return null;

      // Render all other rows
      if (row && typeof row === "object") {
        return (
          <tr key={index}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex}>{value || "N/A"}</td>
            ))}
          </tr>
        );
      }
      return null; // Skip non-object values except the Total (handled below)
    });
  };

  const renderTotalRow = () => {
    if (!data || !data.values) return null;

    // Find the "Total" value (assumes it's the last numeric value in the array)
    const totalValue = data.values.find((item) => typeof item === "number");

    if (totalValue) {
      return (
        <tr>
          <td colSpan={Object.keys(data.values[0]).length - 1}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{totalValue}</strong>
          </td>
        </tr>
      );
    }

    return null; // Return null if no Total value is found
  };

  return (
    <div className="table-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && data && data.values && data.values.length > 0 ? (
        <>
          <h3>{data.name}</h3> {/* Use `name` for table title */}
          <table>
            <thead>
              <tr>
                {Object.keys(data.values[0]).map((header, index) => (
                  <th key={index}>{header.replace(/([A-Z])/g, " $1")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderRows()}
              {renderTotalRow()}
            </tbody>
          </table>
        </>
      ) : (
        !isLoading && <p>No data available</p>
      )}
    </div>
  );
};

export default DynamicTable;
