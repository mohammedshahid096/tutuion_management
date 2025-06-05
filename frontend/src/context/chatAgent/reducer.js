import { initialState } from './state';

const actionHandlers = {
  CHAT_MODEL: (state, action) => ({
    ...state,
    isChatModalOpen: action.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};
const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
