"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Maximize, ExternalLink, X } from "lucide-react";

interface SitePreviewIframeProps {
  siteUrl: string;
  className?: string;
}

const SitePreviewIframe: React.FC<SitePreviewIframeProps> = ({
  siteUrl,
  className,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isExternal = siteUrl.startsWith("http");

  return (
    <>
      {/* Main Preview Card */}
      <div
        className={`border rounded-lg shadow-md overflow-hidden ${className}`}
      >
        <div className="relative">
          {/* Iframe for site preview */}
          <iframe
            src={siteUrl}
            className="w-full h-72 border-b"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>

        {/* Buttons */}
        <div className="p-4 flex justify-between items-center">
          {/* Visit Site Button */}
          {isExternal ? (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition"
            >
              <ExternalLink size={16} />
              Visit Site
            </a>
          ) : (
            <Link href={siteUrl} passHref>
              <span className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition cursor-pointer">
                <ExternalLink size={16} />
                Visit Site
              </span>
            </Link>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg hover:shadow-sm transition"
          >
            <Maximize size={16} />
            Full Screen
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 flex items-center gap-2 text-lg border px-4 py-2 rounded-lg hover:bg-opacity-50 transition"
            >
              <X size={20} />
              Close
            </button>

            {/* Fullscreen Iframe */}
            <iframe
              src={siteUrl}
              className="w-full h-full"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SitePreviewIframe;
