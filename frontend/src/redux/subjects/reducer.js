import {
  SUBJECTS_LIST,
  CLEAR_SUBJECT_ERRORS,
  RESET_SUBJECT_STATE,
  PUBLIC_SUBJECTS_LIST,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  subjectsList: null,
  publicSubjectsList: null,
};

export const SubjectReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [SUBJECTS_LIST.request]: () => ({
      ...state,
      loading: true,
    }),
    [PUBLIC_SUBJECTS_LIST.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [SUBJECTS_LIST.success]: () => ({
      ...state,
      loading: false,
      subjectsList: action.payload,
    }),
    [PUBLIC_SUBJECTS_LIST.success]: () => ({
      ...state,
      loading: false,
      publicSubjectsList: action.payload,
    }),

    // Update states
    [SUBJECTS_LIST.update]: () => ({
      ...state,
      subjectsList: action.payload,
    }),

    // Failure state
    [SUBJECTS_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Request failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),
    [PUBLIC_SUBJECTS_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Request failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Clear errors
    [CLEAR_SUBJECT_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_SUBJECT_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
