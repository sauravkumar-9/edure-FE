import { type LinkProps } from 'react-router-dom'

interface User {
  name: string
  email: string
  avatar: string
}

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: string
  items?: never
  className?: string
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
  className?: string

}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  hideTitle: boolean
  items: NavItem[]
}

interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
  
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink }
