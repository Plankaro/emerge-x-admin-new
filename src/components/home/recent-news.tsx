'use client'
import { useGetNewsQuery } from '@/store/api/news';
import React, { useEffect, useState } from "react";
import Loader from '../Loader';
import { formatDate } from '@/utils/format-date';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Card {
    heading: string;
    _id: string;
    createdAt: string;
}

export const RecentNews: React.FC = () => {
    const { data: newsData } = useGetNewsQuery({ page: 1, limit: 10 });
    const [newsArticles, setNewsArticles] = useState<Card[]>([]);

    useEffect(() => {
        if (newsData && newsData?.news) {
            setNewsArticles(newsData?.news.slice(0, 5)); // Show only the latest 5 news articles
        }
    }, [newsData]);

    return (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg h-auto min-h-[25rem]">
            <h2 className="text-xl font-semibold mb-4">Recent News</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-3/5 text-left">Title</TableHead>
                        <TableHead className="w-2/5 text-left">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newsArticles.length > 0 ? (
                        newsArticles.map((news) => (
                            <TableRow key={news._id} className="min-h-[50px]">
                                <TableCell className="break-words">{news.heading}</TableCell>
                                <TableCell>{formatDate(news.createdAt)}</TableCell>
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
