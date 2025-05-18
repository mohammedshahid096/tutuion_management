import React, { useState, useEffect, useCallback, memo } from 'react';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { subjectActions, studentActions } from '@/redux/combineActions';
import _ from 'lodash';
import ProgressUpdateComp, {
  ProgressSkeleton,
} from '@/views/components/enrollments/ProgressUpdateComp';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetaData from '@/utils/MetaData';
import ProgressViewComp from '@/views/components/enrollments/ProgressViewComp';

const breadCrumbs = [{ label: 'students', href: '/admin/students' }];

const ProgressUpdate = () => {
  const dispatch = useDispatch();
  const { studentId, enrollmentId, subjectId } = useParams();
  const { getPublicSubjectDetailAction } = subjectActions;
  const { getStudentEnrollmentListAction, updateStudentProgressAction } = studentActions;
  const { publicSubjectDetail } = useSelector((state) => state.subjectState);
  const { enrollmentsList } = useSelector((state) => state.studentState);
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const [info, setInfo] = useState({
    loading: true,
    enrollmentDetails: null,
    enrollmentSubject: null,
    sliderProgress: {},
    isChanged: false,
    isSubmitting: false,
  });

  useEffect(() => {
    if (!publicSubjectDetail || publicSubjectDetail?._id !== subjectId) {
      fetchSubjectDetailsHandler();
    }
  }, []);

  useEffect(() => {
    if (
      publicSubjectDetail &&
      publicSubjectDetail?._id === subjectId &&
      enrollmentsList &&
      enrollmentsList?._id === studentId
    ) {
      const enrollmentDetails = _.find(enrollmentsList?.docs, { _id: enrollmentId });
      const enrollmentSubject = _.find(
        enrollmentDetails?.subjects,
        (item) => item?.subjectId?._id === subjectId
      );

      const sliderProgress = _.keyBy(
        enrollmentSubject?.chapters?.map((ch) => ({
          ...ch,
          subChapters: _.keyBy(ch.subChapters, '_id'),
        })),
        '_id'
      );

      setInfo((prev) => ({
        ...prev,
        loading: false,
        enrollmentDetails,
        enrollmentSubject,
        sliderProgress,
      }));
    }
  }, [publicSubjectDetail, enrollmentsList]);

  const fetchSubjectDetailsHandler = useCallback(() => {
    dispatch(getPublicSubjectDetailAction(subjectId));
  }, [publicSubjectDetail, subjectId]);

  return (
    <MainWrapper breadCrumbs={[{ label: 'students', href: '/admin/students' }]}>
      <MetaData title="Admin Progress Update | EduExcellence" />
      {info?.loading ? (
        <ProgressSkeleton />
      ) : (
        <ProgressViewComp
          publicSubjectDetail={publicSubjectDetail}
          info={info}
          sliderProgress={info?.sliderProgress}
        />
      )}
    </MainWrapper>
  );
};

export default memo(ProgressUpdate);
