'use client'
import { useGetNewsQuery } from '@/store/api/news'
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
    mainDescription: string;
    description1: string;
    description2: string;
    finalDescription: string;
    heroBanner: string | null;
    featureImage: string | null;
    subFeatureImage1: string | null;
    subFeatureImage2: string | null;
    createdAt: string;
}

export const RecentNews: React.FC = () => {

    const { data: newsData, refetch } = useGetNewsQuery({ page: 1, limit: 10 });
    const [newsArticles, setNewsArticles] = useState<Card[]>();
    useEffect(() => {
        console.log("newsData", newsData)
        if (newsData && newsData?.news) {
            setNewsArticles(newsData?.news)
        }
    }, [newsData]);

    return (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent News</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newsArticles && newsArticles?.length > 0 ? (
                        newsArticles?.map((news) => (
                            <TableRow key={news._id}>
                                <TableCell>{news.heading}</TableCell>
                                <TableCell>{formatDate(news?.createdAt)}</TableCell>
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