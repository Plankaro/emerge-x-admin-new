'use client'
import { useGetNewsQuery } from '@/store/api/news'
import React, { useEffect, useState } from "react";
import Loader from '../Loader';

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
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Author</th>
                        <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {newsArticles?.map((news, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2">{news.heading}</td>
                            <td className="px-4 py-2">{news.description1}</td>
                            <td className="px-4 py-2">{news.description2}</td>
                        </tr>
                    ))}
                    {
                        newsArticles?.length === 0 &&
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