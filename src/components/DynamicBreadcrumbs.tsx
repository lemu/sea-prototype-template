import * as React from 'react';
import { useLocation, useNavigate, useMatches } from 'react-router';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@rafal.lemieszewski/tide-ui';
import type { Crumb } from '../types/navigation';

/**
 * Dynamic Breadcrumbs Component
 * Uses React Router 7's useMatches to build breadcrumb trails
 *
 * Route handles should define breadcrumbs like:
 * <Route
 *   path="/settings"
 *   handle={{ crumb: () => "Settings", redirectOnly: false }}
 * />
 */
export function DynamicBreadcrumbs() {
  const navigate = useNavigate();
  const matches = useMatches();
  const location = useLocation();

  // Filter matches that have breadcrumb handles
  const routeCrumbs = matches
    .filter(
      (match) =>
        match &&
        typeof match === 'object' &&
        'handle' in match &&
        match.handle &&
        typeof match.handle === 'object' &&
        'crumb' in match.handle,
    )
    .map((match: unknown) => {
      const matchTyped = match as {
        handle: { crumb: (match: unknown) => string; redirectOnly?: boolean };
        pathname: string;
      };
      const handle = matchTyped.handle;
      const crumbFn = handle?.crumb;
      const path = matchTyped.pathname;
      const isRedirectOnly = handle?.redirectOnly || false;

      const title =
        typeof crumbFn === 'function'
          ? crumbFn(matchTyped)
          : String(crumbFn || '');
      return { title, path, isRedirectOnly };
    });

  // Build final breadcrumb array
  let crumbs: Crumb[] = [];

  // If we're not on Home, add Home as first item
  if (location.pathname !== '/home') {
    crumbs.push({ title: 'Home', path: '/home' });
  }

  // Add route-based crumbs
  crumbs = crumbs.concat(routeCrumbs);

  // Mark the last item
  crumbs = crumbs.map((crumb, index, array) => ({
    ...crumb,
    isLast: index === array.length - 1,
  }));

  // If no crumbs, show default
  if (crumbs.length === 0) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
          Home
        </BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={`${crumb.path}-${index}`}>
          <BreadcrumbItem>
            {crumb.isLast ? (
              <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
                {crumb.title}
              </BreadcrumbPage>
            ) : crumb.isRedirectOnly ? (
              <span className="block max-w-[100px] truncate text-[var(--color-text-secondary)] sm:max-w-none">
                {crumb.title}
              </span>
            ) : (
              <BreadcrumbLink
                onClick={() => navigate(crumb.path)}
                className="block max-w-[100px] cursor-pointer truncate sm:max-w-none"
              >
                {crumb.title}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!crumb.isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </>
  );
}
