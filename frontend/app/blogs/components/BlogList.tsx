import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "./BlogCard";
import axiosInstance from "@live/utils/axiosConfig";

const FEATURED = {
  href: "/blog/whats-included-wedding-photography-package",
  title:
    "What’s Included in Our Wedding Photography Package: A Complete Breakdown",
  subtitle:
    "Candid, traditional, cinematic video, drone coverage, albums, live streaming and add-ons — every part of a PK Photography wedding package, explained.",
  image: "/wedding/cover.jpg",
  date: "Aug 3, 2026",
};

const FeaturedCard: React.FC = () => (
  <Link
    href={FEATURED.href}
    data-testid="featured-blog-card"
    className="group flex justify-between border-b py-6 gap-6"
  >
    <div className="flex flex-col gap-2 flex-grow">
      <span className="inline-flex w-fit items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#FF5B22] text-white px-3 py-1 rounded-full">
        Featured
      </span>
      <h3
        className="text-[22px] font-bold leading-snug group-hover:text-[#E24A12] transition-colors cursor-pointer"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {FEATURED.title}
      </h3>
      <p className="text-gray-600 text-[15px] leading-relaxed">
        {FEATURED.subtitle}
      </p>
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <span>{FEATURED.date}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#FF5B22]">
          Read article <ArrowUpRight size={14} />
        </span>
      </div>
    </div>
    <div className="w-[160px] h-[100px] shrink-0 rounded-md overflow-hidden relative">
      <Image
        src={FEATURED.image}
        alt="PK Photography wedding package breakdown blog cover"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  </Link>
);

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(`/blogs`);
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching subServices:", error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className="lg:col-span-2">
      <FeaturedCard />
      {blogs.map((blog, idx) => (
        <BlogCard key={idx} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
