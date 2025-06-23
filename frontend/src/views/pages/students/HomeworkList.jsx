import React, { useEffect, useCallback, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { studentActions } from '@/redux/combineActions';
import moment from 'moment';
import _ from 'lodash';
import { format } from 'timeago.js';
import { useParams } from 'react-router-dom';
import MetaData from '@/utils/MetaData';
import CustomTable1 from '@/views/components/tables/TableV1';

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'title', key: 'description' },
  { title: 'Deadline', key: 'deadline' },
  { title: 'Date', key: 'date' },
  { title: 'Time Ago', key: 'timeAgo' },
];

const HomeworkList = () => {
  const { getStudentHomeworkListAction } = studentActions;

  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { homeworkList, loading } = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({
    limit: 20,
    currentPage: 1,
  });

  useEffect(() => {
    if (!homeworkList && homeworkList?._id !== studentId) {
      fetchHomeworkListHandler();
    }
  }, []);

  const fetchHomeworkListHandler = useCallback(
    async (queryObject = {}) => {
      let query = {
        page: queryObject?.currentPage ?? info?.currentPage,
        limit: queryObject?.limit ?? info?.limit,
      };
      dispatch(getStudentHomeworkListAction(query));
    },
    [studentId, homeworkList, info?.currentPage, info?.limit]
  );

  const paginationFunctionHandler = useCallback(
    (page) => {
      let queryObject = {
        currentPage: page,
      };

      setInfo((prev) => ({
        ...prev,
        ...queryObject,
      }));
      fetchHomeworkListHandler(queryObject);
    },
    [info?.currentPage]
  );

  return (
    <div>
      <MetaData title={`Admin Student Homework | EduExcellence `} />

      <CustomTable1
        headers={headers}
        docs={homeworkList?.docs?.map((singleData) => ({
          ...singleData,
          deadline: moment(singleData?.deadline).format('LLL'),
          date: moment(singleData?.createdAt).format('L'),
          timeAgo: format(singleData?.createdAt),
        }))}
        cardTitle="Homework List"
        loading={loading}
        totalPages={homeworkList?.totalPages}
        currentPage={homeworkList?.currentPage}
        onPageChange={paginationFunctionHandler}
        limit={info?.limit}
      />
    </div>
  );
};

export default memo(HomeworkList);
