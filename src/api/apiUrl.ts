import { getEnvironment } from 'src/utils';
const { baseUrl } = getEnvironment();

export const url = {
  LOGIN: `${baseUrl}/oauth/token`,
  RAW_LIST: `${baseUrl}/raw-materials`,
  CUR_USER: `${baseUrl}/users/me`,
};
