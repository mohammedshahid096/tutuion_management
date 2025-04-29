import { SUBJECTS_LIST, CLEAR_SUBJECT_ERRORS, RESET_SUBJECT_STATE } from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';
import { objectToQueryString } from '@/helpers';

const getSubjectsListAction =
  (queryObject = null) =>
  async (dispatch) => {
    dispatch({ type: SUBJECTS_LIST.request });
    const token = getAccessToken();
    let query = queryObject ? objectToQueryString(queryObject) : '';
    const response = await Service.fetchGet(
      `${API.BASE_SUBJECT}${API.SUBJECT_ACTIONS_TYPES.LIST}${query}`,
      token
    );
    if (response[0] === true) {
      dispatch({ type: SUBJECTS_LIST.success, payload: response[1]?.data });
    } else {
      dispatch({
        type: SUBJECTS_LIST.fail,
        payload: response[1],
      });
    }
  };

const createNewSubjectAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_SUBJECT}${API.SUBJECT_ACTIONS_TYPES.NEW_SUBJECT}`,
    json,
    token
  );
  return response;
};

const clearSubjectErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUBJECT_ERRORS,
  });
};

const resetSubjectAction = () => (dispatch) => {
  dispatch({ type: RESET_SUBJECT_STATE });
};

export default {
  getSubjectsListAction,
  createNewSubjectAction,
  clearSubjectErrorsAction,
  resetSubjectAction,
};
