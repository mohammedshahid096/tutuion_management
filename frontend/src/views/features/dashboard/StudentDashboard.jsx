import MetaData from '@/utils/MetaData';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { LoaderPinwheel } from 'lucide-react';
import React, { memo } from 'react';

const StudentDashboard = () => {
  return (
    <MainWrapper>
      <MetaData title="Student Dashboard | EduExcellence" />
      <div className="flex flex-col items-center justify-center h-96">
        <span className="text-5xl mb-4 text-gray-400">
          <LoaderPinwheel size={'50'} className="text-black" />
        </span>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">On Progress Development</h2>
        <p className="text-gray-500">
          This feature is currently under development. Please check back soon!
        </p>
      </div>
    </MainWrapper>
  );
};

export default memo(StudentDashboard);
