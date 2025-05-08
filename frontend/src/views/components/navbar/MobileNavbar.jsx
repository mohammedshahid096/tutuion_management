import React, { memo } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNavbar = ({ navList, loginNavigate, location }) => {
  return (
    <Drawer direction="bottom" className="md:hidden">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh]">
        <div className="mt-4 flex flex-col items-center justify-center space-y-4">
          {/* <DrawerClose asChild>
            <Link to="#about" className="text-lg font-medium hover:text-primary">
              About
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="#services" className="text-lg font-medium hover:text-primary">
              Services
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="#how-it-works" className="text-lg font-medium hover:text-primary">
              How It Works
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="#pricing" className="text-lg font-medium hover:text-primary">
              Pricing
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="#testimonials" className="text-lg font-medium hover:text-primary">
              Testimonials
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="#contact" className="text-lg font-medium hover:text-primary">
              Contact
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Button className="mt-2" asChild>
              <Link to="#book">Book a Class</Link>
            </Button>
          </DrawerClose> */}

          {navList?.map((singleNav) => {
            if (location.pathname === '/') {
              return (
                <DrawerClose asChild>
                  <a className="text-lg font-medium hover:text-primary" href={singleNav?.homeRoute}>
                    {singleNav?.name}
                  </a>
                </DrawerClose>
              );
            } else {
              return (
                <DrawerClose asChild>
                  <Link to={singleNav?.route} className="text-lg font-medium hover:text-primary">
                    {singleNav?.name}
                  </Link>
                </DrawerClose>
              );
            }
          })}

          <DrawerClose asChild>
            <Link to="/boards" className="text-lg font-medium hover:text-primary">
              Syllabus
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Button className="text-lg font-medium" onClick={loginNavigate}>
              Login
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default memo(MobileNavbar);
