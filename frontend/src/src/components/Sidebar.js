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

  const buttons = [
    { name: " Dashboard", icon: faHome },
    { name: " Users", icon: faUsers },
    { name: " History", icon: faHistory },
    { name: " Analytics", icon: faChartPie },
    { name: " Settings", icon: faCog },
  ];

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapseToggle(newState);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        {!isCollapsed && <h1>My App</h1>}
      </div>
      <nav>
        <ul className="nav-list">
          {buttons.map((button) => (
            <li
              key={button.name}
              className={`nav-item ${
                activeButton === button.name ? "active" : ""
              }`}
              onClick={() => onButtonClick(button.name)}
            >
              <FontAwesomeIcon icon={button.icon} className="icon" />
              {!isCollapsed && <span>{button.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
      <div className="collapse-button" onClick={toggleCollapse}>
        {isCollapsed ? ">" : "<"}
      </div>
    </aside>
  );
};

export default Sidebar;
