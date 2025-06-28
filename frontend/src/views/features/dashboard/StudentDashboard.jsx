import React, { memo, useState } from 'react';
import MetaData from '@/utils/MetaData';
import AttendanceGraph from '@/views/components/graphsStudents/AttendanceGraph';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { LoaderPinwheel } from 'lucide-react';
import { Card } from '@/components/ui/card';

const StudentDashboard = () => {
  const [info, setInfo] = useState({
    loading: false,
  });
  return (
    <MainWrapper>
      <MetaData title="Student Dashboard | EduExcellence" />
      {/* <div className="flex flex-col items-center justify-center h-96">
        <span className="text-5xl mb-4 text-gray-400">
          <LoaderPinwheel size={'50'} className="text-black" />
        </span>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">On Progress Development</h2>
        <p className="text-gray-500">
          This feature is currently under development. Please check back soon!
        </p>
      </div> */}

      {info?.loading ? (
        <DashboardSkeleton />
      ) : (
        <div className=" space-y-8 p-2">
          {' '}
          <div className="">
            <Card className="w-full">
              <AttendanceGraph
                attendanceData={[
                  {
                    _id: '6833b61d3bbae42ea36a37b4',
                    student: '681b01b3fab308b1358461c1',
                    startDate: '2025-05-26T02:30:00.000Z',
                    isPresent: false,
                  },
                  {
                    _id: '6833b61d3bbae42ea36a37b5',
                    student: '681b01b3fab308b1358461c1',
                    startDate: '2025-05-27T02:30:00.000Z',
                    isPresent: true,
                  },
                ]}
              />
            </Card>

            {/* <Card>
              <AdminClassWiseStudentGraph data={classWiseStudentsGraphData} />
            </Card> */}
          </div>
        </div>
      )}
    </MainWrapper>
  );
};

export default memo(StudentDashboard);
