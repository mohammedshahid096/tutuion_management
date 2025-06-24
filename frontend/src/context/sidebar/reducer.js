import { initialState } from './state';

const actionHandlers = {
  IS_SIDEBAR_OPEN: (state, action) => ({
    ...state,
    isSidebarOpen: action.payload,
  }),
  UPDATE_SIDEBAR_STATE: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};
const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
