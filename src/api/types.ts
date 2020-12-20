export type ApiReturn<T> = {
  error: boolean;
  data?: T;
};

export type LoginParam = {
  username: string;
  password: string;
};

export type LoginReturn = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};
