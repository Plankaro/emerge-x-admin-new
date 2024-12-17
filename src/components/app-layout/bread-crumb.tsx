"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

const BreadCrumb = () => {
  const pathname = usePathname()

  // Handle breadcrumb segments
  const pathSegments = pathname === "/"
    ? [{ name: "Dashboard", href: "/" }] // Special case for root
    : pathname
      .split("/")
      .filter((segment) => segment) // Remove empty segments
      .map((segment, index, array) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the segment
        href: "/" + array.slice(0, index + 1).join("/"), // Construct URL for breadcrumb link
      }))

  return (
    <div >
      <Breadcrumb>
        <BreadcrumbList>
          {/* Render each breadcrumb segment */}
          {pathSegments.map((segment, index) => (
            <React.Fragment key={segment.href}>
              <BreadcrumbItem>
                {index < pathSegments.length - 1 ? (
                  // Render as a link for all but the last segment
                  <BreadcrumbLink href={segment.href} className="text-white">
                    {segment.name}
                  </BreadcrumbLink>
                ) : (
                  // Render as plain text for the last segment
                  <BreadcrumbPage className="text-white">{segment.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumb
