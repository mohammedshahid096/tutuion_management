import React, { useState, useEffect, useCallback, memo } from 'react';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { studentActions } from '@/redux/combineActions';
import _ from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import MetaData from '@/utils/MetaData';
import AdminMarkAttendanceComp from '@/views/features/attendance/AdminMarkAttendanceComp';
import moment from 'moment';

const breadCrumbs = [
  { label: 'students', href: '/admin/students' },
  { label: 'Day wise Attendance', href: null },
];

const classRooms = Array.from({ length: 12 }, (_, i) => i + 1);

const DataTableSkeleton = memo(({ numRows = 6, numCols = 5 }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center h-12 px-4 bg-muted text-sm font-medium">
        {Array.from({ length: numCols }).map((_, i) => (
          <div key={i} className="w-full min-w-[100px]">
            <Skeleton className="h-5 w-3/4 rounded" />
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center h-16 px-4 text-sm gap-6">
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <div key={colIndex} className="w-full min-w-[100px] py-2">
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

const AdminAttendanceMark = () => {
  const { getDateWiseAttendanceAction } = studentActions;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dateWiseAttendance, loading } = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({
    name: '',
    classRoom: '',
    date: new Date(),
    filterDocs: null,
  });

  useEffect(() => {
    if (!dateWiseAttendance) {
      fetchDateWiseAttendanceListHandler();
    }
  }, []);

  const fetchDateWiseAttendanceListHandler = useCallback(
    async (query = {}) => {
      dispatch(getDateWiseAttendanceAction(query));
    },
    [dateWiseAttendance]
  );

  const filterChangeHandlerFunction = useCallback(
    async (key, value) => {
      let updateState = {};
      if (key === 'name') {
        updateState.name = value;
        updateState.filterDocs =
          value === ''
            ? null
            : _.filter(dateWiseAttendance?.docs, (doc) =>
                doc?.student?.name?.toLowerCase().includes(value.toLowerCase())
              );
      } else if (key === 'classRoom') {
        updateState.classRoom = value === 'all' ? '' : value;
        updateState.filterDocs =
          value === 'all'
            ? null
            : _.filter(dateWiseAttendance?.docs, (doc) => doc?.class === Number(value));
      } else if (key === 'date') {
        updateState.date = value;
        let query = {
          date: moment(value).format('YYYY-MM-DD'),
        };
        fetchDateWiseAttendanceListHandler(query);
      } else if (key === 'reset') {
        updateState.name = '';
        updateState.classRoom = '';
        updateState.date = new Date();
        updateState.filterDocs = null;

        fetchDateWiseAttendanceListHandler();
      }

      setInfo((prev) => ({
        ...prev,
        ...updateState,
      }));
    },
    [info?.name, info?.classRoom, info?.date, dateWiseAttendance]
  );

  const navigateToStudentDetails = useCallback((studentDetails) => {
    navigate(`/admin/student-details/${studentDetails?._id}/student-profile`);
  }, []);

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <MetaData title="Admin Students | EduExcellence" />
      {loading ? (
        <DataTableSkeleton />
      ) : (
        <AdminMarkAttendanceComp
          classRooms={classRooms}
          data={info?.filterDocs ?? dateWiseAttendance?.docs}
          info={info}
          setInfo={setInfo}
          filterChangeHandlerFunction={filterChangeHandlerFunction}
          navigateToStudentDetails={navigateToStudentDetails}
        />
      )}
    </MainWrapper>
  );
};

export default memo(AdminAttendanceMark);
