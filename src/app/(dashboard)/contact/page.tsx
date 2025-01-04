
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
import { useDeleteBlogMutation } from "@/store/api/blogs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useGetContactsQuery } from "@/store/api/conatct"
import ContactTable from "@/components/contact/contact-table"


export interface Contact {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}





const page = () => {

    const router = useRouter();
    // const [deleteBlog,] = useDeleteBlogMutation();
    const { data, refetch } = useGetContactsQuery({ page: 1, limit: 100 })


    return (
        <div>
            {
                data && data.contact &&
                <ContactTable data={data?.contact} refetch={refetch} />
            }
        </div>
    )
}

export default page;





