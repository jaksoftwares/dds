"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize, ExternalLink, X } from "lucide-react";

interface SitePreviewIframeProps {
  siteUrl: string;
  className?: string;
  iframeHeight?: string;
  imageUrl?: string;
}

const SitePreviewIframe: React.FC<SitePreviewIframeProps> = ({
  siteUrl,
  className,
  iframeHeight = "h-96",
  imageUrl,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Main Preview Card */}
      <div
        className={`border rounded-lg shadow-md overflow-hidden ${className} bg-white`}
      >
        <div className="relative w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Site Hero"
              width={1200}
              height={800}
              className={`w-full object-cover ${iframeHeight}`}
            />
          ) : (
            <div
              className={`w-full bg-gray-200 flex items-center justify-center ${iframeHeight}`}
            >
              <span className="text-gray-500">No Preview Available</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="p-4 flex justify-between items-center">
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition"
          >
            <ExternalLink size={16} />
            Visit Site
          </a>

          {/* Fullscreen Button */}
          {imageUrl && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition"
            >
              <Maximize size={16} />
              Full Screen
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Dialog */}
      {isFullscreen && imageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full h-full">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 flex items-center gap-2 text-lg border px-4 py-2 rounded-lg hover:bg-opacity-50 transition z-10"
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
