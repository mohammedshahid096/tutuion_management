import { DASHBOARD_GRAPH_DATA, CLEAR_GRAPH_ERRORS, RESET_GRAPH_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  genderGraphData: null,
  classWiseStudentsGraphData: null,
  boardWiseStudentsGraphData: null,
};

export const GraphReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [DASHBOARD_GRAPH_DATA.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [DASHBOARD_GRAPH_DATA.success]: () => ({
      ...state,
      loading: false,
      genderGraphData: action.payload.genderGraphData,
      classWiseStudentsGraphData: action.payload.classWiseStudentsGraphData,
      boardWiseStudentsGraphData: action.payload.boardWiseStudentsGraphData,
    }),

    // update state
    [DASHBOARD_GRAPH_DATA.update]: () => ({
      ...state,
      ...action.payload,
    }),

    // Failure state
    [DASHBOARD_GRAPH_DATA.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Graph data fetch failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Clear errors
    [CLEAR_GRAPH_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_GRAPH_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
