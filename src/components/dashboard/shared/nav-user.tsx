"use client";

import { ChevronsUpDown, LogOut,  } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,

  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useHandleLogOutMutation } from "@/redux/features/auth/authApi";

export function NavUser({ user }: any) {

  const [handleLogOut, { isLoading: handleLogOutLoading }] =
  useHandleLogOutMutation();
const handleLogOutClick = async () => {
  await handleLogOut();
  window.location.href = "/";
};
  return (
    <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage />
              <AvatarFallback className="rounded-lg">
                {user?.email?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 "
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex gap-3 items-center p-2 hover:bg-gray-100">
                <LogOut className="text-gray-600" />
                <div>
                  <button className="text-gray-800 focus:outline-none">
                    Logout
                  </button>
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 bg-white shadow-md max-w-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-gray-800">
                  Confirm Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-gray-600">
                  Are you sure you want to log out? You will need to
                  sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="mt-4 flex items-center justify-end gap-3">
                <AlertDialogCancel>
                  <button className="px-4 py-2 text-gray-700 rounded-none">
                    Cancel
                  </button>
                </AlertDialogCancel>
                <button
                  className="px-4 py-2 mt-2 md:mt-0 text-white bg-red-600  hover:bg-red-700"
                  onClick={() => {
                    handleLogOutClick();
                  }}
                >
                  {handleLogOutLoading ? "Please Wait..." : "Logout"}
                </button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
    
  );
}
