import type {
  ObservationType,
  IObservationSavedResponse,
} from "../types/types.ts";
import api from "./api.ts";
import type { AxiosResponse } from "axios";

const baseUrl = "/api/v1/observations";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const create = async (
  formData: FormData
): Promise<AxiosResponse<IObservationSavedResponse>> => {
  const response = await api.post(baseUrl, formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export default { create, setToken };
