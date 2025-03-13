import Image from "next/image";
import React from "react";

const PortfolioLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative px-6 md:px-12 lg:px-24 xl:px-48 my-12">
      <div className="text-center relative z-10">
        <h1 className="text-customBlueDark text-3xl md:text-4xl font-semibold">
          Our Portfolio
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto mt-2">
          Browse through our carefully crafted digital solutions that have
          helped businesses across industries achieve their goals and transform
          their digital presence.
        </p>
      </div>

      {/* Background Image Positioned Behind the Text */}
      <div className="absolute top-0 right-6 md:right-16 lg:right-32 xl:right-48 z-0 opacity-30">
        <Image
          src={"/portfolio/diamond-line-mesh.svg"}
          alt="illustration"
          width={180}
          height={180}
          priority
        />
      </div>

      <main className="my-16 md:my-24 lg:my-36 relative z-10">{children}</main>
    </div>
  );
};

export default PortfolioLayout;
