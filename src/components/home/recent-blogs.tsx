'use client'
import { useGetBlogsQuery } from '@/store/api/blogs';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader';

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
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((blog, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2">{blog?.title}</td>
                            <td className="px-4 py-2">{blog?.description}</td>
                            <td className="px-4 py-2">{formatDate(blog?.createdAt)}</td>
                        </tr>
                    ))}
                    {
                        blogs?.length === 0 &&
                        <tr>
                            <td colSpan={4}>
                                <Loader />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}