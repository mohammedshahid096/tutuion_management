import React, { memo, useState, useCallback, useEffect } from 'react';
import MetaData from '@/utils/MetaData';
import AttendanceGraph from '@/views/components/graphsStudents/AttendanceGraph';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { Card } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { graphActions } from '@/redux/combineActions';

const StudentDashboard = () => {
  const [info, setInfo] = useState({
    loading: false,
  });

  const { getStudentDashboardListAction } = graphActions;
  const dispatch = useDispatch();
  const { attendanceGraphData, loading } = useSelector((state) => state.graphState);

  useEffect(() => {
    if (!attendanceGraphData) {
      fetchStudentDashboardGraphDataHandler();
    }
  }, []);

  const fetchStudentDashboardGraphDataHandler = useCallback(() => {
    dispatch(getStudentDashboardListAction());
  }, [attendanceGraphData]);
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
              <AttendanceGraph attendanceData={attendanceGraphData} />
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
