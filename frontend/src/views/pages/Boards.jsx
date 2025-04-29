import React, { useEffect, useCallback, memo, useState } from 'react';
import MainWrapper from '../layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { boardActions } from '@/redux/combineActions';
import BoardList from '../features/board/BoardList';
import AddNewBoard from '../features/board/AddNewBoard';

const breadCrumbs = [{ label: 'Boards', href: null }];
const BoardsPage = () => {
  const { getBoardsListAction } = boardActions;
  const dispatch = useDispatch();
  const { boardsList } = useSelector((state) => state.boardState);

  const [info, setInfo] = useState({
    searchTerm: '',
    openCreateModal: false,
    boardName: '',
    boardDescription: '',
    isSubmitting: false,
  });

  useEffect(() => {
    if (!boardsList) {
      fetchBoardsListHandler();
    }
  }, []);

  const fetchBoardsListHandler = useCallback(async () => {
    dispatch(getBoardsListAction());
  }, [boardsList]);

  const openCloseCreateModal = useCallback(
    (open = true) => {
      const updateDetails = {};
      if (open) {
        updateDetails.openCreateModal = true;
      } else {
        updateDetails.openCreateModal = false;
        updateDetails.boardName = '';
        updateDetails.boardDescription = '';
      }

      setInfo((prev) => ({
        ...prev,
        ...updateDetails,
      }));
    },
    [info?.openCreateModal, info?.boardName, info?.boardDescription]
  );

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <BoardList info={info} setInfo={setInfo} openCloseCreateModal={openCloseCreateModal} />
      <AddNewBoard info={info} setInfo={setInfo} openCloseCreateModal={openCloseCreateModal} />
    </MainWrapper>
  );
};

export default memo(BoardsPage);
