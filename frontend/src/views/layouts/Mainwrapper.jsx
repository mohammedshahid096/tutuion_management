import React from 'react';
import StudentSidebar from './StudentLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { STUDENT, ADMIN } from '@/constants/roles.constants';
import AdminSidebar from './Admin';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/navbar/DashboardHeader';

const MainWrapper = ({ breadCrumbs = [], children }) => {
  const navigate = useNavigate();
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const RoleWiseSidebar = {
    [STUDENT]: StudentSidebar,
    [ADMIN]: AdminSidebar,
  };

  const SidebarComponent = RoleWiseSidebar[profileDetails?.role] || AdminSidebar;

  return (
    <SidebarComponent user={profileDetails}>
      <DashboardHeader>
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadCrumbs?.map((singleBreadcrumb, index) => (
                <React.Fragment key={'breadcrumb' + index}>
                  {singleBreadcrumb?.href ? (
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink
                        className="cursor-pointer"
                        onClick={() => navigate(singleBreadcrumb?.href)}
                      >
                        {singleBreadcrumb?.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage> {singleBreadcrumb?.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}

                  {index !== breadCrumbs?.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto w-full">{children}</div>
    </SidebarComponent>
  );
};

export default MainWrapper;
