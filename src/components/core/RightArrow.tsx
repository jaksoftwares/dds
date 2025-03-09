import Image from "next/image";
import React from "react";

const RightArrow = () => {
  return (
    <Image
      src={"/core/right-arrow.svg"}
      width={50}
      height={50}
      alt="Right arrow"
      color="white"
    />
  );
};

export default RightArrow;
