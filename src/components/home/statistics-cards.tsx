import React from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface Stat {
    title: string
    value: string
}

export const StatisticsCards: React.FC = () => {
    const stats: Stat[] = [
        { title: "Total Blogs", value: "350" },  // Total number of blogs
        { title: "Total News Articles", value: "450" },  // Total number of news articles
        { title: "Todays Blogs Published", value: "10" },  // Number of blogs/news published today
        { title: "Today News Published", value: "5" }  // Number of pending articles
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mr-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center mt-4"
                >
                    <Card className="w-full shadow-lg"> {/* Added shadow-lg for box shadow */}
                        <CardContent className="text-center mt-4">
                            <CardTitle className="text-lg font-semibold text-muted-foreground">{stat.title}</CardTitle>
                            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}
