"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Collapsible } from "../ui/collapsible"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathName = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Ensure exact match for root ("/") and other paths
          const isActiveTitle = pathName === item.url || (item.url !== "/" && pathName.startsWith(item.url))

          return (
            <SidebarMenuItem key={item.title}>
              {item.items?.length ? (
                // Render collapsible item for menu with sub-items
                <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
                  <div>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(isActiveTitle && "bg-gray-200 rounded-md")}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isActiveSubLink = pathName === subItem.url
                        return (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className={cn(isActiveSubLink && "bg-gray-200 rounded-md")}
                          >
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </div>
                </Collapsible>
              ) : (
                // Render direct link for menu without sub-items
                <SidebarMenuButton asChild className={cn(isActiveTitle && "bg-gray-200 rounded-md")}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
