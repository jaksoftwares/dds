import { whyChooseUs } from "@/lib/constants";
import URLS from "@/lib/urls";
import { Check } from "lucide-react";
import Image from "next/image";
import SectionHeader from "../core/SectionHeader";

const AboutUs = () => {
  return (
    <div className="grid grid-cols-2 mx-64">
      <Image
        src={"/why-choose-us/why-choose-us.png"}
        alt={"Two people pointing a board"}
        width={500}
        height={500}
      />
      <div>
        <SectionHeader
          title="Why choose us?"
          href={URLS.aboutUs}
          label="ABOUT US"
        />

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra,
        </p>

        <ul>
          {whyChooseUs.map((w) => (
            <li key={w}>
              <Check />
              <p>{w}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
