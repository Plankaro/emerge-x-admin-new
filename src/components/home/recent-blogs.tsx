'use client'
import { useGetBlogsQuery } from '@/store/api/blogs';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Blog {
    _id: string;
    title: string;
    htmlBody: string;
    createdAt: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}

export const RecentBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const { data: blogsData } = useGetBlogsQuery({ page: 1, limit: 10 });

    useEffect(() => {
        if (blogsData && blogsData?.blog) {
            setBlogs(blogsData?.blog.slice(0, 5)); // Show only the latest 5 blogs
        }
    }, [blogsData]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg h-auto min-h-[25rem]">
            <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
            <Table>
    <TableHeader>
        <TableRow>
            <TableHead className="w-3/5 text-left">Title</TableHead>
            <TableHead className="w-2/5 text-left">Date</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {blogs.length > 0 ? (
            blogs.map((blog) => (
                <TableRow key={blog._id} className="min-h-[50px]">
                    <TableCell className="break-words">{blog.title}</TableCell>
                    <TableCell>{formatDate(blog.createdAt)}</TableCell>
                </TableRow>
            ))
        ) : (
            <TableRow>
                <TableCell colSpan={2}>
                    <Loader />
                </TableCell>
            </TableRow>
        )}
    </TableBody>
</Table>

        </div>
    );
};
