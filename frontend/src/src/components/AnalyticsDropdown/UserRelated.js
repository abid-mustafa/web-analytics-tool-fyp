"use client";

import React from "react";
import DynamicTable from "@/components/DynamicTable";
import "./AnalyticsDropdown.css";

const baseURL = "http://58.65.211.44:3000/api/users/";

// Helper function to format dates to MySQL format
const formatToMySQLDate = (date) => {
  const jsDate = new Date(date);
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const UserRelated = ({ fromDate, toDate }) => {
  const rowsPerPage = 6;

  const formattedFromDate = formatToMySQLDate(fromDate);
  const formattedToDate = formatToMySQLDate(toDate);

  // Individual fetch functions for each table
  const fetchTable1Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-country/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable2Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-city/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable3Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-device-type/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable4Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-browser/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable5Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-operating-system/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  return (
    <div>
      <h2 className="section-header">User Related Analytics</h2>
      <div className="columns">
        <DynamicTable
          key="users-by-country"
          tableKey="users-by-country" // Unique identifier for the table
          title="Users by Country"
          fetchData={fetchTable1Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="users-by-city"
          tableKey="users-by-city" // Unique identifier for the table
          title="Users by City"
          fetchData={fetchTable2Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="users-by-device-type"
          tableKey="users-by-device-type" // Unique identifier for the table
          title="Users by Device Type"
          fetchData={fetchTable3Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="users-by-browser"
          tableKey="users-by-browser" // Unique identifier for the table
          title="Users by Browser"
          fetchData={fetchTable4Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="users-by-os"
          tableKey="users-by-os" // Unique identifier for the table
          title="Users by Operating System"
          fetchData={fetchTable5Data}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default UserRelated;
