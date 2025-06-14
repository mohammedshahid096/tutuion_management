import { useMemo } from 'react';
import { ChatAgentState } from './chatAgent/state';
import { NotificationState } from './notifications/state';

const useCombineState = () => {
  const chatAgentState = ChatAgentState();
  const notificationState = NotificationState();
  return useMemo(
    () => ({ chatAgentState, notificationState }),
    [chatAgentState, notificationState]
  );
};

export default useCombineState;
