import React, { useState, useEffect, useCallback, memo } from 'react';
import StudentsListComponent from '@/views/features/students/StudentsListComponent';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, boardActions, studentActions } from '@/redux/combineActions';
import _ from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '@/utils/MetaData';

const breadCrumbs = [{ label: 'attendance', href: null }];
const AttendanceList = () => {
  const { studentId } = useParams();
  const { getBatchesListAction } = batchActions;
  const { getBoardsListAction } = boardActions;
  const { getStudentsListAction } = studentActions;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enrollmentsList, enrollmentLoading } = useSelector((state) => state.studentState);

  useEffect(() => {
    if (studentId && (!enrollmentsList || enrollmentsList?._id !== studentId)) {
      fetchStudentEnrollmentListHandler();
    }
  });

  const fetchStudentEnrollmentListHandler = useCallback(async () => {
    dispatch(getStudentEnrollmentListAction(studentId));
  }, [enrollmentsList, studentId]);

  return <MainWrapper breadCrumbs={breadCrumbs}>AttendanceList</MainWrapper>;
};

export default memo(AttendanceList);
