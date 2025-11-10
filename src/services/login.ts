import api from "../services/api";
import type { AxiosResponse } from "axios";
import type { Icredentials } from "../types/types";

const baseUrl = "api/v1/auth/login";

const login = async (credentials: Icredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await api.post(baseUrl, credentials);
  return response;
};

export default { login };
