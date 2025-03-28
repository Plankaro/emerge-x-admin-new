'use client'
import React, { useEffect } from 'react'
import NeswCardtable from '@/components/news/NeswCardtable'
import { NewsDataTable } from '@/components/news/news-data-table';
import { useGetNewsQuery } from '@/store/api/news';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export interface HeroSectionData {
  heading: string;
  banner: File | null;
  description: string;
}
const page = () => {
  const { data, refetch } = useGetNewsQuery({ page: 0, limit: 1000 });
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className=" w-full container mx-auto  pt-4 space-y-5">
      {/* <HeroSection onSubmit={handleHeroSubmit} headingText="Hero Section Details"/> */}
      {/* <NeswCardtable /> */}
      <Link href={'news/add-new'} className="">
        <Button className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white">Add News</Button>
      </Link>
      {
        data && data?.news && data?.news.length > 0 &&
        < NewsDataTable data={data?.news} refetch={refetch} />
      }
    </div>
  )
}

export default page