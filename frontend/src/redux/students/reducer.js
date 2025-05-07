import {
  STUDENT_LIST,
  STUDENT_DETAILS,
  CLEAR_STUDENT_ERRORS,
  RESET_STUDENT_STATE,
  ENROLLMENT_LIST,
  ATTENDANCE_LIST,
} from './constant';

const initialState = {
  loading: false,
  enrollmentLoading: false,
  error: null,
  statusCode: null,
  studentsList: null,
  singleStudentDetail: null,
  enrollmentsList: null,
  attendanceList: null,
};

export const StudentReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [STUDENT_LIST.request]: () => ({
      ...state,
      loading: true,
    }),
    [STUDENT_DETAILS.request]: () => ({
      ...state,
      loading: true,
    }),
    [ENROLLMENT_LIST.request]: () => ({
      ...state,
      enrollmentLoading: true,
    }),
    [ATTENDANCE_LIST.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [STUDENT_LIST.success]: () => ({
      ...state,
      loading: false,
      studentsList: action.payload,
    }),
    [STUDENT_DETAILS.success]: () => ({
      ...state,
      loading: false,
      singleStudentDetail: action.payload,
    }),
    [ENROLLMENT_LIST.success]: () => ({
      ...state,
      enrollmentLoading: false,
      enrollmentsList: action.payload,
    }),
    [ATTENDANCE_LIST.success]: () => ({
      ...state,
      attendanceList: action.payload,
    }),

    // updating state
    [STUDENT_LIST.update]: () => ({
      ...state,
      studentsList: action.payload,
    }),
    [STUDENT_DETAILS.update]: () => ({
      ...state,
      singleStudentDetail: action.payload,
    }),
    [ENROLLMENT_LIST.update]: () => ({
      ...state,
      enrollmentsList: action.payload,
    }),
    [ATTENDANCE_LIST.update]: () => ({
      ...state,
      attendanceList: action.payload,
    }),

    // Failure state
    [STUDENT_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Fetching students failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),
    [STUDENT_DETAILS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Fetching students failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),
    [ENROLLMENT_LIST.fail]: () => ({
      ...state,
      enrollmentLoading: false,
      error: action?.payload?.message || 'Fetching enrollments failed', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),
    [ATTENDANCE_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Fetching attendance failed', // Default error message
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
