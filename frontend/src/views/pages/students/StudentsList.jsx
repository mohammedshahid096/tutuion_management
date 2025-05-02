import React, { useState, useEffect, useCallback, memo } from 'react';
import StudentsListComponent from '@/views/features/students/StudentsListComponent';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, boardActions, studentActions } from '@/redux/combineActions';
const breadCrumbs = [{ label: 'students', href: null }];

const classRooms = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12

const StudentsList = () => {
  const { getBatchesListAction } = batchActions;
  const { getBoardsListAction } = boardActions;
  const { getStudentsListAction } = studentActions;

  const dispatch = useDispatch();
  const { batchesList } = useSelector((state) => state.batchState);
  const { boardsList } = useSelector((state) => state.boardState);
  const { studentsList } = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({
    loading: true,
    name: '',
    classRoom: '',
    boardType: '',
    batchType: '',
    currentPage: 1,
    limit: 1,
    timeOut: null,
  });

  useEffect(() => {
    if (!batchesList) {
      fetchBatchesListHandler();
    }

    if (!boardsList) {
      fetchBoardsListHandler();
    }

    fetchStudentsListHandler();
  }, []);

  useEffect(() => {
    if (batchesList && boardsList && studentsList) {
      setInfo((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, [boardsList, batchesList]);

  const fetchBatchesListHandler = useCallback(async () => {
    dispatch(getBatchesListAction());
  }, [batchesList]);

  const fetchBoardsListHandler = useCallback(async () => {
    dispatch(getBoardsListAction());
  }, [boardsList]);

  const fetchStudentsListHandler = useCallback(
    async (query) => {
      let queryParams = {
        limit: query?.limit || info?.limit,
        name: query?.name || info?.name,
        boardType: query?.boardType || info?.boardType,
        batch: query?.batchType || info?.batchType,
        classRoom: query?.classRoom || info?.classRoom,
        page: query?.currentPage || info?.currentPage,
      };

      dispatch(getStudentsListAction(queryParams));
    },
    [studentsList, info?.name, info?.classRoom, info?.batchType, info?.boardType, info?.currentPage]
  );

  const filterChangeHandlerFunction = useCallback(
    async (key, value) => {
      let updateObject = {};

      if (key === 'classRoom' || key === 'boardType' || key === 'batchType') {
        updateObject[key] = value === 'all' ? '' : value;
        updateObject.currentPage = 1;
      }

      if (key === 'page') {
        updateObject.currentPage = value;
      }

      setInfo((prev) => ({
        ...prev,
        ...updateObject,
      }));

      if (key === 'name') {
      } else {
        fetchStudentsListHandler(updateObject);
      }
    },
    [info?.name, info?.classRoom, info?.batchType, info?.boardType, info?.currentPage]
  );

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <StudentsListComponent
        classRooms={classRooms}
        boardTypes={boardsList}
        batchTypes={batchesList}
        data={studentsList}
        info={info}
        setInfo={setInfo}
        filterChangeHandlerFunction={filterChangeHandlerFunction}
      />
    </MainWrapper>
  );
};

export default memo(StudentsList);
