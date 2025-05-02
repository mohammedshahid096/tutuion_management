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
    searchTerm: '',
    classFilter: '',
    boardFilter: '',
    currentPage: 1,
    itemsPerPage: 1,
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

  const fetchStudentsListHandler = useCallback(async () => {
    dispatch(getStudentsListAction());
  }, [studentsList]);

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <StudentsListComponent
        classRooms={classRooms}
        boardTypes={boardsList}
        data={studentsList}
        info={info}
        setInfo={setInfo}
      />
    </MainWrapper>
  );
};

export default memo(StudentsList);
