import { AppSidebar } from "@/components/app-layout/app-sidebar"
import BreadCrumb from "@/components/app-layout/bread-crumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="w-[calc(100%-16rem)]">
                <header className="flex h-16 bg-[#39A127] text-white shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <BreadCrumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 sm:p-4 p-2 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
