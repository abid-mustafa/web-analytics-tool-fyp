"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For dynamic imports
import "./Analytics.css";

// Dynamically import the related analytics components
const EventRelated = dynamic(() => import("@/components/AnalyticsDropdown/EventRelated"), {
  ssr: false,
});
const PageRelated = dynamic(() => import("@/components/AnalyticsDropdown/PageRelated"), {
  ssr: false,
});
const UserRelated = dynamic(() => import("@/components/AnalyticsDropdown/UserRelated"), {
  ssr: false,
});

// Progress Circle Component
const ProgressCircle = ({ percentage }) => {
  const radius = 30;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-circle-container">
      <svg className="progress-circle" width="76" height="76">
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      <div className="percentage">{percentage}%</div>
    </div>
  );
};

const Analytics = ({ fromDate, toDate }) => {
  const [hydrated, setHydrated] = useState(false); // For hydration safety

  // Ensure hydration is complete
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Prevent rendering until hydration is complete
    return null;
  }

  return (
    <div>
      {/* Fixed Containers */}
      {/* <div className="row fixed-row">
        <div className="fixed-container">
          <div>
            <h3>Total Sales</h3>
            <h1>$65,024</h1>
          </div>
          <ProgressCircle percentage={81} />
        </div>
        <div className="fixed-container">
          <div>
            <h3>Site Visits</h3>
            <h1>24,981</h1>
          </div>
          <ProgressCircle percentage={52} />
        </div>
        <div className="fixed-container">
          <div>
            <h3>Searches</h3>
            <h1>14,147</h1>
          </div>
          <ProgressCircle percentage={21} />
        </div>
      </div> */}

      {/* Event Related Analytics */}
      <EventRelated fromDate={fromDate} toDate={toDate} />

      {/* Page Related Analytics */}
      <PageRelated fromDate={fromDate} toDate={toDate} />

      {/* User Related Analytics */}
      <UserRelated fromDate={fromDate} toDate={toDate} />
    </div>
  );
};

export default Analytics;
