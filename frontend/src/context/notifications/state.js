import { useReducer } from 'react';
import { Actions } from './action';
import Reducer from './reducer';
import { getNotificationsApi } from '@/apis/notification.api';

export const initialState = {
  notifications: null,
};

export const NotificationState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const fetchNotificationsAction = async (sessionId) => {
    let response = await getNotificationsApi(sessionId);
    console.log('shahid', response);

    if (response[0] === true) {
      dispatch({
        type: Actions.FETCH_NOTIFICATIONS,
        payload: response[1]?.data,
      });
    }

    return response;
  };

  const updateNotificationStateAction = (payload) => {
    dispatch({ type: Actions.UPDATE_CHAT_AGENT_STATE, payload });
  };

  const resetNotificationAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    fetchNotificationsAction,
    updateNotificationStateAction,
    resetNotificationAction,
  };
};
