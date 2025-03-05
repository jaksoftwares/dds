import URLS from "@/lib/urls";
import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import { LinkAsLoadingButton } from "..";

const ScheduleConsulation = () => {
  return (
    <div className="bg-custom-gradient text-white py-8">
      <div className="flex items-center justify-between mx-80">
        <div className="space-y-4">
          <h3 className="text-5xl">Ready to bring your ideas to life?</h3>
          <p className="text-lg w-2/3">
            Let&apos;s see how custom solutions can help you reach your business
            goals
          </p>

          <LinkAsLoadingButton
            href={URLS.contactUs}
            className="flex items-center gap-2 group"
          >
            <PiStarFourFill className="text-2xl transition-transform duration-500 group-hover:animate-spin" />
            <span className="text-lg">Schedule a free consultation</span>
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
