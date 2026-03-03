import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ fullScreen = true, text = "Processing..." }) {
  const [dots, setDots] = useState("");

  // Animated dots effect (psychological fast feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={fullScreen ? "loader-overlay" : "loader-inline"}>
      <div className="loader-card">
        <div className="gradient-ring"></div>
        <div className="loader-content">
          <h3>{text}{dots}</h3>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}