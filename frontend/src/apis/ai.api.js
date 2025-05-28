import { getAccessToken } from '@/helpers/local-storage';
import Service from '@/services';

export const submitBuilderTextPromptApi = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost('/ai/builder/text', json, token);
  return response;
};
