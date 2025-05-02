import { STUDENT_LIST, CLEAR_STUDENT_ERRORS, RESET_STUDENT_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  studentsList: null,
};

export const StudentReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [STUDENT_LIST.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [STUDENT_LIST.success]: () => ({
      ...state,
      loading: false,
      studentsList: action.payload,
    }),

    // updating state
    [STUDENT_LIST.update]: () => ({
      ...state,
      studentsList: action.payload,
    }),

    // Failure state
    [STUDENT_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Fetching students failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Clear errors
    [CLEAR_STUDENT_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_STUDENT_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
