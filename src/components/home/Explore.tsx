import { blogs } from "@/lib/constants";
import { I_Blog } from "@/lib/interfaces";
import Image from "next/image";
import React from "react";
import SectionHeader from "../core/SectionHeader";

const Explore = () => {
  return (
    <div className="flex flex-col items-center relative py-32 mx-4">
      <Image
        src={"/explore/arc.png"}
        alt={"Decoration"}
        width={100}
        height={100}
        className="absolute left-0 bottom-0 -z-10"
      />

      <SectionHeader label="EXPLORE" title="Blogs and News" href={""} />

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
    <li className="shadow-md rounded-xl p-4">
      <Image
        src={blog.imageUrl}
        alt={`Image for ${blog.title}`}
        width={400}
        height={400}
      />
      <p className="text-xl font-semibold">{blog.title}</p>

      {/* <Link
        href={blog.href}
        className="flex gap-x-2 items-center text-customBlueBase hover:text-customBlueDark hover:underline"
      >
        <span>READ MORE</span>
        <FaArrowRightLong />
      </Link> */}
    </li>
  );
};

export default Explore;
