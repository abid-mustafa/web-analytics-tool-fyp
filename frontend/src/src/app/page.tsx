"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Sidebar component
import MainContent from "@/components/MainContent"; // MainContent component

const Page: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedButton = localStorage.getItem("activeButton");
    if (savedButton) {
      setActiveButton(savedButton);
    }
  }, []);

  // Save activeButton state to localStorage whenever it changes
  const handleSidebarClick = (buttonName: string): void => {
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
  };

  const handleCollapseToggle = (isCollapsed: boolean): void => {
    setIsSidebarCollapsed(isCollapsed);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents unwanted scrollbars
      }}
    >
      {/* Sidebar Component */}
      <Sidebar
        onButtonClick={handleSidebarClick}
        activeButton={activeButton}
        onCollapseToggle={handleCollapseToggle}
      />

      {/* MainContent Component */}
      <MainContent
        activeButton={activeButton}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </div>
  );
};

export default Page;
