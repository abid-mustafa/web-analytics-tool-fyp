"use client";

import React, { useEffect, useState } from "react";
import Analytics from "@/components/Analytics"; // Import Analytics component
import dynamic from "next/dynamic"; // Dynamic import for client-side only components
import "./MainContent.css";

// Dynamically import Flatpickr (client-side only)
const Flatpickr = dynamic(() => import("react-flatpickr"), { ssr: false });
import "flatpickr/dist/themes/material_green.css"; // Import Flatpickr theme

const MainContent = ({ activeButton, isSidebarCollapsed }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [hydrated, setHydrated] = useState(false); // For hydration safety

  // Load saved dates from localStorage on mount
  useEffect(() => {
    setHydrated(true); // Ensure hydration is complete

    const savedFromDate = localStorage.getItem("fromDate");
    const savedToDate = localStorage.getItem("toDate");

    if (savedFromDate) setFromDate(new Date(savedFromDate));
    if (savedToDate) setToDate(new Date(savedToDate));
  }, []);

  // Save dates to localStorage whenever they change
  const handleDateChange = (type, selectedDate) => {
    const formattedDate = selectedDate[0]; // Flatpickr returns an array
    if (type === "fromDate") {
      setFromDate(formattedDate);
      localStorage.setItem("fromDate", formattedDate.toISOString());
    } else {
      setToDate(formattedDate);
      localStorage.setItem("toDate", formattedDate.toISOString());
    }
  };

  if (!hydrated) {
    // Prevent rendering until hydration is complete
    return null;
  }

  return (
    <div className={`main-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sticky Header */}
      <header className="main-header">
        <h1>{activeButton}</h1>

        {/* Global DateTime Pickers */}
        {(activeButton === "Dashboard" || activeButton === "Analytics") && (
          <div className="datetime-picker-container">
            <div className="datetime-picker">
              <label htmlFor="toDate">From:</label>
              <Flatpickr
                value={fromDate}
                onChange={(selectedDates) => handleDateChange("fromDate", selectedDates)}
                options={{
                  enableTime: false,
                  dateFormat: "Y-m-d",
                }}
                placeholder="Select a date"
                className="flatpickr"
              />
            </div>
            <div className="datetime-picker">
              <label htmlFor="toDate">To:</label>
              <Flatpickr
                value={toDate}
                onChange={(selectedDates) => handleDateChange("toDate", selectedDates)}
                options={{
                  enableTime: false,
                  dateFormat: "Y-m-d",
                }}
                placeholder="Select a date"
                className="flatpickr"
              />
            </div>
          </div>
        )}
      </header>

      <div className="main-content-body">
        {/* Conditional Rendering Based on Active Button */}
        {activeButton === "Analytics" ? (
          <Analytics fromDate={fromDate} toDate={toDate} /> // Pass datetime props
        ) : activeButton === "Dashboard" ? (
          <div className="dashboard-content">
            <p>Dashboard content goes here...</p>
          </div>
        ) : (
          <div className="empty-page">
            <p>No content available for "{activeButton}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
