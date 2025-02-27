import React from "react";
import URLS from "@/lib/urls";
import { Diamond } from "lucide-react";
import { LinkAsLoadingButton } from "..";
import Image from "next/image";

const ScheduleConsulation = () => {
  return (
    <div>
      <div className="flex justify-between mx-64">
        <div>
          <h3>Ready to bring your ideas to life?</h3>
          <p>
            Let’s see how custom solutions can help you reach your business
            goals
          </p>

          <LinkAsLoadingButton href={URLS.contactUs}>
            <Diamond />
            <span>Schedule a free consultation</span>
          </LinkAsLoadingButton>
        </div>

        <Image
          src={"/schedule-consultation/market-launch.png"}
          alt={"Market launch"}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default ScheduleConsulation;
