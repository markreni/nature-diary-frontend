import api from "./config";
import type { AxiosResponse } from "axios";
import type { IsignUp, IResponse } from "../types/types";

const baseUrl = "/api/v1/auth/signup";

const signUp = async (signUp: IsignUp): Promise<AxiosResponse> => {
  const response: AxiosResponse<IResponse> = await api.post(baseUrl, signUp);
  return response;
};

export default { signUp };
