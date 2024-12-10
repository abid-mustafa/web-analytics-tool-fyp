"use client";

import React from "react";
import DynamicTable from "@/components/DynamicTable";
import "./AnalyticsDropdown.css";

const baseURL = "http://58.65.211.44:3000/api/pages/";

// Helper function to format dates to MySQL format
const formatToMySQLDate = (date) => {
  const jsDate = new Date(date);
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PageRelated = ({ fromDate, toDate }) => {
  const rowsPerPage = 6;

  const formattedFromDate = formatToMySQLDate(fromDate);
  const formattedToDate = formatToMySQLDate(toDate);

  // Individual fetch functions for each table
  const fetchTable1Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}views-by-page-title/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable2Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}sessions-by-page-referrer/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable3Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}users-by-page-title/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable4Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}views-by-page-location/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  return (
    <div>
      <h2 className="section-header">Page Related Analytics</h2>
      <div className="columns">
        <DynamicTable
          key="views-page-title"
          tableKey="views-page-title" // Unique identifier for the table
          title="Views by Page Title"
          fetchData={fetchTable1Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="sessions-page-referrer"
          tableKey="sessions-page-referrer" // Unique identifier for the table
          title="Sessions by Page Referrer"
          fetchData={fetchTable2Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="users-page-title"
          tableKey="users-page-title" // Unique identifier for the table
          title="Users by Page Title"
          fetchData={fetchTable3Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="views-page-location"
          tableKey="views-page-location" // Unique identifier for the table
          title="Views by Page Location"
          fetchData={fetchTable4Data}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default PageRelated;
