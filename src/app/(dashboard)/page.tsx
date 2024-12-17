import React from "react";
import { StatisticsCards } from "@/components/home/statistics-cards"; // Adjust the import path as necessarys
import { RecentBlogs } from "@/components/home/recent-blogs";
import { RecentNews } from "@/components/home/recent-news";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full mt-4 ml-4 gap-4 flex-col md:flex-row">
        <div className="w-full">
          <StatisticsCards />
        </div>
      </div>

      <div className="flex w-full mt-4 ml-4 gap-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <RecentBlogs />
        </div>

        <div className="w-full md:w-1/2">
          <RecentNews />
        </div>
      </div>
    </div>
  );
};

export default Page;
