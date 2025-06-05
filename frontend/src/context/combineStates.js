import { useMemo } from 'react';
import { ChatAgentState } from './chatAgent/state';

const useCombineState = () => {
  const chatAgentState = ChatAgentState();
  return useMemo(() => ({ chatAgentState }), [chatAgentState]);
};

export default useCombineState;
