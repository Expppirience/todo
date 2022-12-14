import { IResponse } from "./todoListsAPI";
import { baseRequests } from "./index";

export const sendLoginRequest = (
  { email, password, rememberMe }: ILoginData,
  captcha?: string
) => {
  const payload = { email, password, rememberMe, captcha };
  return baseRequests.post<IResponse<{ userId?: number }>>(
    "/auth/login",
    payload
  );
};

export const sendLogoutRequest = () => {
  return baseRequests.delete<IResponse<{ userId?: number }>>("/auth/login");
};

export const authMeRequest = () => {
  return baseRequests.get<IResponse<ILoginData>>("/auth/me");
};

export const authAPI = {
  sendLoginRequest,
  sendLogoutRequest,
  authMeRequest,
};

interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
