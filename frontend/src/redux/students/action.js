import {
  STUDENT_LIST,
  CLEAR_STUDENT_ERRORS,
  RESET_STUDENT_STATE,
  STUDENT_DETAILS,
  ENROLLMENT_LIST,
  ATTENDANCE_LIST,
  UPDATE_STUDENT_STATE,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';
import { objectToQueryString } from '@/helpers';

const getStudentsListAction =
  (queryObject, reset = false) =>
  async (dispatch) => {
    dispatch({ type: STUDENT_LIST.request });
    if (reset) {
      dispatch({ type: STUDENT_LIST.update, payload: null });
    }
    const token = getAccessToken();
    let query = queryObject ? objectToQueryString(queryObject) : '';
    const response = await Service.fetchGet(
      `${API.BASE_STUDENT}${API.STUDENT_ACTIONS_TYPES.STUDENTS}${query}`,
      token
    );
    if (response[0] === true) {
      dispatch({ type: STUDENT_LIST.success, payload: response[1]?.data });
    } else {
      dispatch({
        type: STUDENT_LIST.fail,
        payload: response[1],
      });
    }
  };
const getStudentEnrollmentListAction =
  (studentId, reset = false) =>
  async (dispatch) => {
    dispatch({ type: ENROLLMENT_LIST.request });
    if (reset) {
      dispatch({ type: ENROLLMENT_LIST.update, payload: null });
    }
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.ENROLLMENT_BASE}/${studentId}${API.STUDENT_ACTIONS_TYPES.ENROLLMENTS}`,
      token
    );
    if (response[0] === true) {
      const payload = {
        _id: studentId,
        docs: response[1]?.data,
      };
      dispatch({ type: ENROLLMENT_LIST.success, payload });
    } else {
      dispatch({
        type: ENROLLMENT_LIST.fail,
        payload: response[1],
      });
    }
  };

const registerNewStudentAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_STUDENT}${API.STUDENT_ACTIONS_TYPES.REGISTER}`,
    json,
    token
  );
  return response;
};

const updateStudentDetailsAction = async (json, studentId) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_STUDENT}${API.STUDENT_ACTIONS_TYPES.STUDENTS}/${studentId}`,
    json,
    token
  );
  return response;
};

const updateStudentProgressAction = async (enrollmentId, subjectId, json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.ENROLLMENT_BASE}/${enrollmentId}/${subjectId}`,
    json,
    token
  );
  return response;
};

const getSingleStudentDetailAction = (studentId) => async (dispatch) => {
  dispatch({ type: STUDENT_DETAILS.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_STUDENT}${API.STUDENT_ACTIONS_TYPES.STUDENTS}/${studentId}`,
    token
  );
  if (response[0] === true) {
    dispatch({ type: STUDENT_DETAILS.success, payload: response[1]?.data });
  } else {
    dispatch({
      type: STUDENT_DETAILS.fail,
      payload: response[1],
    });
  }
};

const getStudentAttendanceListAction = (studentId, queryObject) => async (dispatch) => {
  dispatch({ type: ATTENDANCE_LIST.request });

  const token = getAccessToken();
  const query = queryObject ? objectToQueryString(queryObject) : '';
  const response = await Service.fetchGet(
    `${API.ATTENDANCE_BASE}/${studentId}${API.STUDENT_ACTIONS_TYPES.ATTENDANCE}${query}`,
    token
  );
  if (response[0] === true) {
    const payload = {
      _id: studentId,
      ...response[1]?.data,
    };

    dispatch({ type: ATTENDANCE_LIST.success, payload });
  } else {
    dispatch({
      type: ATTENDANCE_LIST.fail,
      payload: response[1],
    });
  }
};

const createNewEnrollmentAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.ENROLLMENT_BASE}${API.STUDENT_ACTIONS_TYPES.NEW_ENROLLMENT}`,
    json,
    token
  );
  return response;
};

const updateStudentStateAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_STUDENT_STATE,
    payload,
  });
};

const clearStudentErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_STUDENT_ERRORS,
  });
};

const resetStudentAction = () => (dispatch) => {
  dispatch({ type: RESET_STUDENT_STATE });
};

export default {
  getStudentsListAction,
  registerNewStudentAction,
  updateStudentDetailsAction,
  getSingleStudentDetailAction,
  getStudentEnrollmentListAction,
  updateStudentProgressAction,
  createNewEnrollmentAction,
  getStudentAttendanceListAction,
  updateStudentStateAction,
  clearStudentErrorsAction,
  resetStudentAction,
};
