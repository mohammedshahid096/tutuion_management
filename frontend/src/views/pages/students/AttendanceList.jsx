import React, { useState, useEffect, useCallback, memo } from 'react';
import StudentsListComponent from '@/views/features/students/StudentsListComponent';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, boardActions, studentActions } from '@/redux/combineActions';
import _ from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '@/utils/MetaData';
import CustomTable1 from '@/views/components/tables/TableV1';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';

const breadCrumbs = [
  { label: 'students', href: '/admin/students' },
  { label: 'attendance', href: null },
];

const headers = [
  { title: 'Summary', key: 'summary' },
  { title: 'description', key: 'description' },
  { title: 'Date', key: 'startDate' },
  { title: 'Time', key: 'time' },
  { title: 'Meet', key: 'meet' },
  { title: 'Attended', key: 'isPresent' },
];

const AttendanceList = () => {
  const { studentId } = useParams();
  const { getStudentEnrollmentListAction, getStudentAttendanceListAction } = studentActions;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enrollmentsList, attendanceList } = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({
    loading: true,
    limit: 20,
    currentPage: 1,
  });

  useEffect(() => {
    if (studentId && (!enrollmentsList || enrollmentsList?._id !== studentId)) {
      fetchStudentEnrollmentListHandler();
    }
    if (studentId && (!attendanceList || attendanceList?._id !== studentId)) {
      fetchStudentAttendanceListHandler();
    }
  }, [studentId]);

  useEffect(() => {
    if (enrollmentsList?._id === studentId && attendanceList?._id === studentId) {
      setInfo((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, [enrollmentsList, attendanceList]);

  const fetchStudentEnrollmentListHandler = useCallback(async () => {
    dispatch(getStudentEnrollmentListAction(studentId));
  }, [enrollmentsList, studentId]);

  const fetchStudentAttendanceListHandler = useCallback(
    async (queryObject) => {
      let query = {
        page: queryObject?.currentPage ?? info?.currentPage,
        limit: queryObject?.limit ?? info?.limit,
      };
      dispatch(getStudentAttendanceListAction(studentId, query));
    },
    [attendanceList, studentId, info?.currentPage, info?.limit]
  );

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <MetaData title="Attendance | EduExcellence" />
      <CustomTable1
        headers={headers}
        docs={attendanceList?.docs?.map((singleData) => ({
          ...singleData,
          startDate: moment(singleData?.startDate).format('L'),
          isPresent: singleData?.isPresent ? (
            <Badge className="">Present</Badge>
          ) : (
            <Badge className="bg-red-500 text-white">Absent</Badge>
          ),
          time: moment(singleData?.startDate).format('hh:mm A'),
          meet: (
            <a href={singleData?.googleMeet?.meetLink} target="_blank">
              link
            </a>
          ),
        }))}
        cardTitle="Attendance Data"
        loading={info?.loading}
        totalPages={attendanceList?.totalPages}
        currentPage={attendanceList?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
      />
    </MainWrapper>
  );
};

export default memo(AttendanceList);
