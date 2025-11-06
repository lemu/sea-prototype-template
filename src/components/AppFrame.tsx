import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Icon,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Kbd,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Breadcrumb,
  BreadcrumbList,
  Separator,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rafal.lemieszewski/tide-ui';
import { DynamicBreadcrumbs } from './DynamicBreadcrumbs';
import { isMacOS } from '../utils/browserUtils';
import { getSidebarData, getUserInitials, hasActiveChild, getTooltipText } from '../utils/navigationUtils';
import type { MenuItem, MenuSubItem, User } from '../types/navigation';

// Mock user data (no backend/authentication)
const mockUser: User = {
  name: 'Demo User',
  email: 'demo@sea.com',
};

// App Sidebar Component
function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarData = getSidebarData(location.pathname);
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Initialize expanded items from localStorage, or use defaults
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('sidebar-expanded-items');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to parse sidebar state from localStorage:', error);
    }
    // Default state if nothing in localStorage
    return {
      'Agreements': true,
    };
  });

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => {
      const newState = {
        ...prev,
        [itemTitle]: !prev[itemTitle],
      };
      // Persist to localStorage
      try {
        localStorage.setItem('sidebar-expanded-items', JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save sidebar state to localStorage:', error);
      }
      return newState;
    });
  };

  // Command/Search dialog keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="flex h-full flex-col"
      >
        {/* Header with Company Logo */}
        <SidebarHeader className="h-12 border-b border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:px-2 box-border">
          <div className="flex h-[22px] w-7 items-center justify-center">
            <svg
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.39355 0.688477C6.89528 0.688477 8.12094 1.67409 8.12109 3.74609V7.69043H5.5332V2.87695H3.28711V8.03125L8.12109 11.458V18.2705C8.12109 20.3262 6.92916 21.3125 4.39355 21.3125C1.85827 21.3124 0.701172 20.3261 0.701172 18.2705L0.700195 13.7412H3.28711V19.1396H5.5332V12.6777L0.701172 9.23438V3.74609C0.701322 1.67422 1.89214 0.688597 4.39355 0.688477ZM13.8379 0.6875C16.4752 0.687615 17.6152 1.67395 17.6152 3.74609V10.5312L12.6113 13.7236V19.123H15.0273V14.3096H17.6143V18.2705C17.6143 20.3262 16.4235 21.3125 13.8027 21.3125C11.1821 21.3125 10.0244 20.3262 10.0244 18.2705V3.74609H10.0254C10.0254 1.67382 11.2003 0.6875 13.8379 0.6875ZM23.333 0.6875C25.9537 0.6875 27.1113 1.67378 27.1113 3.72949V18.2539H27.1104C27.1104 20.3261 25.9363 21.3125 23.2988 21.3125C20.6612 21.3125 19.5205 20.3262 19.5205 18.2539V11.4688L24.5254 8.27637V2.87695H22.1084V7.69043H19.5215V3.72949C19.5215 1.67384 20.7124 0.687556 23.333 0.6875ZM22.1084 12.2197V19.1396H24.5254V10.5986L22.1084 12.2197ZM12.6113 11.4014L15.0273 9.78027V2.86035H12.6113V11.4014Z"
                fill="#005F85"
              />
            </svg>
          </div>
        </SidebarHeader>

        {/* Content - scrollable area */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto group-data-[collapsible=icon]:overflow-hidden" data-sidebar="content">
          {/* Search Section */}
          <div className="p-[var(--space-md)] pt-[var(--space-sm)] group-data-[collapsible=icon]:px-2">
            <div className="relative">
              <div className="absolute top-1/2 left-2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
                <Icon name="search" size="md" color="tertiary" />
              </div>
              {/* Full search button in expanded state */}
              <div className="group-data-[collapsible=icon]:hidden">
                <button
                  onClick={() => setCommandOpen(true)}
                  className="text-body-md flex h-8 w-full cursor-pointer items-center rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-3 py-1 pr-20 pl-8 text-left text-[var(--color-text-tertiary)] transition-colors hover:border-[var(--color-border-primary-bold)] hover:!bg-[var(--color-background-neutral-subtle-hovered)] focus:border-[var(--color-border-brand)] focus:ring-2 focus:ring-[var(--color-border-brand)]/20 focus:ring-offset-0 focus:outline-none active:border-[var(--color-border-primary-bold)]"
                >
                  Search
                </button>
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
                  <Kbd size="sm">{isMacOS() ? '⌘' : 'Ctrl'}</Kbd>
                  <Kbd size="sm">K</Kbd>
                </div>
              </div>

              {/* Icon-only search button in collapsed state */}
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCommandOpen(true)}
                    className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded border border-[var(--color-border-primary-subtle)] bg-transparent transition-all duration-200 group-data-[collapsible=icon]:flex hover:border-[var(--color-border-primary-bold)] hover:!bg-[var(--color-background-neutral-subtle-hovered)] focus:border-[var(--color-border-brand)] focus:ring-2 focus:ring-[var(--color-border-brand)]/20 focus:ring-offset-0 focus:outline-none active:border-[var(--color-border-primary-bold)]"
                    aria-label="Search"
                  >
                    <Icon name="search" size="md" color="tertiary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="hidden group-data-[collapsible=icon]:block"
                >
                  <div className="flex items-center gap-2">
                    <span>Search</span>
                    <div className="flex gap-1">
                      <Kbd size="sm" variant="dark">
                        {isMacOS() ? '⌘' : 'Ctrl'}
                      </Kbd>
                      <Kbd size="sm" variant="dark">
                        K
                      </Kbd>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Main Navigation */}
          <SidebarGroup className="pb-1 mt-1 p-[var(--space-sm)]">
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.main.map((item: MenuItem) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={() => navigate(item.url)}
                        >
                          <Icon name={item.icon as string} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="hidden group-data-[collapsible=icon]:block"
                      >
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Separator in collapsed state */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator layout="vertical" />
          </div>

          {/* Operations Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Operations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.operations.map((item: MenuItem) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <>
                        {/* Expanded state - regular expandable menu */}
                        <div className="group-data-[collapsible=icon]:hidden">
                          <SidebarMenuButton
                            isActive={item.isActive && !item.items?.length}
                            onClick={() => toggleExpanded(item.title)}
                          >
                            <Icon name={item.icon as string} size="sm" />
                            <span>{item.title}</span>
                            <Icon
                              name="chevron-right"
                              size="sm"
                              className={`ml-auto transition-transform ${
                                expandedItems[item.title] ? 'rotate-90' : ''
                              }`}
                            />
                          </SidebarMenuButton>
                        </div>

                        {/* Submenu items */}
                        {item.items &&
                          item.items.length > 0 &&
                          expandedItems[item.title] && (
                            <SidebarMenuSub>
                              {item.items.map((subItem: MenuSubItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    isActive={subItem.isActive}
                                    onClick={() => navigate(subItem.url)}
                                  >
                                    {subItem.title}
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}

                        {/* Collapsed state - dropdown with submenu */}
                        <div className="hidden group-data-[collapsible=icon]:block">
                          <DropdownMenu>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                  <SidebarMenuButton
                                    isActive={hasActiveChild(item)}
                                    className="cursor-pointer w-full hover:!bg-[var(--color-background-neutral-subtle-hovered)]"
                                  >
                                    <Icon name={item.icon as string} size="sm" />
                                  </SidebarMenuButton>
                                </DropdownMenuTrigger>
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="hidden group-data-[collapsible=icon]:block"
                              >
                                {getTooltipText(item)}
                              </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent
                              side="right"
                              sideOffset={8}
                              align="start"
                            >
                              <DropdownMenuLabel className="text-body-medium-sm font-medium">
                                {item.title}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {item.items.map((subItem: MenuSubItem) => (
                                <DropdownMenuItem
                                  key={subItem.title}
                                  onClick={() => navigate(subItem.url)}
                                  className={`cursor-pointer ${
                                    subItem.isActive
                                      ? 'bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)]'
                                      : ''
                                  }`}
                                >
                                  {subItem.title}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            onClick={() => navigate(item.url)}
                          >
                            <Icon name={item.icon as string} size="sm" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="hidden group-data-[collapsible=icon]:block"
                        >
                          {getTooltipText(item)}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Separator in collapsed state */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator layout="vertical" />
          </div>

          {/* Intelligence Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Intelligence
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.intelligence.map((item: MenuItem) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={() => navigate(item.url)}
                        >
                          <Icon name={item.icon as string} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="hidden group-data-[collapsible=icon]:block"
                      >
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support Section - takes remaining space and aligns to bottom */}
          <SidebarGroup className="pb-2 flex-1 flex flex-col justify-end p-[var(--space-sm)]">
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.support.map((item: MenuItem) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={() => navigate(item.url)}
                        >
                          <Icon name={item.icon as string} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="hidden group-data-[collapsible=icon]:block"
                      >
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer with User */}
        <SidebarFooter className="border-t border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:px-2">
          <UserSwitcher user={mockUser} />
        </SidebarFooter>

        <SidebarRail className="[&]:flex" />
      </Sidebar>

      {/* Command Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => window.location.reload()}>
              <Icon name="rotate-ccw" size="sm" className="mr-2" />
              <span>Reload Page</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                {isMacOS() ? '⌘' : 'Ctrl'}R
              </span>
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Icon name="search" size="sm" className="mr-2" />
              <span>Search</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                {isMacOS() ? '⌘' : 'Ctrl'}K
              </span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigation">
            {sidebarData.main.map((item: MenuItem) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.url);
                  setCommandOpen(false);
                }}
              >
                <Icon name={item.icon as string} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.operations.map((item: MenuItem) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.url);
                  setCommandOpen(false);
                }}
              >
                <Icon name={item.icon as string} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {sidebarData.intelligence.map((item: MenuItem) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.url);
                  setCommandOpen(false);
                }}
              >
                <Icon name={item.icon as string} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Settings">
            {sidebarData.support.map((item: MenuItem) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.url);
                  setCommandOpen(false);
                }}
              >
                <Icon name={item.icon as string} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}

// User Switcher Component (simplified - no team switching)
interface UserSwitcherProps {
  user: User;
}

function UserSwitcher({ user }: UserSwitcherProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:border-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto min-h-[48px] w-full justify-start rounded-md p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:min-h-[32px] group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-0"
          >
            {/* Expanded state */}
            <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:hidden">
              <Avatar size="md">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-left">
                <div className="text-body-medium-sm truncate font-medium text-[var(--color-text-primary)]">
                  {user.name}
                </div>
                <div className="text-body-xsm text-[var(--color-text-secondary)]">
                  {user.email}
                </div>
              </div>
              <Icon name="chevron-down" size="md" className="opacity-50" />
            </div>

            {/* Collapsed state */}
            <div className="hidden group-data-[collapsible=icon]:block">
              <Avatar size="sm">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width]"
          align="start"
          side="top"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar size="sm">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left">
                <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                  {user.name}
                </span>
                <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem icon="user" onClick={() => navigate('/user-profile')}>
            User profile
          </DropdownMenuItem>
          <DropdownMenuItem icon="settings" onClick={() => navigate('/organization-settings')}>
            Organization settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            icon="log-out"
            onClick={() => navigate('/')}
            destructive
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Sidebar Toggle with Tooltip and Keyboard Shortcut
function SidebarToggleWithTooltip() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '[') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <SidebarTrigger className="-ml-1" />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          <span>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          <Kbd size="sm" variant="dark">
            [
          </Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

// Sidebar state persistence wrapper
function SidebarStateManager({ children }: { children: React.ReactNode }) {
  const { state, setOpen } = useSidebar();

  // Persist sidebar state to localStorage whenever it changes
  React.useEffect(() => {
    const isOpen = state === 'expanded';
    try {
      localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
    } catch (error) {
      console.error('Failed to save sidebar state to localStorage:', error);
    }
  }, [state]);

  return <>{children}</>;
}

// Main AppFrame Component
interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const location = useLocation();

  // Get initial sidebar state from localStorage
  const [defaultOpen, setDefaultOpen] = React.useState(() => {
    try {
      const stored = localStorage.getItem('sidebar-open');
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to parse sidebar state from localStorage:', error);
    }
    return true; // Default to open
  });

  // Show content without sidebar for welcome page
  if (location.pathname === '/') {
    return <main className="h-full">{children}</main>;
  }

  return (
    <SidebarProvider className="h-full [&>div]:!block" defaultOpen={defaultOpen}>
      <SidebarStateManager>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--color-border-primary-subtle)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 box-border">
            <div className="flex items-center gap-2 px-[var(--space-md)]">
              <SidebarToggleWithTooltip />
              <Separator layout="horizontal" className="mr-2 h-4" />
              <Breadcrumb className="min-w-0 flex-1">
                <BreadcrumbList className="flex-nowrap">
                  <DynamicBreadcrumbs />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col overflow-auto min-h-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarStateManager>
    </SidebarProvider>
  );
}
