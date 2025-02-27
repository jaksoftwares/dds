import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { blogs } from "@/lib/constants";

const Explore = () => {
  return (
    <div className="mx-64">
      <SectionHeader label="EXPLORE" title="Blogs and News" href={URLS.blogs} />

      <ul className="grid grid-cols-3">
        {blogs.map((b) => (
          <BlogItemCard blog={b} />
        ))}
      </ul>
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
      <p>{blog.title}</p>

      <Link href={blog.href}>
        <span>READ MORE</span>
        <ArrowBigRight />
      </Link>
    </li>
  );
};

export default Explore;
