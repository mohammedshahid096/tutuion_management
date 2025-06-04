import { getAccessToken } from '@/helpers/local-storage';
import Service from '@/services';
import axios from 'axios';

export const submitBuilderTextPromptApi = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost('/ai/builder/text', json, token);
  return response;
};

export const getSessionDetailsApi = async (sessionId) => {
  try {
    const token = getAccessToken();
    const url = `http://localhost:8002/api/v1/agent/session-details/${sessionId}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log('shahid', error);
    return (
      error.response?.data || {
        success: false,
        message: 'Failed to fetch session details',
      }
    );
  }
};

export const submitMessageChatApi = async (sessionId, json) => {
  try {
    const token = getAccessToken();
    const url = `http://localhost:8002/api/v1/agent/${sessionId}/chat-agent`;
    const { data } = await axios.post(url, json, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: 'Failed to submit message',
      }
    );
  }
};
