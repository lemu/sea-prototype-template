import { useLocation, useNavigate } from 'react-router';
import { AppFrame as TideAppFrame, Breadcrumb, BreadcrumbList } from '@lemu/tide-ui';
import { DynamicBreadcrumbs } from './DynamicBreadcrumbs';
import { getSidebarData } from '../utils/navigationUtils';

const mockUser = {
  name: 'Demo User',
  email: 'demo@sea.com',
};

interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') {
    return <main className="h-full">{children}</main>;
  }

  const navigationData = getSidebarData(location.pathname);

  return (
    <TideAppFrame
      navigationData={navigationData}
      user={mockUser}
      onNavigate={navigate}
      headerContent={
        <Breadcrumb>
          <BreadcrumbList>
            <DynamicBreadcrumbs />
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      {children}
    </TideAppFrame>
  );
}
