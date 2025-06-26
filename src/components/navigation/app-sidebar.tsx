import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/navigation/nav-group";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/navigation/team-switcher";
import { sidebarData } from "./data/sidebar-data";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: string;
};

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  // Get groups based on role
  const filteredNavGroups = sidebarData.navGroups.filter((group) => {
    return (
      group.title.toLowerCase() === role.toLowerCase() ||
      group.title === "Pages" ||
      group.title === "Other"
    );
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-2">
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>

      <SidebarContent>
        {filteredNavGroups.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
