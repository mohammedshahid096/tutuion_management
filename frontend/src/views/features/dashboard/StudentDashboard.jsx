import MetaData from '@/utils/MetaData';
import MainWrapper from '@/views/layouts/Mainwrapper';
import React, { memo } from 'react';

const StudentDashboard = () => {
  return (
    <MainWrapper>
      <MetaData title="Student Dashboard | EduExcellence" />
      StudentDashboard
    </MainWrapper>
  );
};

export default memo(StudentDashboard);
