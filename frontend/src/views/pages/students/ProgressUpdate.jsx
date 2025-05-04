import React, { useState, useEffect, useCallback, memo } from 'react';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { subjectActions } from '@/redux/combineActions';
import _ from 'lodash';
import ProgressUpdateComp, {
  ProgressSkeleton,
} from '@/views/components/enrollments/ProgressUpdateComp';
import { useParams } from 'react-router-dom';

const breadCrumbs = [{ label: 'enrollments', href: null }];

const ProgressUpdate = () => {
  const dispatch = useDispatch();
  const { studentId, enrollmentId, subjectId } = useParams();
  const { getPublicSubjectDetailAction } = subjectActions;
  const { publicSubjectDetail } = useSelector((state) => state.subjectState);

  const [info, setInfo] = useState({
    loading: true,
  });

  useEffect(() => {
    if (!publicSubjectDetail || publicSubjectDetail?._id !== subjectId) {
      fetchSubjectDetailsHandler();
    }
  }, []);

  useEffect(() => {
    if (publicSubjectDetail) {
      setInfo((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, [publicSubjectDetail]);

  const fetchSubjectDetailsHandler = useCallback(() => {
    dispatch(getPublicSubjectDetailAction(subjectId));
  }, [publicSubjectDetail, subjectId]);

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      {info?.loading ? (
        <ProgressSkeleton />
      ) : (
        <ProgressUpdateComp publicSubjectDetail={publicSubjectDetail} />
      )}
    </MainWrapper>
  );
};

export default memo(ProgressUpdate);
