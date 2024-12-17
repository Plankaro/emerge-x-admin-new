'use client'
import React from 'react'
import NeswCardtable from '@/components/news/NeswCardtable'
import { NewsDataTable } from '@/components/news/news-data-table';
import { useGetNewsQuery } from '@/store/api/news';
export interface HeroSectionData {
  heading: string;
  banner: File | null;
  description: string;
}
const page = () => {
  const { data, refetch } = useGetNewsQuery({ page: 0, limit: 100 });
  return (
    <div className=" w-full container mx-auto  pt-4 space-y-5">
      {/* <HeroSection onSubmit={handleHeroSubmit} headingText="Hero Section Details"/> */}
      {/* <NeswCardtable /> */}
      {
        data && data?.news && data?.news.length > 0 &&
        < NewsDataTable data={data?.news} refetch={refetch} />
      }
    </div>
  )
}

export default page