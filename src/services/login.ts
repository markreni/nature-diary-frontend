import type { AxiosResponse } from "axios";
import type { Icredentials } from "../types/types";
import baseURL from "./config";
import axios from "axios";

const login = async (credentials: Icredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.post(
    `${baseURL}api/v1/auth/login`,
    credentials
  );
  return response;
};

export default { login };
