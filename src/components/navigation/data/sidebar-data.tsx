import { Command, PencilRuler } from "lucide-react";
import { type SidebarData } from "../types";
import {
  LayoutDashboard,
  CalendarCheck2,
  BookOpenCheck,
  Briefcase,
  User,
  GraduationCap,
  ClipboardList,
  Building2,
  FileBarChart,
} from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "Jay Raj",
    email: "jayRaj@gmail.edu",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "NITTE",
      logo: Command,
      plan: "Mangalore",
    },
    // {
    //   name: "Acme Inc",
    //   logo: GalleryVerticalEnd,
    //   plan: "Enterprise",
    // },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
  ],

  navGroups: [
    {
      title: "Teacher",
      hideTitle: true,
      items: [
        {
          title: "Catchup",
          url: "/teacher/catchup",
          icon: LayoutDashboard,
          className: "text-indigo-500",
        },
        {
          title: "Placements",
          url: "/placement/list",
          icon: Briefcase,
          className: "text-indigo-500",
        },
        {
          title: "Reports",
          url: "/report/list",
          icon: FileBarChart,
          className: "text-indigo-500",
        },
        {
          title: "Slot",
          url: "/teacher/slot",
          icon: BookOpenCheck,
          className: "text-indigo-500",
        },
        {
          title: "Questions",
          url: "/questions/list",
          icon: BookOpenCheck,
          className: "text-indigo-500",
        },
      ],
    },
    {
      title: "Placement",
      hideTitle: true,
      items: [
        {
          title: "Catchup",
          url: "/placement/catchup",
          icon: LayoutDashboard,
          className: "text-indigo-500",
        },
        {
          title: "Dashboard",
          url: "/placement/dashboard",
          icon: GraduationCap,
          className: "text-indigo-500",
        },
        {
          title: "Placements",
          url: "/placement/list",
          icon: Briefcase,
          className: "text-indigo-500",
        },
        {
          title: "Reports",
          url: "/report/list",
          icon: FileBarChart,
          className: "text-indigo-500",
        },
        {
          title: "Company",
          url: "/placement/companyList",
          icon: Building2,
          className: "text-indigo-500",
        },
      ],
    },
    {
      title: "Management",
      hideTitle: true,
      items: [
        {
          title: "Catchup",
          url: "/management/catchup",
          icon: LayoutDashboard,
          className: "text-indigo-500",
        },
        {
          title: "Placements",
          url: "/placement/list",
          icon: Briefcase,
          className: "text-indigo-500",
        },
        {
          title: "Reports",
          url: "/report/list",
          icon: FileBarChart,
          className: "text-indigo-500",
        },
        {
          title: "Admission",
          url: "/admission",
          icon: ClipboardList,
          className: "text-indigo-500",
        },
      ],
    },
    {
      title: "Counseller",
      hideTitle: true,
      items: [
        {
          title: "Catchup",
          url: "/counseller/catchup",
          icon: LayoutDashboard,
          className: "text-indigo-500",
        },
        {
          title: "Dashboard",
          url: "/counseller/dashboard",
          icon: Briefcase,
          className: "text-indigo-500",
        },
        {
          title: "Leads",
          url: "/leads/list",
          icon: FileBarChart,
          className: "text-indigo-500",
        },
      ],
    },
  ],
};
