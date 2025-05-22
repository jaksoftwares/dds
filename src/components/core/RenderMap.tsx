"use client";
import React, { useState } from "react";

interface RenderMapProps {
  mapSrc: string;
}

const RenderMap: React.FC<RenderMapProps> = ({ mapSrc }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="h-48 border mb-5 relative rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
          <span className="ml-2">Loading map ...</span>
        </div>
      )}

      <iframe
        src={mapSrc}
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default RenderMap;
