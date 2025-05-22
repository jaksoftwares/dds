"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 p-2">
      <div className="text-center bg-white bg-opacity-90 p-2 md:p-4 rounded-md shadow-lg max-w-lg md:max-w-2xl w-full">
        {/* Scaled-down Image */}
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/core/not-found.png"
            alt="Not found"
            width={300}
            height={300}
          />
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          Sorry, it seems like the page you are looking for does not exist.
        </p>

        {/* Button */}
        <Button
          onClick={router.back}
          className="mt-6 flex gap-x-2 items-center"
        >
          <FaArrowLeftLong />
          <span>Go Back</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
