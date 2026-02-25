import type { AppFrameNavigationData } from '@rafal.lemieszewski/tide-ui';

export const getSidebarData = (currentPath: string): AppFrameNavigationData => {
  return {
    main: [
      {
        title: 'Home',
        icon: 'house',
        url: '/home',
        isActive: currentPath === '/home',
      },
      {
        title: 'Boards',
        icon: 'layout-dashboard',
        url: '/boards',
        isActive: currentPath === '/boards',
      },
    ],
    operations: [
      {
        title: 'Voyage economics',
        icon: 'ship',
        url: '/voyage-economics',
        isActive: currentPath === '/voyage-economics',
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
        isActive: currentPath.startsWith('/global-market'),
        items: [
          { title: 'Supply', url: '/global-market/supply', isActive: currentPath === '/global-market/supply' },
          { title: 'Commodities', url: '/global-market/commodities', isActive: currentPath === '/global-market/commodities' },
          { title: 'Freight', url: '/global-market/freight', isActive: currentPath === '/global-market/freight' },
        ],
      },
      {
        title: 'Assets',
        icon: 'container',
        url: '/assets',
        isActive: currentPath.startsWith('/assets'),
        items: [
          { title: 'Vessels', url: '/assets/vessels', isActive: currentPath === '/assets/vessels' },
          { title: 'Fleets', url: '/assets/fleets', isActive: currentPath === '/assets/fleets' },
          { title: 'Ports', url: '/assets/ports', isActive: currentPath === '/assets/ports' },
          { title: 'Canals', url: '/assets/canals', isActive: currentPath === '/assets/canals' },
        ],
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
