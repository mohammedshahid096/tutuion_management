import { BASE_URL } from '@/services/config';
import axios from 'axios';

export const welocomeApi = async () => {
  const url = BASE_URL;
  const response = await axios.get(url);
  return response;
};
