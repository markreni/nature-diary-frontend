import type { AxiosResponse } from "axios";
import type { IsignUp, IResponse } from "../types/types";
import axios from "axios";
import baseURL from "./config";
//const baseUrl = "/api/v1/auth/signup";

const signUp = async (signUp: IsignUp): Promise<AxiosResponse> => {
  const response: AxiosResponse<IResponse> = await axios.post(`${baseURL}api/v1/auth/signup`, signUp);
  return response;
};

export default { signUp };
