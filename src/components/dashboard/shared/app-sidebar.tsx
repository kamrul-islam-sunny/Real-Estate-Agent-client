"use client";

import * as React from "react";
import {
  Building2,
  LayoutDashboard,
  MessageCircle,

 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";
import { useLoggedInUserQuery } from "@/redux/features/auth/authApi";


// This is sample data.
const data = {
  
  user: {
    name: "Real Estate Agency",
    email: "Agencyt@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Real Estate Agency",
      logo: LayoutDashboard,
      plan: "Real Estate Agency design",
    },
  ],
  navMain: [
    {
      title: "Real Estate Agency",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        
      ],
    },
    {
      title: "Properties",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Add Properties",
          url: "/dashboard/add-propertie",
        },
        {
          title: "Manage Properties",
          url: "/dashboard/manage-propertie",
        },
        
      ],
    },

    {
      title: "Message",
      url: "#",
      icon: MessageCircle,
      items: [
        {
          title: "Manage Messages",
          url: "/dashboard/manage-message",
        },
        
      ],
    },
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser,  } = useLoggedInUserQuery();

  console.log(currentUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser?.payload} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
