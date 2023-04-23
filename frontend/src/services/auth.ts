import { post, backendUrl } from "./http";

export const login = async (email: string, password: string) => {
  return post(`${backendUrl}/auth/login`, { email, password });
};

export default {
  login,
};
