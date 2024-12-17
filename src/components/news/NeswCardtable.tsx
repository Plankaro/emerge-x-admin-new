"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useDeleteNewsMutation, useGetNewsQuery, } from "@/store/api/news";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import HeroSection from "../blogs/HeroSection";
import Loader from "../Loader";



interface Card {
  heading: string;
  _id: string;
  mainDescription: string;
  description1: string;
  description2: string;
  finalDescription: string;
  heroBanner: string | null;
  featureImage: string | null;
  subFeatureImage1: string | null;
  subFeatureImage2: string | null;
}

const NeswCardtable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [cards, setCards] = useState<Card[]>();
  const [heroSectionDialogOpen, setHeroSectionDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: newsData, refetch } = useGetNewsQuery({ page, limit: 10 });
  const [deleteNews] = useDeleteNewsMutation();



  useEffect(() => {
    console.log("newsData", newsData)
    if (newsData && newsData?.news) {
      setCards(newsData?.news)
      setTotalPage(newsData?.pages?.length)
    }
  }, [newsData]);

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
    if (window.confirm(`Are you sure you want to delete News with ID: ${id}?`)) {
      try {
        await deleteNews(id).unwrap();
        toast.success("News deleted successfully!");
        refetch();
        setIsLoading(false)
      } catch (error) {
        toast.error("Error deleting blog. Please try again.");
        console.error("Error deleting blog:", error);
        setIsLoading(false)
      }
    }
  };



  const handleHeroDialogOpen = () => {
    setHeroSectionDialogOpen(true);
  };

  const handleHeroDialogClose = () => {
    setHeroSectionDialogOpen(false);
  };

  const handleHeroSubmit = (data: { heading: string; banner: File | null; description: string }) => {
    console.log("Hero Section Submitted Data:", data);
    handleHeroDialogClose();
  };


  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next") setPage((prevPage) => prevPage + 1);
    if (direction === "prev" && page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Button
        onClick={handleHeroDialogOpen}
        className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white px-4 py-2 rounded-md mb-2"
      >
        Edit Hero Section
      </Button>

      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">News cards</h1>
          <Link href={'news/add-new'}>
            <Button className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white">Add News</Button>
          </Link>

        </div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards?.length ? cards?.map((card, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{card?.heading}</td>
                <td className="border px-4 py-2">
                  <div className="w-10 overflow-hidden">
                    {/* <Image
                    src={card.icon}
                    alt={card.title}
                    width={100}
                    height={100}
                  /> */}
                  </div>
                </td>
                <td className="border px-4 py-2">{card?.description1}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-wrap gap-2">

                    <Link href={`news/${card._id}`} className="bg-[#3DA229B3] text-white px-4 py-1 rounded-md hover:bg-[#3DA229] flex-1 sm:flex-none" >
                      Edit

                    </Link>
                    <Button
                      onClick={() => handleDeleteCard(card._id)}
                      variant="destructive"
                      disabled={isLoading}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-1 sm:flex-none"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            )) :
              <tr>
                <td colSpan={4} className="p-5">

                  <Loader />
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div className="pagination-controls flex flex-wrap gap-3 justify-end mt-4">
          <Button
            onClick={() => handlePagination("prev")}
            disabled={page === 1}
            className="bg-black hover:bg-gray-300"
          >
            Previous
          </Button>
          <div className="flex items-center">Page {page} of {totalPage}</div>
          <Button
            onClick={() => handlePagination("next")}
            className="bg-black hover:bg-gray-300"
          >
            Next
          </Button>
        </div>

      </div>

      <Dialog open={heroSectionDialogOpen} onOpenChange={setHeroSectionDialogOpen}>
        <DialogContent className="max-h-[90vh] sm:w-auto w-[90vw] overflow-y-auto">
          <HeroSection onSubmit={handleHeroSubmit} headingText="Hero Section Details" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NeswCardtable;
