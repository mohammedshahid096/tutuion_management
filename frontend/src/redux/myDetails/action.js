import { GET_MY_ATTENDANCE_LIST } from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { objectToQueryString } from '@/helpers';

/**
 * This function retrieves a user's attendance list based on a query object and dispatches actions
 * based on the success or failure of the API call.
 * @param {Object} queryObject - The `queryObject` parameter in the `getMyAttendanceListAction` function is an
 * object that contains query parameters to be included in the API request URL. These query parameters
 * are used to filter or customize the data that will be returned by the API endpoint. The
 * `objectToQueryString` function is
 */

export const getMyAttendanceListAction = createAsyncThunk(
  GET_MY_ATTENDANCE_LIST,
  async (queryObject, { rejectWithValue }) => {
    const token = getAccessToken();
    const query = queryObject ? objectToQueryString(queryObject) : '';
    const response = await Service.fetchGet(
      `${API.STUDENT_ATTENDANCE}${API.BASE_ACTIONS_TYPES.ATTENDANCE}${query}`,
      token
    );
    if (response[0] === true) {
      return response[1].data;
    } else {
      return rejectWithValue(response[1]);
    }
  }
);

export default {
  getMyAttendanceListAction,
};
