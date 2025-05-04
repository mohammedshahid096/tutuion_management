import React, { useState, useEffect, useCallback, memo } from 'react';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { subjectActions, studentActions } from '@/redux/combineActions';
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
  const { getStudentEnrollmentListAction } = studentActions;
  const { publicSubjectDetail } = useSelector((state) => state.subjectState);
  const { singleStudentDetail, enrollmentsList } = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({
    loading: true,
    enrollmentDetails: null,
    sliderProgress: {},
  });

  useEffect(() => {
    if (!publicSubjectDetail || publicSubjectDetail?._id !== subjectId) {
      fetchSubjectDetailsHandler();
    }

    if (!enrollmentsList || enrollmentsList?._id !== studentId) {
      fetchStudentEnrollmentListHandler();
    }
  }, []);

  useEffect(() => {
    if (
      publicSubjectDetail &&
      publicSubjectDetail?._id === subjectId &&
      enrollmentsList &&
      enrollmentsList?._id === studentId
    ) {
      setInfo((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, [publicSubjectDetail, enrollmentsList]);

  const fetchSubjectDetailsHandler = useCallback(() => {
    dispatch(getPublicSubjectDetailAction(subjectId));
  }, [publicSubjectDetail, subjectId]);

  const fetchStudentEnrollmentListHandler = useCallback(async () => {
    dispatch(getStudentEnrollmentListAction(studentId));
  }, [enrollmentsList, studentId]);

  const changeSliderHandlerFunction2 = (value, subChapterId, chapterId) => {
    setInfo((prev) => {
      let updateState = _.cloneDeep(prev?.sliderProgress);
      let currentChapter = null;
      let currentSubChapter = null;
      let chapterPercentage = 0;
      if (_.has(updateState, chapterId)) {
        currentChapter = _.find(updateState, { _id: chapterId });
        currentSubChapter = _.find(currentChapter?.subChapters);
        currentSubChapter.topicProgress = value;

        let chapterKeys = _.keys(updateState);

        _.forEach(chapterKeys, (singleChapterID, index) => {
          if (currentChapter?._id === singleChapterID) {
            updateState[singleChapterID] = {
              ...currentChapter,
              subChapters: currentChapter?.subChapters?.map?.(
                (singleSubChapter) => singleSubChapter
              ),
            };
          }
        });
      } else {
        updateState[chapterId] = {
          _id: chapterId,
          subChapters: [
            {
              _id: subChapterId,
              topicProgress: value,
            },
          ],
          progress: value,
        };
      }

      return { ...prev, sliderProgress: updateState };
    });
  };

  const changeSliderHandlerFunction = (value, subChapterId, chapterId) => {
    setInfo((prev) => {
      let updateState = _.cloneDeep(prev?.sliderProgress);
      let isHavingCurrentChapter = _.has(updateState || {}, chapterId);
      let isHavingCurrentSubChapter = _.has(
        updateState?.[chapterId]?.subChapters || {},
        subChapterId
      );

      let chapterPercentage = 0;
      if (isHavingCurrentChapter && isHavingCurrentSubChapter) {
        updateState[chapterId]['subChapters'][subChapterId]['topicProgress'] = value;
      } else if (isHavingCurrentChapter) {
        updateState[chapterId]['subChapters'][subChapterId] = {
          _id: subChapterId,
          topicProgress: value,
        };
      } else {
        let subChapters = {};
        subChapters[subChapterId] = {
          _id: subChapterId,
          topicProgress: value,
        };

        updateState[chapterId] = {
          _id: chapterId,
          subChapters,
          progress: value,
        };
      }

      let subChapterValues = _.values(updateState[chapterId]?.subChapters || {});
      const percentages = _.map(subChapterValues, 'topicProgress');
      const overallPercentage = percentages.length ? _.sum(percentages) / percentages.length : 0;
      updateState[chapterId].progress = overallPercentage;

      return { ...prev, sliderProgress: updateState };
    });
  };

  console.log(info?.sliderProgress, 'shahid');

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      {info?.loading ? (
        <ProgressSkeleton />
      ) : (
        <ProgressUpdateComp
          publicSubjectDetail={publicSubjectDetail}
          changeSliderHandlerFunction={changeSliderHandlerFunction}
          info={info}
          sliderProgress={info?.sliderProgress}
        />
      )}
    </MainWrapper>
  );
};

export default memo(ProgressUpdate);
