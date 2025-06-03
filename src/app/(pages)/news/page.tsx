"use client";

import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { newsArticles } from "@/lib/constants";

const NewsPage = () => {
  const [featured, ...latest] = newsArticles;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{ backgroundImage: "url('/about/about-1.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-3xl mx-auto text-center space-y-4 z-10">
          <h1 className="text-4xl sm:text-5xl font-bold">Dovepeak Digital News</h1>
          <p className="text-lg sm:text-xl text-gray-100">
            Stay informed on our latest innovations, company highlights, partnerships, and tech thought leadership.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <Image
            src={featured.imageUrl}
            alt={featured.title}
            width={1200}
            height={600}
            className="w-full h-64 object-cover"
          />
          <div className="p-8 space-y-4">
            <span className="inline-flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" /> {featured.date}
            </span>
            <h2 className="text-2xl font-semibold text-customBlueDark">{featured.title}</h2>
            <p className="text-gray-700">{featured.excerpt}</p>
            <Link
              href={`/news/${featured.slug}`}
              className="inline-flex items-center gap-1 text-customBlue hover:underline font-medium"
            >
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="px-6 lg:px-24 py-12">
        <h3 className="text-3xl font-bold text-center text-customBlueDark mb-10">
          Latest Articles
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {latest.map((article, i) => (
            <Link
              href={`/news/${article.slug}`}
              key={i}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition duration-300 flex flex-col"
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {article.date}
                </span>
                <h4 className="text-lg font-semibold text-gray-800">{article.title}</h4>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-customBlueLight px-6 py-16 lg:px-24 text-center space-y-6 rounded-t-2xl">
        <h3 className="text-2xl font-bold text-customBlueDark">
          Stay Updated with Dovepeak News
        </h3>
        <p className="text-gray-700 max-w-xl mx-auto">
          Subscribe to our newsletter to receive regular updates on new products,
          partnerships, insights, and exclusive content from our team.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-customBlue focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewsPage;
