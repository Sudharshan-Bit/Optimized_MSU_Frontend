import React, { useState } from "react";
import CORSMap from "./CORSMap";
import SiteStats from "./SiteStats";

const ParentFeature = () => {
  const [selectedLayer, setSelectedLayer] = useState(null); // Default layer
  const [is3D, setIs3D] = useState(false); // State to toggle 2D/3D view

  const toggleView = () => {
    setIs3D((prev) => !prev); // Toggle between 2D and 3D
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-5 text-center">
        <h1>CORS Sites Dashboard</h1>
        <button
          onClick={toggleView}
          className="bg-white text-blue-500 font-semibold px-4 py-2 rounded shadow-md hover:bg-blue-200 transition-all"
        >
          Switch to {is3D ? "2D" : "3D"} View
        </button>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-[5] p-2.5 relative h-[60vh] md:h-auto">
          <CORSMap selectedLayer={selectedLayer} is3D={is3D} /> {/* Pass selected layer and is3D */}
        </div>
        <div className="md:flex-1 p-5 bg-gray-200 overflow-y-auto">
          <SiteStats setSelectedLayer={setSelectedLayer} /> {/* Set selected layer */}
        </div>
      </div>
    </div>
  );
};

export default ParentFeature;

