'use client'
import { useGetBlogsQuery } from '@/store/api/blogs';
import React, { useEffect, useState } from 'react'
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

    // const [page, setPage] = useState<number>(1);
    // const [limit, setLimit] = useState<number>(10);

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const { data: blogsData } = useGetBlogsQuery({ page: 1, limit: 10 });

    useEffect(() => {
        if (blogsData && blogsData?.blog) {
            setBlogs(blogsData?.blog);
        }
    }, [blogsData]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);  // Change locale to suit your needs
    };

    return (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <TableRow key={blog._id}>
                                <TableCell>{blog.title}</TableCell>
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
    )
}