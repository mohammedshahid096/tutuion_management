import { getAccessToken } from '@/helpers/local-storage';
import Service from '@/services';

export const getNotificationsApi = async (query) => {
  const token = getAccessToken();
  const response = await Service.fetchGet('/notifications/notifications-list', token);
  return response;
};
