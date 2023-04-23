import { post, backendUrl, get } from "./http";

export const signup = (name: string, email: string, password: string) => {
  return post(`${backendUrl}/users/signup`, { name, email, password });
};

export const getMe = () => {
  return get(`${backendUrl}/users/me`);
};

export default {
  signup,
};
