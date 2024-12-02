"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Sidebar component
import MainContent from "@/components/MainContent"; // MainContent component

const Page: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleSidebarClick = (buttonName: string): void => {
    setActiveButton(buttonName);
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
