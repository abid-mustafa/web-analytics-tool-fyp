"use client";

import React, { useState } from "react";
import "./Analytics.css";

const AnalyticsDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Event Related", "Page Related", "User Related"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Trigger parent handler
  };

  return (
    <div
      className="analytics-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => !selectedOption && setIsOpen(false)}
    >
      <button className="analytics-button">Analytics</button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnalyticsDropdown;
