"use client"
import React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Pie Chart Data related to news and blogs
const chartData = [
    { category: "Technology", visitors: 350, fill: "var(--color-tech)" },
    { category: "Health", visitors: 280, fill: "var(--color-health)" },
    { category: "Business", visitors: 240, fill: "var(--color-business)" },
    { category: "Entertainment", visitors: 150, fill: "var(--color-entertainment)" },
    { category: "Others", visitors: 100, fill: "var(--color-other)" },
]

// Chart Configuration for news and blog categories
const chartConfig: ChartConfig = {
    visitors: {
        label: "Visitors",
    },
    technology: {
        label: "Technology",
        color: "hsl(var(--chart-1))",
    },
    health: {
        label: "Health",
        color: "hsl(var(--chart-2))",
    },
    business: {
        label: "Business",
        color: "hsl(var(--chart-3))",
    },
    entertainment: {
        label: "Entertainment",
        color: "hsl(var(--chart-4))",
    },
    others: {
        label: "Others",
        color: "hsl(var(--chart-5))",
    },
}

export const PieChartComponent: React.FC = () => {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="items-center pb-0">
                <CardTitle>News and Blogs</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}