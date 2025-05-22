import { whyChooseUs } from "@/lib/constants";
import URLS from "@/lib/urls";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import SectionHeader from "../core/SectionHeader";

const AboutUs = () => {
  return (
    <div className="px-4 md:px-8 lg:mx-80" id="about-us">
      {/* Flower Image - Visible on all screens */}
      <div className="relative">
        <Image
          src={"/why-choose-us/flower-shurieken.png"}
          alt={"A flower shurieken"}
          width={250}
          height={250}
          className="absolute right-0 top-0"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Image - Visible on all screens */}
        <div className="relative flex justify-center lg:justify-start">
          <Image
            src={"/why-choose-us/why-choose-us.png"}
            alt={"Two people pointing a board"}
            width={400}
            height={400}
            className="w-full max-w-sm lg:max-w-none lg:w-[500px]"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <SectionHeader
            title="Why choose us?"
            href={URLS.aboutUs}
            label="ABOUT US"
          />
          <p>
            We stand out by delivering high-quality, tailored
            solutions that meet the unique needs of businesses and
            organizations. Our expertise, innovation, and commitment to
            excellence ensure that our clients receive the best possible service
            and results.
          </p>
          <ul className="space-y-4">
            {whyChooseUs.map((w) => (
              <li key={w} className="flex gap-x-2 items-center">
                <FaCheck size={30} className="lg:w-[50px] lg:h-[50px]" />{" "}
                {/* Responsive icon size */}
                <p>{w}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
