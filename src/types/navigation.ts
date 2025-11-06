// Type definitions for navigation and breadcrumbs

export interface MenuSubItem {
  title: string;
  url: string;
  isActive: boolean;
}

export interface MenuItem {
  title: string;
  icon: string;
  url: string;
  isActive: boolean;
  items?: MenuSubItem[];
}

export interface Crumb {
  title: string;
  path: string;
  isRedirectOnly?: boolean;
  isLast?: boolean;
}

export interface NavigationData {
  main: MenuItem[];
  operations: MenuItem[];
  intelligence: MenuItem[];
  support: MenuItem[];
}

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}
