import { useReducer } from 'react';
import { Actions } from './action';
import Reducer from './reducer';
import { getSessionDetailsApi } from '@/apis/ai.api';

export const initialState = {
  isChatModalOpen: false,
  sessionDetails: null,
  sessionId: null,
};

export const ChatAgentState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const chatModalAction = (isOpen) => {
    dispatch({ type: Actions.CHAT_MODEL, payload: isOpen });
  };

  const fetchSessionDetailsAction = async (sessionId) => {
    let response = await getSessionDetailsApi(sessionId);
    if (response?.success === true) {
      dispatch({
        type: Actions.FETCH_SESSION_DETAILS,
        payload: response?.data,
      });
    }

    return response;
  };

  const updateChatAgentStateAction = (payload) => {
    dispatch({ type: Actions.UPDATE_CHAT_AGENT_STATE, payload });
  };

  const resetChatAgentAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    chatModalAction,
    fetchSessionDetailsAction,
    updateChatAgentStateAction,
    resetChatAgentAction,
  };
};
