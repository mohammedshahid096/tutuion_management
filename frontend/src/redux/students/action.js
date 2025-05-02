import {
  STUDENT_LIST,
  CLEAR_STUDENT_ERRORS,
  RESET_STUDENT_STATE,
  STUDENT_DETAILS,
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

const registerNewStudentAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_STUDENT}${API.STUDENT_ACTIONS_TYPES.REGISTER}`,
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
  getSingleStudentDetailAction,
  clearStudentErrorsAction,
  resetStudentAction,
};
