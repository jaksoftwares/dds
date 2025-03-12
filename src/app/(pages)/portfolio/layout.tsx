import Image from "next/image";
import React from "react";

const PortfolioLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="px-96 my-12 relative">
      <div className="text-center">
        <h1 className="text-customBlueDark text-4xl">Our Portfolio</h1>
        <p className="text-lg w-2/5 mx-auto">
          Browse through our carefully crafted digital solutions that have
          helped businesses across industries achieve their goals and transform
          their digital presence.
        </p>
      </div>
      <Image
        src={"/portfolio/diamond-line-mesh.svg"}
        alt="illustration"
        width={200}
        height={200}
        className="absolute top-0 right-96"
      />
      <main className="my-36">{children}</main>
    </div>
  );
};

export default PortfolioLayout;
