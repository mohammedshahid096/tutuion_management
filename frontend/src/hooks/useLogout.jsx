import { use, useCallback, useContext } from 'react';
import { clearAll } from '@/helpers/local-storage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  loginActions,
  userActions,
  batchActions,
  boardActions,
  subjectActions,
  studentActions,
  graphActions,
  myDetailsActions,
} from '@/redux/combineActions';
import Context from '@/context/context';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    chatAgentState: { resetChatAgentAction },
  } = useContext(Context);

  const resetApplications = useCallback(async () => {
    //add here all reset context state func

    dispatch(loginActions.resetLoginAction());
    dispatch(userActions.resetUserProfileAction());
    dispatch(batchActions.resetBatchAction());
    dispatch(boardActions.resetBoardAction());
    dispatch(subjectActions.resetSubjectAction());
    dispatch(studentActions.resetStudentAction());
    dispatch(graphActions.resetGraphAction());
    dispatch(myDetailsActions.resetMyDetailsAction());
    resetChatAgentAction();
    clearAll();
    navigate('/');
  }, []);

  return resetApplications;
};

export default useLogout;
