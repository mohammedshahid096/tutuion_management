import { clearAll } from '@/helpers/local-storage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  loginActions,
  userActions,
  batchActions,
  boardActions,
  subjectActions,
  studentActions,
} from '@/redux/combineActions';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetApplications = useCallback(async () => {
    //add here all reset context state func

    dispatch(loginActions.resetLoginAction());
    dispatch(userActions.resetUserProfileAction());
    dispatch(batchActions.resetBatchAction());
    dispatch(boardActions.resetBoardAction());
    dispatch(subjectActions.resetSubjectAction());
    dispatch(studentActions.resetStudentAction());
    navigate('/');
    clearAll();
  }, []);

  return resetApplications;
};

export default useLogout;
