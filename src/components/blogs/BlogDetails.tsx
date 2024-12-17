"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import BlogsForm from "./BlogForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
} from "@/store/api/blogs";
import HeroSection from "./HeroSection";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "../Loader";
import { DataTableDemo } from "./BlogDataTable";

export interface Blog {
    _id: string;
    title: string;
    htmlBody: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}

export interface BlogsFormData {
    title: string;
    htmlBody: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}

const BlogDetails = () => {
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const { data: blogsData, refetch } = useGetBlogsQuery({ page, limit: 100 });
    const [deleteBlog] = useDeleteBlogMutation();

    const [heroSectionDialogOpen, setHeroSectionDialogOpen] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (blogsData && blogsData?.blog) {
            setBlogs(blogsData?.blog);
            setTotalPage(blogsData?.pages?.length)
        }
    }, [blogsData]);


    const handleHeroDialogOpen = () => {
        setHeroSectionDialogOpen(true);
    };

    const handleHeroDialogClose = () => {
        setHeroSectionDialogOpen(false);
    };

    const handlePagination = (direction: "next" | "prev") => {
        if (direction === "next") setPage((prevPage) => prevPage + 1);
        if (direction === "prev" && page > 1) setPage((prevPage) => prevPage - 1);
    };



    const handleDelete = async (id: string) => {
        if (window.confirm(`Are you sure you want to delete blog with ID: ${id}?`)) {
            try {
                await deleteBlog(id).unwrap();
                toast.success("Blog deleted successfully!");
                refetch(); // Refetch blogs after deletion
            } catch (error) {
                toast.error("Error deleting blog. Please try again.");
                console.error("Error deleting blog:", error);
            }
        }
    };

    const handleHeroSubmit = (data: { heading: string; banner: File | null; description: string }) => {
        console.log("Hero Section Submitted Data:", data);
        handleHeroDialogClose();
    };

    return (
        <div>

            <div className=" rounded-lg p-4">
                <div className="mx-auto">
                    <div className="sm:flex sm:justify-between mb-6">
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={handleHeroDialogOpen}
                                className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white px-4 py-2 rounded-md mb-2"
                            >
                                Edit Hero Section
                            </Button>
                            <Link href={'blogs/add-new'}>
                                <Button
                                    className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white px-4 py-2 rounded-md"
                                >
                                    Add Blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {
                            blogs &&
                            <DataTableDemo data={blogs} refetch={refetch} />
                        }
                    </div>
                </div>


                <Dialog open={heroSectionDialogOpen} onOpenChange={setHeroSectionDialogOpen}>
                    <DialogContent className="max-h-[90vh] sm:w-auto w-[90vw] overflow-y-auto">
                        <HeroSection onSubmit={handleHeroSubmit} headingText="Hero Section Details" />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default BlogDetails;
