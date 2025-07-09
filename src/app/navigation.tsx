import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Search, Bell, User, Check, Dot } from "lucide-react";

import { AppSidebar } from "@/components/navigation/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";

type RoleContextType = {
  role: string;
  setRole: (role: string) => void;
};

const roles = ["Student", "Teacher", "Placement", "Management", "Counseller"];
const defaultRole = "Student";

const RoleContext = createContext<RoleContextType>({
  role: defaultRole,
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);

const defaultNotifications = [
  {
    id: 1,
    title: "Assignment Deadline Extended",
    message: "The deadline for DBMS assignment has been extended to June 10th.",
    read: false,
  },
  {
    id: 2,
    title: "Campus Drive by Infosys",
    message: "Infosys is conducting a drive on June 12th. Register now!",
    read: false,
  },
  {
    id: 3,
    title: "Library Maintenance",
    message: "The library will be closed for maintenance this weekend.",
    read: true,
  },
];

function Navigation() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setPopoverOpen(false);

    const basePath = {
      student: "/student",
      teacher: "/teacher",
      placement: "/placement",
      management: "/management",
    }[role.toLowerCase()];

    if (basePath) {
      navigate(basePath);
    }
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <RoleContext.Provider
      value={{ role: selectedRole, setRole: setSelectedRole }}
    >
      <SidebarProvider>
        <div className="flex h-screen w-screen bg-gray-100">
          {/* Sidebar */}
          <AppSidebar className="flex-shrink-0 bg-white" role={selectedRole} />

          {/* Main layout */}
          <SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 border-gray-200">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 w-[200px] lg:w-[300px] h-9"
                  />
                </div>

                {/* Notification Sheet */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full"
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
                      )}
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] p-4"
                  >
                    <SheetHeader>
                      <SheetTitle>Notifications</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                            !notif.read ? "bg-gray-50" : "bg-white"
                          }`}
                          onClick={() => handleNotificationClick(notif.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <Dot className="text-blue-500 h-4 w-4" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notif.message}
                          </p>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-center text-muted-foreground text-sm mt-10">
                          No notifications
                        </p>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Role Switcher Popover */}
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">User Profile</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-2">
                    <div className="text-sm mb-2">Switch Role</div>
                    <ul className="space-y-1">
                      {roles.map((role) => (
                        <li
                          key={role}
                          className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 ${
                            selectedRole === role
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }`}
                          onClick={() => handleRoleChange(role)}
                        >
                          <span>{role}</span>
                          {selectedRole === role && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </header>

            <main className="flex-1 min-w-0 overflow-auto p-4 bg-gray-50">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </RoleContext.Provider>
  );
}

export default Navigation;
