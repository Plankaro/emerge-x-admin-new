
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useGetContactsQuery } from "@/store/api/conatct"
import ContactTable from "@/components/contact/contact-table"
import { useGetDemoRequestsQuery } from "@/store/api/demorequest"


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
    const { data, refetch } = useGetDemoRequestsQuery({ page: 1, limit: 100 })

    return (
        <div>
            {
                data && data.demoRequest &&
                <ContactTable data={data?.demoRequest} refetch={refetch} />
            }
        </div>
    )
}

export default page;





