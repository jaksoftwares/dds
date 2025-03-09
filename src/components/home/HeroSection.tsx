import URLS from "@/lib/urls";
import Image from "next/image";
import LinkAsLoadingButton from "../core/LinkAsLoadingButton";

const HeroSection = () => {
  return (
    <div className="relative p-56">
      <Image
        src={"/hero-section/star.png"}
        alt="Star"
        width={100}
        height={100}
        className="absolute left-[34.5%] top-[20%]"
      />

      <Image
        src={"/hero-section/zigzags.png"}
        alt="Zigzag lines"
        width={100}
        height={100}
        className="absolute left-[29%] bottom-[38%]"
      />

      <Image
        src={"/hero-section/diagonals.png"}
        alt="Diagonal lines"
        width={150}
        height={150}
        className="absolute right-[27%] top-[23%] -z-10"
      />

      <div className="space-y-16">
        <div className="text-center">
          <p>We transform your vision into a digital masterpiece</p>
          <p className="text-6xl font-semibold">
            Growth through Smart Solutions
          </p>
        </div>

        <div className="flex gap-x-4 items-center justify-center">
          <LinkAsLoadingButton
            href={URLS.portfolio}
            variant={"outline"}
            className="px-8 border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
          >
            View our work
          </LinkAsLoadingButton>
          <LinkAsLoadingButton href={URLS.contactUs} className="px-8">
            Get in Touch
          </LinkAsLoadingButton>
        </div>
      </div>

      <ServicesPurpleStrip />
    </div>
  );
};

export default HeroSection;

const ServicesPurpleStrip = () => {
  return <div></div>;
};
