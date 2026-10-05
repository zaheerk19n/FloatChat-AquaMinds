import { 
  BarChart3, 
  Bot, 
  FileText, 
  Home, 
  LayoutDashboard, 
  TrendingUp,
  Anchor,
  Waves,
  Navigation
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Chat", url: "/chat", icon: Bot },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
]

const oceanFeatures = [
  { title: "ARGO Floats", url: "/argo", icon: Anchor },
  { title: "Ocean Health", url: "/health", icon: Waves },
  { title: "Navigation", url: "/navigation", icon: Navigation },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gradient-deep">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent/50">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">Ocean Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {oceanFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent/50">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gradient-deep">
        <div className="p-4 text-center">
          {!isCollapsed && (
            <div className="text-xs text-sidebar-foreground/60">
              <p>Powered by AquaMind</p>
              <p className="mt-1">Ocean Intelligence Platform</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}