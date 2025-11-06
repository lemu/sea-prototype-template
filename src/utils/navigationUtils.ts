// Navigation utility functions

import type { NavigationData } from '../types/navigation';

/**
 * Get user initials from name
 */
export const getUserInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Check if any child item in a menu is active
 */
export const hasActiveChild = (item: { items?: Array<{ isActive: boolean }> }): boolean => {
  return item.items ? item.items.some((subItem) => subItem.isActive) : false;
};

/**
 * Get tooltip text for menu items (includes active subitem if applicable)
 */
export const getTooltipText = (item: {
  title: string;
  items?: Array<{ title: string; isActive: boolean }>;
}): string => {
  if (item.items && item.items.length > 0) {
    const activeSubitem = item.items.find((subItem) => subItem.isActive);
    if (activeSubitem) {
      return `${item.title} → ${activeSubitem.title}`;
    }
  }
  return item.title;
};

/**
 * Generate sidebar navigation data based on current path
 * Matches the structure from the reference implementation
 */
export const getSidebarData = (currentPath: string): NavigationData => {
  return {
    main: [
      {
        title: 'Home',
        icon: 'house',
        url: '/home',
        isActive: currentPath === '/home',
      },
    ],
    operations: [
      {
        title: 'Freight planner',
        icon: 'ship',
        url: '/freight-planner',
        isActive: currentPath === '/freight-planner',
        items: [],
      },
      {
        title: 'Trade desk',
        icon: 'trending-up',
        url: '/trade-desk',
        isActive: currentPath === '/trade-desk',
        items: [],
      },
      {
        title: 'Agreements',
        icon: 'scroll-text',
        url: '/agreements',
        isActive:
          currentPath === '/agreements' ||
          currentPath === '/agreements/contracts' ||
          currentPath === '/agreements/recaps' ||
          currentPath === '/agreements/clause-library',
        items: [
          {
            title: 'Contracts',
            url: '/agreements/contracts',
            isActive: currentPath === '/agreements/contracts',
          },
          {
            title: 'Recaps',
            url: '/agreements/recaps',
            isActive: currentPath === '/agreements/recaps',
          },
          {
            title: 'Clause library',
            url: '/agreements/clause-library',
            isActive: currentPath === '/agreements/clause-library',
          },
        ],
      },
      {
        title: 'Compliance',
        icon: 'shield-check',
        url: '/compliance',
        isActive: currentPath === '/compliance',
        items: [],
      },
    ],
    intelligence: [
      {
        title: 'SeaNet',
        icon: 'map',
        url: '/seanet',
        isActive: currentPath === '/seanet',
      },
      {
        title: 'Global market',
        icon: 'globe',
        url: '/global-market',
        isActive: currentPath === '/global-market',
      },
      {
        title: 'Assets',
        icon: 'container',
        url: '/assets',
        isActive: currentPath === '/assets',
      },
      {
        title: 'Fixtures',
        icon: 'anchor',
        url: '/fixtures',
        isActive: currentPath === '/fixtures',
      },
    ],
    support: [
      {
        title: 'Notifications',
        icon: 'bell',
        url: '/notifications',
        isActive: currentPath === '/notifications',
      },
      {
        title: 'Help & support',
        icon: 'circle-help',
        url: '/help-support',
        isActive: currentPath === '/help-support',
      },
    ],
  };
};
