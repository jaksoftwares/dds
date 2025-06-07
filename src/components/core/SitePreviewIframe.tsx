"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize, ExternalLink, X } from "lucide-react";

interface SitePreviewIframeProps {
  siteUrl: string;
  className?: string;
  imageUrl?: string;
}

const SitePreviewIframe: React.FC<SitePreviewIframeProps> = ({
  siteUrl,
  className = "",
  imageUrl,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Main Preview Card */}
      <div
        className={`w-full max-w-full border rounded-lg shadow-md overflow-hidden bg-white ${className}`}
      >
        <div className="relative w-full aspect-[16/9]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Site Hero"
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Preview Available</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="p-4 flex justify-between items-center flex-wrap gap-2">
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition text-sm"
          >
            <ExternalLink size={16} />
            Visit Site
          </a>

          {imageUrl && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition text-sm"
            >
              <Maximize size={16} />
              Full Screen
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && imageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full h-full">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 flex items-center gap-2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-lg z-10"
            >
              <X size={20} />
              Close
            </button>
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt="Full Screen Hero"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SitePreviewIframe;
