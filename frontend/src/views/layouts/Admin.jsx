import React, { useCallback, useContext, useEffect } from 'react';
import {
  School,
  Users,
  Settings2,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Wallet,
  CreditCard,
  Clock,
  GraduationCap,
  University,
  Book,
  House,
  FileText,
  Notebook,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import useLogout from '@/hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import getInitials from '@/helpers/get-initials';
import useSocket from '@/hooks/useSocket';
import Context from '@/context/context';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: School,
      isActive: false,
      items: [
        {
          title: 'Overview',
          url: '/dashboard',
        },
        {
          title: 'Analytics',
          url: '/admin/dashboard/analytics',
        },
      ],
    },

    {
      title: 'Batch',
      url: '#',
      icon: GraduationCap,
      isActive: false,
      items: [
        {
          title: 'Year Batches',
          url: '/batches',
        },
      ],
    },
    {
      title: 'Education Boards',
      url: '#',
      icon: University,
      isActive: false,
      items: [
        {
          title: 'Boards',
          url: '/admin/boards',
        },
      ],
    },
    {
      title: 'Tuition Subject',
      url: '#',
      icon: Book,
      isActive: true,
      items: [
        {
          title: 'Subjects',
          url: '/admin/subjects',
        },
        {
          title: 'Create Subject',
          url: '/admin/subject/create-subject',
        },
      ],
    },
    {
      title: 'Students',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Students List',
          url: '/admin/students',
        },
        {
          title: 'Register',
          url: '/admin/students/register',
        },
      ],
    },
    {
      title: 'Contact',
      url: '#',
      icon: FileText,
      isActive: false,
      items: [
        {
          title: 'Form Responses',
          url: '/admin/contact-forms',
        },
      ],
    },
    {
      title: 'Notes',
      url: '#',
      icon: Notebook,
      isActive: false,
      items: [
        {
          title: 'Notes',
          url: '/admin/notes',
        },
      ],
    },
  ],
  quickAccess: [
    {
      name: 'Attendance',
      url: '/admin/mark-attendance',
      icon: Clock,
    },
    {
      name: 'Syllabus',
      url: '/boards',
      icon: School,
    },
    {
      name: 'Home Page',
      url: '/',
      icon: House,
    },
  ],
};
const AdminSidebar = ({ user, children }) => {
  const logoutFunction = useLogout();
  const navigate = useNavigate();
  const {
    notificationState: { fetchNotificationsAction, notifications },
  } = useContext(Context);
  const { isConnected, socketRef } = useSocket({ isAdmin: true });
  useEffect(() => {
    fetchNotificationsAction();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <School className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold capitalize">
                      {'Tuition Management'}
                    </span>
                    <span className="truncate text-xs">Admin Portal</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarMenu>
              {data.quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">
                        {' '}
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="rounded-lg">
                          {' '}
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.name}</span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/settings/my-profile')}>
                      <Settings2 />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet />
                      Subscription
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutFunction}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AdminSidebar;
