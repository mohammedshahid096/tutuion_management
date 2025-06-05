import { useReducer } from 'react';
import { Actions } from './action';
import Reducer from './reducer';

export const initialState = {
  isChatModalOpen: false,
};

export const ChatAgentState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const chatModalAction = (isOpen) => {
    dispatch({ type: Actions.CHAT_MODEL, payload: isOpen });
  };

  const resetChatAgentAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    chatModalAction,
    resetChatAgentAction,
  };
};
