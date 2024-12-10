"use client";

import React from "react";
import DynamicTable from "@/components/DynamicTable";
import "./AnalyticsDropdown.css";

const baseURL = "http://58.65.211.44:3000/api/events/";

// Helper function to format dates to MySQL format
const formatToMySQLDate = (date) => {
  const jsDate = new Date(date);
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EventRelated = ({ fromDate, toDate }) => {
  const rowsPerPage = 6;

  const formattedFromDate = formatToMySQLDate(fromDate);
  const formattedToDate = formatToMySQLDate(toDate);

  // Individual fetch functions for each table
  const fetchTable1Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}event-count-by-event-category/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable2Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}event-count-by-event-name/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable3Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}event-count-by-event-label/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  const fetchTable4Data = async (offset, tableKey) => {
    const response = await fetch(
      `${baseURL}active-users-by-event-name/?offset=${offset}&start_date=${formattedFromDate}&end_date=${formattedToDate}&tableKey=${tableKey}`
    );
    return response.json();
  };

  return (
    <div>
      <h2 className="section-header">Event Related Analytics</h2>
      <div className="columns">
        <DynamicTable
          key="event-category"
          tableKey="event-category" // Unique identifier for the table
          title="Event Count by Event Category"
          fetchData={fetchTable1Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="event-name"
          tableKey="event-name" // Unique identifier for the table
          title="Event Count by Event Name"
          fetchData={fetchTable2Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="event-label"
          tableKey="event-label" // Unique identifier for the table
          title="Event Count by Event Label"
          fetchData={fetchTable3Data}
          rowsPerPage={rowsPerPage}
        />
        <DynamicTable
          key="active-users-event"
          tableKey="active-users-event" // Unique identifier for the table
          title="Active Users by Event Name"
          fetchData={fetchTable4Data}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default EventRelated;
