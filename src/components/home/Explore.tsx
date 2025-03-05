import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { blogs } from "@/lib/constants";

const Explore = () => {
  return (
    <div className="flex flex-col items-center relative">
      {/* <Image
        src={"/explore/arc.png"}
        alt={"Decoration"}
        width={200}
        height={200}
        className="absolute left-0 bottom-20 -rotate-[30deg]"
      /> */}

      <SectionHeader label="EXPLORE" title="Blogs and News" href={URLS.blogs} />

      <div className="max-w-screen-xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.map((b, i) => (
            <BlogItemCard key={i} blog={b} />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface BlogItemCardProps {
  blog: I_Blog;
}

const BlogItemCard: React.FC<BlogItemCardProps> = ({ blog }) => {
  return (
    <li>
      <Image
        src={blog.imageUrl}
        alt={`Image for ${blog.title}`}
        width={400}
        height={400}
      />
      <p className="text-xl font-semibold">{blog.title}</p>

      <Link
        href={blog.href}
        className="flex gap-x-2 items-center text-customBlueBase hover:text-customBlueDark hover:underline"
      >
        <span>READ MORE</span>
        <FaArrowRightLong />
      </Link>
    </li>
  );
};

export default Explore;
