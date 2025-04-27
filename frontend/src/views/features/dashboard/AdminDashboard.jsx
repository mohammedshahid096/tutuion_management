import MainWrapper from '@/views/layouts/Mainwrapper';
import React, { memo } from 'react';

const breadCrumbs = [{ label: 'Analytics', href: null }];

const AdminDashboard = () => {
  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <div className=" space-y-8 p-2">
        {' '}
        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">hello world</div>
      </div>
    </MainWrapper>
  );
};

export default memo(AdminDashboard);
