"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faHistory,
  faChartPie,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ onButtonClick, activeButton, onCollapseToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnalyticsHovered, setIsAnalyticsHovered] = useState(false);

  const buttons = [
    { name: "Dashboard", icon: faHome },
    { name: "Users", icon: faUsers },
    { name: "History", icon: faHistory },
    { name: "Analytics", icon: faChartPie },
    { name: "Settings", icon: faCog },
  ];

  const analyticsOptions = [
    "Event Related",
    "Page Related",
    "User Related",
  ];

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setIsAnalyticsHovered(false); // Close dropdown when sidebar is collapsed
    onCollapseToggle(newState);
  };

  const handleAnalyticsHover = (state) => {
    if (!isCollapsed) {
      setIsAnalyticsHovered(state);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo">
        {/* <img src="/logo.png" alt="Logo" /> */}
        {!isCollapsed && <h1>Web Insight</h1>}
      </div>
      <nav>
        <ul className="nav-list">
          {buttons.map((button) => (
            <li
              key={button.name}
              className={`nav-item ${
                activeButton === button.name ? "active" : ""
              }`}
              onMouseEnter={() =>
                button.name === "Analytics" && handleAnalyticsHover(true)
              }
              onMouseLeave={() =>
                button.name === "Analytics" && handleAnalyticsHover(false)
              }
              onClick={
                button.name === "Analytics"
                  ? () => onButtonClick("Analytics")
                  : () => onButtonClick(button.name)
              }
            >
              <div className="nav-link">
                <FontAwesomeIcon icon={button.icon} className="icon" />
                {!isCollapsed && <span>{button.name}</span>}
              </div>
              {button.name === "Analytics" && isAnalyticsHovered && !isCollapsed && (
                <ul className="dropdown-menu">
                  {analyticsOptions.map((option) => (
                    <li
                      key={option}
                      className="dropdown-item"
                      onClick={() => onButtonClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="collapse-button"
        style={{ marginBottom: "40px" }}
        onClick={toggleCollapse}
      >
        {isCollapsed ? ">" : "<"}
      </div>
    </aside>
  );
};

export default Sidebar;
