"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/utils/format-date"
import { useDeleteNewsMutation } from "@/store/api/news"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"


export interface NewsResponseType {
    _id: string;
    heading: string;
    mainDescription: string;
    description1: string;
    description2: string;
    finalDescription: string;
    heroBanner: string; // Base64-encoded image data
    featureImage: string; // Base64-encoded image data
    subFeatureImage1: string; // Base64-encoded image data
    subFeatureImage2: string; // Base64-encoded image data
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    __v: number;
}




export function NewsDataTable({ data, refetch }: { data: NewsResponseType[], refetch: () => void }) {
    console.log("🚀 ~ NewsDataTable ~ data:", data)

    const [loading,setLoading] = React.useState(false)

    const [deleteNews, isLoading] = useDeleteNewsMutation();
    const router = useRouter();


    const handleDeleteCard = async (id: string) => {
        if (window.confirm(`Are you sure you want to delete News with ID: ${id}?`)) {
            setLoading(true);
    
            const deletePromise = deleteNews(id).unwrap();
    
            toast.promise(deletePromise, {
                loading: "Deleting news...",
                success: "News deleted successfully!",
                error: "Error deleting news. Please try again.",
            });
    
            try {
                await deletePromise;
                refetch();
            } catch (error) {
                console.error("Error deleting news:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    
    const columns: ColumnDef<NewsResponseType>[] = [
        {
            accessorKey: "_id",
            header: "Sr. No.",
            cell: ({ row }) => <div>{row.index + 1}</div>,

        },
        {
            accessorKey: "heading",
            header: "Heading",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("heading")}</div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => <div className="lowercase">{
                formatDate(row.getValue("createdAt"))
            }</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original

                return (
                    <div className="flex gap-2">
                        <Button
                            className="bg-[#7cbe6e] hover:bg-[#3DA229] text-white px-4 py-2 rounded-md mb-2"
                            onClick={() => router.push(`/news/${payment._id}`)}
                        >
                            Edit/View
                        </Button>
                        <Button
                        disabled={loading}
                            variant="ghost"
                            className="bg-[#f44336] hover:bg-[#f44336] text-white px-4 py-2 rounded-md mb-2"
                            onClick={() => handleDeleteCard(payment._id)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            },
        },
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Heading..."
                    value={(table.getColumn("heading")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("heading")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
