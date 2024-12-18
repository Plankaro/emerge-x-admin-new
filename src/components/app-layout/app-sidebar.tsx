"use client"

import * as React from "react"
import {
  AudioWaveform,
  ClockArrowDown,
  Command,
  Contact,
  GitPullRequest,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/app-layout/nav-main"
import { NavUser } from "@/components/app-layout/nav-user"
import { TeamSwitcher } from "@/components/app-layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jp=g",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: SquareTerminal,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "News",
      url: "/news",
      icon: AudioWaveform,
    },
    {
      title: "Blog",
      url: "/blogs",
      icon: Command,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: Contact,
    },
    {
      title: "Demo Requests",
      url: "/demorequest",
      icon: ClockArrowDown,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
